import { pendingMigrations } from "../../scripts/migration-plan.mjs";

/** Which database backend is active. */
export type DbSource = "neon" | "pglite";

// An empty/whitespace DATABASE_URL (an easy misconfig in deploy UIs) must mean
// "unset" — otherwise production would silently run on the PGLite fallback.
const rawDatabaseUrl =
  typeof process !== "undefined" ? process.env.DATABASE_URL : undefined;
const databaseUrl =
  rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : undefined;

/**
 * Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
 * sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
 * the app has a working database even with nothing configured — the live preview
 * included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
 */
export const dbSource: DbSource = databaseUrl ? "neon" : "pglite";

/**
 * Minimal shared SQL surface, satisfied by both Neon and PGLite. Both the
 * tagged-template and `.query()` forms resolve to an array of row objects:
 *
 *   const sql = await getSql();
 *   const rows = await sql`select * from todos where id = ${id}`; // parameterized
 *   const rows2 = await sql.query("select * from todos where id = $1", [id]);
 */
export interface Sql {
  <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]>;
  query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ): Promise<T[]>;
}

/**
 * Init state lives on globalThis as promises: dev HMR creates new instances of
 * this module, and two instances racing module-level state would open a second
 * pool or run two concurrent PGLite migration passes (whose duplicate
 * `_migrations` insert rejects — and would get memoized, poisoning every later
 * `getSql()`). A failed init clears its slot so the next call retries.
 */
const globalRef = globalThis as typeof globalThis & {
  __pgSqlPromise__?: Promise<Sql>;
  __pgliteInstance__?: Promise<import("@electric-sql/pglite").PGlite>;
  __pgliteMigrateChain__?: Promise<void>;
};

/**
 * Result-type parity: Postgres sends every value as text plus a type OID — the
 * JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
 * int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
 * JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
 * production return identical, JSON-safe shapes:
 *   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
 *                                   `::text` if you ever need huge integers)
 *   date                         -> 'YYYY-MM-DD' string
 *   interval                     -> Postgres interval text
 * numeric already comes back as a string on both (arbitrary precision).
 */
const OID_INT8 = 20;
const OID_DATE = 1082;
const OID_INTERVAL = 1186;
const identity = (v: string) => v;

type Run = <T>(text: string, params: unknown[]) => Promise<T[]>;

/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run: Run): Sql {
  const sql = (async <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]> => {
    // Rebuild with $1, $2, … placeholders so values stay parameterized.
    let text = strings[0] ?? "";
    for (let i = 0; i < values.length; i += 1)
      text += `$${i + 1}${strings[i + 1] ?? ""}`;
    return run<T>(text, values);
  }) as unknown as Sql;
  sql.query = <T = Record<string, unknown>>(
    text: string,
    params: unknown[] = [],
  ) => run<T>(text, params);
  return sql;
}

