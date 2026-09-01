/**
 * Server-backed player registry + stats (shared across devices).
 * Uses TanStack Start createServerFn + Postgres (Neon or PGLite).
 */
import { createServerFn } from "@tanstack/react-start";
import type { Difficulty, Lang } from "./types";
import type { LeaderboardEntry, LeaderboardSort, PlayerProfile, SaveData } from "./save";

export type ServerPlayer = {
  id: string;
  name: string;
  createdAt: number;
  lastPlayed: number;
  save: SaveData;
};

function rowToPlayer(r: Record<string, unknown>): ServerPlayer {
  const difficulty = Number(r.difficulty);
  return {
    id: String(r.id),
    name: String(r.name),
    createdAt: new Date(String(r.created_at)).getTime(),
    lastPlayed: new Date(String(r.last_played)).getTime(),
    save: {
      version: 2,
      lang: (r.lang === "en" ? "en" : "th") as Lang,
      difficulty: (difficulty === 1 || difficulty === 2 || difficulty === 3
        ? difficulty
        : 2) as Difficulty,
      day: Number(r.day) || 1,
      reputation: Number(r.reputation) || 0,
      careerScore: Number(r.career_score) || 0,
      patientsTreated: Number(r.patients_treated) || 0,
      perfectCases: Number(r.perfect_cases) || 0,
      bestShiftScore: Number(r.best_shift_score) || 0,
      careerComplete: Boolean(r.career_complete),
    },
  };
}

export const listPlayersFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<ServerPlayer[]> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql`
      SELECT * FROM ward_players
      ORDER BY last_played DESC
    `;
    return rows.map((r) => rowToPlayer(r as Record<string, unknown>));
  },
);

export const getPlayerFn = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<ServerPlayer | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql`
      SELECT * FROM ward_players WHERE id = ${id} LIMIT 1
    `;
    const row = rows[0] as Record<string, unknown> | undefined;
    return row ? rowToPlayer(row) : null;
  });

export const registerPlayerFn = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; lang?: Lang }) => input)
  .handler(async ({ data }): Promise<ServerPlayer> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const name = (data.name || "ผู้เล่น").trim().slice(0, 24) || "ผู้เล่น";
    const lang = data.lang === "en" ? "en" : "th";
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

    await sql`
      INSERT INTO ward_players (
        id, name, lang, difficulty, day, reputation,
        career_score, patients_treated, perfect_cases,
        best_shift_score, career_complete
      ) VALUES (
        ${id}, ${name}, ${lang}, 2, 1, 58,
        0, 0, 0, 0, false
      )
    `;
    const rows = await sql`SELECT * FROM ward_players WHERE id = ${id} LIMIT 1`;
    return rowToPlayer(rows[0] as Record<string, unknown>);
  });

export const upsertPlayerSaveFn = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { id: string; save: SaveData; touch?: boolean }) => input,
  )
  .handler(async ({ data }): Promise<ServerPlayer | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const s = data.save;
    const difficulty =
      s.difficulty === 1 || s.difficulty === 2 || s.difficulty === 3
        ? s.difficulty
        : 2;
    const rows = await sql`
      UPDATE ward_players SET
        lang = ${s.lang === "en" ? "en" : "th"},
        difficulty = ${difficulty},
        day = ${Math.max(1, Math.floor(s.day) || 1)},
        reputation = ${Math.floor(s.reputation) || 0},
        career_score = ${Math.floor(s.careerScore) || 0},
        patients_treated = ${Math.floor(s.patientsTreated) || 0},
        perfect_cases = ${Math.floor(s.perfectCases) || 0},
        best_shift_score = ${Math.floor(s.bestShiftScore) || 0},
        career_complete = ${Boolean(s.careerComplete)},
        last_played = now()
      WHERE id = ${data.id}
      RETURNING *
    `;
    const row = rows[0] as Record<string, unknown> | undefined;
    return row ? rowToPlayer(row) : null;
  });

export const deletePlayerFn = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<boolean> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`DELETE FROM ward_players WHERE id = ${id}`;
    return true;
  });

export const resetPlayerStatsFn = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; lang?: Lang }) => input)
  .handler(async ({ data }): Promise<boolean> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const lang = data.lang === "en" ? "en" : "th";
    await sql`
      UPDATE ward_players SET
        lang = ${lang},
        difficulty = 2,
        day = 1,
        reputation = 58,
        career_score = 0,
        patients_treated = 0,
        perfect_cases = 0,
        best_shift_score = 0,
        career_complete = false,
        last_played = now()
      WHERE id = ${data.id}
    `;
    return true;
  });

export const resetAllPlayerStatsFn = createServerFn({ method: "POST" }).handler(
  async (): Promise<number> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql`
      UPDATE ward_players SET
        difficulty = 2,
        day = 1,
        reputation = 58,
        career_score = 0,
        patients_treated = 0,
        perfect_cases = 0,
        best_shift_score = 0,
        career_complete = false,
        last_played = now()
      RETURNING id
    `;
    return rows.length;
  },
);

export const wipeAllPlayersFn = createServerFn({ method: "POST" }).handler(
  async (): Promise<number> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const before = await sql`SELECT count(*)::int AS n FROM ward_players`;
    const n = Number((before[0] as { n: number })?.n ?? 0);
    await sql`DELETE FROM ward_players`;
    return n;
  },
);

export const getLeaderboardFn = createServerFn({ method: "GET" })
  .inputValidator((sortBy: LeaderboardSort = "careerScore") => sortBy)
  .handler(async ({ data: sortBy }): Promise<LeaderboardEntry[]> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const orderCol =
      sortBy === "bestShiftScore"
        ? "best_shift_score"
        : sortBy === "perfectCases"
          ? "perfect_cases"
          : sortBy === "patientsTreated"
            ? "patients_treated"
            : "career_score";

    // Column name is from a fixed allowlist above — safe to interpolate.
    const rows = await sql.query(
      `SELECT * FROM ward_players
       ORDER BY ${orderCol} DESC,
                best_shift_score DESC,
                perfect_cases DESC,
                patients_treated DESC,
                last_played DESC`,
    );

    return rows.map((raw, i) => {
      const p = rowToPlayer(raw as Record<string, unknown>);
      return {
        id: p.id,
        name: p.name,
        rank: i + 1,
        careerScore: p.save.careerScore,
        bestShiftScore: p.save.bestShiftScore,
        reputation: p.save.reputation,
        patientsTreated: p.save.patientsTreated,
        perfectCases: p.save.perfectCases,
        day: p.save.day,
        careerComplete: p.save.careerComplete,
        lastPlayed: p.lastPlayed,
      };
    });
  });

/** Client helpers with graceful degradation */
export async function serverListProfiles(): Promise<PlayerProfile[]> {
  try {
    const list = await listPlayersFn();
    return list.map((p) => ({
      id: p.id,
      name: p.name,
      createdAt: p.createdAt,
      lastPlayed: p.lastPlayed,
    }));
  } catch {
    return [];
  }
}

export async function serverIsAvailable(): Promise<boolean> {
  try {
    await listPlayersFn();
    return true;
  } catch {
    return false;
  }
}