/** Ensure app tables exist even if build-time migrate was skipped. */
async function ensureNeonSchema(run: Run): Promise<void> {
  await run(
    `CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    [],
  );
  await run(
    `CREATE TABLE IF NOT EXISTS ward_players (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_played TIMESTAMPTZ NOT NULL DEFAULT now(),
      lang TEXT NOT NULL DEFAULT 'th',
      difficulty INT NOT NULL DEFAULT 2,
      day INT NOT NULL DEFAULT 1,
      reputation INT NOT NULL DEFAULT 58,
      career_score INT NOT NULL DEFAULT 0,
      patients_treated INT NOT NULL DEFAULT 0,
      perfect_cases INT NOT NULL DEFAULT 0,
      best_shift_score INT NOT NULL DEFAULT 0,
      career_complete BOOLEAN NOT NULL DEFAULT false
    )`,
    [],
  );
  await run(
    `CREATE INDEX IF NOT EXISTS ward_players_career_score_idx ON ward_players (career_score DESC)`,
    [],
  );
  try {
    await run(
      `INSERT INTO _migrations (name) VALUES ($1) ON CONFLICT DO NOTHING`,
      ["0002_ward_players.sql"],
    );
  } catch {
    /* ignore */
  }
}

/**
 * Neon via HTTP — works on **Cloudflare Workers/Pages** and Vercel.
 * Prefer this over TCP `pg` which cannot run on Cloudflare.
 */
async function createNeonHttpSql(): Promise<Sql> {
  const { neon } = await import("@neondatabase/serverless");
  if (!databaseUrl) throw new Error("DATABASE_URL is not set");

  // neon() returns a function that accepts (query, params) or tagged templates
  const client = neon(databaseUrl, { fullResults: false });

  const run: Run = async <T>(text: string, params: unknown[]) => {
    // @neondatabase/serverless: query(text, params) returns row array
    const rows = (await (client as unknown as {
      query: (q: string, p?: unknown[]) => Promise<T[]>;
    }).query
      ? (client as unknown as { query: (q: string, p?: unknown[]) => Promise<T[]> }).query(
          text,
          params,
        )
      : // Fallback: some versions only expose tagged template; use unsafe array form
        (client as unknown as (q: string, p?: unknown[]) => Promise<T[]>)(
          text,
          params,
        )) as T[];
    return Array.isArray(rows) ? rows : [];
  };

  // Prefer the documented API: neon returns a template tag; also supports .query in recent versions
  const runSafe: Run = async <T>(text: string, params: unknown[]) => {
    try {
      // Primary path: function call form used by neon serverless
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fn = client as any;
      if (typeof fn.query === "function") {
        const res = await fn.query(text, params);
        if (Array.isArray(res)) return res as T[];
        if (res && Array.isArray(res.rows)) return res.rows as T[];
        return [] as T[];
      }
      // Template rebuild is already done by toSql; call as (text, params)
      const res = await fn(text, params);
      if (Array.isArray(res)) return res as T[];
      if (res && Array.isArray(res.rows)) return res.rows as T[];
      return [] as T[];
    } catch (e) {
      throw e;
    }
  };

  await ensureNeonSchema(runSafe);
  return toSql(runSafe);
}

/** TCP pg pool — Node only (local / some Node hosts). */
async function createNeonPgSql(): Promise<Sql> {
  const { Pool, types } = await import("pg");
  types.setTypeParser(OID_INT8, Number);
  types.setTypeParser(OID_DATE, identity);
  types.setTypeParser(OID_INTERVAL, identity);
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl?.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : undefined,
    max: 3,
  });
  const run: Run = async <T>(text: string, params: unknown[]) => {
    const res = await pool.query(text, params);
    return res.rows as T[];
  };
  await ensureNeonSchema(run);
  return toSql(run);
}

function createNeonSql(): Promise<Sql> {
  globalRef.__pgSqlPromise__ ??= (async () => {
    // Prefer HTTP driver (Cloudflare + Vercel). Fall back to TCP pg on Node.
    try {
      return await createNeonHttpSql();
    } catch (httpErr) {
      try {
        return await createNeonPgSql();
      } catch {
        throw httpErr;
      }
    }
  })().catch((err) => {
    globalRef.__pgSqlPromise__ = undefined;
    throw err;
  });
  return globalRef.__pgSqlPromise__;
}

async function createPgliteSql(): Promise<Sql> {
  // Embedded Postgres, imported on demand so it never loads on the Neon path.
  globalRef.__pgliteInstance__ ??= (async () => {
    const { PGlite } = await import("@electric-sql/pglite");
    const pg = new PGlite({
      parsers: {
        [OID_INT8]: Number,
        [OID_DATE]: identity,
        [OID_INTERVAL]: identity,
      },
    });
    await pg.waitReady;
    await pg.exec(
      "create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())",
    );
    return pg;
  })().catch((err) => {
    globalRef.__pgliteInstance__ = undefined;
    throw err;
  });
  const pg = await globalRef.__pgliteInstance__;

  const migrate = async (): Promise<void> => {
    const migrations = import.meta.glob("/migrations/*.sql", {
      query: "?raw",
      import: "default",
      eager: true,
    }) as Record<string, string>;
    const doneRows = await pg.query<{ name: string }>(
      "select name from _migrations",
    );
    const done = doneRows.rows.map((r) => r.name);
    for (const { name, path } of pendingMigrations(
      Object.keys(migrations),
      done,
    )) {
      await pg.transaction(async (tx) => {
        await tx.exec(migrations[path]!);
        await tx.query("insert into _migrations (name) values ($1)", [name]);
      });
    }
  };
  const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve())
    .catch(() => undefined)
    .then(migrate);
  globalRef.__pgliteMigrateChain__ = pass;
  await pass;

  return toSql(async <T>(text: string, params: unknown[]) => {
    const result = await pg.query<T>(text, params);
    return result.rows;
  });
}

let sqlPromise: Promise<Sql> | null = null;

async function createSql(): Promise<Sql> {
  if (typeof window !== "undefined") {
    throw new Error(
      "@/lib/db is server-only — call getSql() from a createServerFn handler " +
        "or a server route loader, never from client code.",
    );
  }
  return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}

/**
 * Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
 * otherwise the local PGLite fallback. Memoized — safe to call per request.
 *
 * Schema comes from `migrations/*.sql`, auto-applied before the first query on
 * both backends — define tables there, never inline in server functions.
 */
export function getSql(): Promise<Sql> {
  sqlPromise ??= createSql().catch((err) => {
    sqlPromise = null;
    throw err;
  });
  return sqlPromise;
}

/**
 * The shared PGLite instance (preview only), with `migrations/*.sql` applied.
 * Lets Better Auth persist to the SAME embedded DB as app data in preview (via a
 * Kysely dialect). Throws when `DATABASE_URL` is set (that path uses Neon).
 */
export async function getPglite(): Promise<
  import("@electric-sql/pglite").PGlite
> {
  if (dbSource !== "pglite") {
    throw new Error(
      "getPglite() is only available on the PGLite fallback (no DATABASE_URL)",
    );
  }
  await getSql();
  const pg = await globalRef.__pgliteInstance__;
  if (!pg) throw new Error("PGLite instance failed to initialize");
  return pg;
}

/** Warm the DB during server boot when migrations exist. */
export async function ensureDbReady(): Promise<void> {
  if (dbSource === "pglite") {
    await getSql();
  }
}
