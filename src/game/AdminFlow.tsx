import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  KeyRound,
  LogOut,
  Pencil,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import {
  adminLogout,
  changeAdminPassword,
  getAdminUsername,
  isAdminLoggedIn,
  tryAdminLogin,
} from "./admin";
import {
  deletePlayerFn,
  getLeaderboardFn,
  resetAllPlayerStatsFn,
  resetPlayerStatsFn,
  wipeAllPlayersFn,
} from "./playerApi";
import {
  createPlayerBackup,
  deletePlayer,
  deletePlayerBackup,
  downloadPlayerBackup,
  getLeaderboard,
  importPlayerBackup,
  listPlayerBackups,
  loadProfilesIndex,
  resetAllPlayerStats,
  resetPlayerStats,
  restorePlayerBackup,
  wipeAllPlayers,
  type LeaderboardEntry,
  type PlayerBackup,
} from "./save";
import {
  computeGradeThresholds,
  loadScoring,
  resetScoring,
  saveScoring,
  SCORING_FIELDS,
  withAutoGrades,
  type ScoringField,
} from "./scoring";
import {
  blankCase,
  deleteAction,
  deleteCase,
  deleteDisease,
  deleteTest,
  getActionOrder,
  getActions,
  getDiseaseOrder,
  getDiseases,
  getTestOrder,
  getTests,
  isBuiltinCase,
  isCustomAction,
  isCustomDisease,
  isCustomTest,
  listCases,
  reloadCatalog,
  upsertAction,
  upsertCase,
  upsertDisease,
  upsertTest,
  type ActionEntry,
  type DiseaseEntry,
  type TestEntry,
} from "./catalog";
import { loc } from "./content";
import { useGame } from "./store";
import type { ActionGroup, CaseDef, Loc } from "./types";
import { useT } from "./ui";

type AdminTab =
  | "cases"
  | "diseases"
  | "labs"
  | "actions"
  | "scoring"
  | "players"
  | "password";

function LocInputs({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Loc;
  onChange: (v: Loc) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <label className="block text-sm">
        <span className="text-muted">{label} (TH)</span>
        <input
          className="mt-1 w-full rounded-lg border border-foreground/15 bg-surface-2 px-3 py-2 text-sm"
          value={value.th}
          onChange={(e) => onChange({ ...value, th: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted">{label} (EN)</span>
        <input
          className="mt-1 w-full rounded-lg border border-foreground/15 bg-surface-2 px-3 py-2 text-sm"
          value={value.en}
          onChange={(e) => onChange({ ...value, en: e.target.value })}
        />
      </label>
    </div>
  );
}

function MultiCheck({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  return (
    <fieldset className="rounded-lg border border-foreground/10 p-3">
      <legend className="px-1 text-sm text-muted">{label}</legend>
      <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
        {options.map((o) => {
          const on = selected.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              className={`rounded-full px-3 py-1 text-xs ${
                on
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface-2 text-muted shadow-[var(--shadow-border)]"
              }`}
              onClick={() =>
                onChange(
                  on ? selected.filter((x) => x !== o.id) : [...selected, o.id],
                )
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function AdminScreen() {
  const t = useT();
  const lang = useGame((s) => s.lang);
  const closeAdmin = useGame((s) => s.closeAdmin);
  const [loggedIn, setLoggedIn] = useState(() => isAdminLoggedIn());
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [tab, setTab] = useState<AdminTab>("cases");
  const [tick, setTick] = useState(0);
  const refresh = () => {
    reloadCatalog();
    setTick((x) => x + 1);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-dvh bg-background px-5 py-10">
        <div className="mx-auto max-w-md ward-enter">
          <Button variant="ghost" onClick={closeAdmin} className="mb-6 px-0">
            {t("กลับ", "Back")}
          </Button>
          <div className="mb-4 flex items-center gap-2">
            <Shield className="size-6 text-accent" />
            <h1 className="text-3xl">{t("เข้าสู่ระบบแอดมิน", "Admin login")}</h1>
          </div>
          <p className="mb-6 text-sm text-muted">
            {t(
              "จัดการเคส ยา แล็บ และรหัสผ่าน — ข้อมูลเก็บในเบราว์เซอร์นี้เท่านั้น",
              "Manage cases, meds, labs, and password — stored in this browser only.",
            )}
          </p>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (tryAdminLogin(user, pass)) {
                setLoggedIn(true);
                setLoginError(false);
                setPass("");
              } else {
                setLoginError(true);
              }
            }}
          >
            <label className="block text-sm">
              <span className="text-muted">Username</span>
              <input
                className="mt-1 w-full rounded-lg border border-foreground/15 bg-surface-2 px-3 py-2"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="username"
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">Password</span>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-foreground/15 bg-surface-2 px-3 py-2"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            {loginError ? (
              <p className="text-sm text-danger">
                {t("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "Invalid username or password")}
              </p>
            ) : null}
            <Button type="submit" size="lg" className="w-full">
              {t("เข้าสู่ระบบ", "Sign in")}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; th: string; en: string }[] = [
    { id: "cases", th: "เคส (Card)", en: "Cases" },
    { id: "diseases", th: "โรค", en: "Diseases" },
    { id: "labs", th: "แล็บ", en: "Labs" },
    { id: "actions", th: "ยา/แผน", en: "Treatments" },
    { id: "scoring", th: "คะแนน", en: "Scoring" },
    { id: "players", th: "ผู้เล่น", en: "Players" },
    { id: "password", th: "รหัสผ่าน", en: "Password" },
  ];

  return (
    <div className="min-h-dvh bg-background px-4 py-6">
      <div className="mx-auto max-w-4xl ward-enter">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Button variant="ghost" onClick={closeAdmin} className="px-0">
            {t("กลับเกม", "Back to game")}
          </Button>
          <span className="ml-auto text-sm text-muted">
            {getAdminUsername()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              adminLogout();
              setLoggedIn(false);
            }}
          >
            <LogOut className="size-4" />
            {t("ออก", "Logout")}
          </Button>
        </div>

        <h1 className="mb-4 flex items-center gap-2 text-3xl md:text-4xl">
          <Shield className="size-7 text-accent" />
          {t("แผงควบคุมแอดมิน", "Admin panel")}
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((x) => (
            <Button
              key={x.id}
              size="sm"
              variant={tab === x.id ? "primary" : "secondary"}
              onClick={() => setTab(x.id)}
            >
              {t(x.th, x.en)}
            </Button>
          ))}
        </div>

        {/* force re-render of lists after CRUD */}
        <div key={tick}>
          {tab === "cases" ? (
            <CasesAdmin lang={lang} onChange={refresh} />
          ) : null}
          {tab === "diseases" ? <DiseasesAdmin onChange={refresh} /> : null}
          {tab === "labs" ? <LabsAdmin onChange={refresh} /> : null}
          {tab === "actions" ? <ActionsAdmin onChange={refresh} /> : null}
          {tab === "scoring" ? <ScoringAdmin /> : null}
          {tab === "players" ? <PlayersAdmin onChange={refresh} /> : null}
          {tab === "password" ? <PasswordAdmin /> : null}
        </div>
      </div>
    </div>
  );
}

function CasesAdmin({
  lang,
  onChange,
}: {
  lang: "th" | "en";
  onChange: () => void;
}) {
  const t = useT();
  const cases = useMemo(() => listCases(), [onChange]);
  const [editing, setEditing] = useState<CaseDef | null>(null);

  if (editing) {
    return (
      <CaseEditor
        initial={editing}
        onCancel={() => setEditing(null)}
        onSave={(c) => {
          upsertCase(c);
          setEditing(null);
          onChange();
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          onClick={() => setEditing(blankCase())}
        >
          <Plus className="size-4" />
          {t("เพิ่มเคสใหม่", "Add case")}
        </Button>
      </div>
      <ul className="space-y-2">
        {cases.map((c) => (
          <li
            key={c.id}
            className="flex flex-wrap items-center gap-2 rounded-lg bg-surface-2 px-3 py-3 shadow-[var(--shadow-border)]"
          >
            <div className="min-w-0 flex-1">
              <div className="font-medium">{loc(lang, c.name)}</div>
              <div className="text-xs text-muted">
                {c.id} · {t(`อายุ ${c.age}`, `Age ${c.age}`)} ·{" "}
                {c.difficulty === 1
                  ? t("ง่าย", "Easy")
                  : c.difficulty === 2
                    ? t("ปานกลาง", "Medium")
                    : t("ยาก", "Hard")}{" "}
                ·{" "}
                {isBuiltinCase(c.id)
                  ? t("ในตัวเกม", "Built-in")
                  : t("กำหนดเอง", "Custom")}
              </div>
              <div className="mt-1 line-clamp-1 text-sm text-muted">
                {loc(lang, c.complaint)}
              </div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setEditing(structuredClone(c))}
            >
              <Pencil className="size-4" />
              {t("แก้ไข", "Edit")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-danger"
              onClick={() => {
                if (
                  window.confirm(
                    t(`ลบเคส "${loc(lang, c.name)}"?`, `Delete "${loc(lang, c.name)}"?`),
                  )
                ) {
                  deleteCase(c.id);
                  onChange();
                }
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseEditor({
  initial,
  onCancel,
  onSave,
}: {
  initial: CaseDef;
  onCancel: () => void;
  onSave: (c: CaseDef) => void;
}) {
  const t = useT();
  const [c, setC] = useState<CaseDef>(initial);
  const isNew = !listCases().some((x) => x.id === initial.id) && !isBuiltinCase(initial.id);

  const diseaseOpts = getDiseaseOrder().map((id) => ({
    id,
    label: getDiseases()[id]?.label.th ?? id,
  }));
  const testOpts = getTestOrder().map((id) => ({
    id,
    label: getTests()[id]?.label.th ?? id,
  }));
  const actionOpts = getActionOrder().map((id) => ({
    id,
    label: getActions()[id]?.label.th ?? id,
  }));

  return (
    <div className="space-y-4 rounded-xl bg-surface-2 p-4 shadow-[var(--shadow-border)]">
      <h2 className="text-xl">
        {isNew ? t("เคสใหม่", "New case") : t("แก้ไขเคส", "Edit case")}
      </h2>

      <label className="block text-sm">
        <span className="text-muted">ID</span>
        <input
          className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm"
          value={c.id}
          disabled={isBuiltinCase(initial.id)}
          onChange={(e) =>
            setC({
              ...c,
              id: e.target.value.trim().toLowerCase().replace(/\s+/g, "_"),
            })
          }
        />
      </label>

      <LocInputs
        label={t("ชื่อ", "Name")}
        value={c.name}
        onChange={(name) => setC({ ...c, name })}
      />
      <LocInputs
        label={t("อาชีพ", "Job")}
        value={c.job}
        onChange={(job) => setC({ ...c, job })}
      />
      <LocInputs
        label={t("อาการสำคัญ", "Complaint")}
        value={c.complaint}
        onChange={(complaint) => setC({ ...c, complaint })}
      />
      <LocInputs
        label={t("ประวัติ", "History")}
        value={c.history}
        onChange={(history) => setC({ ...c, history })}
      />
      <LocInputs
        label={t("ข้อความสอน", "Teaching")}
        value={c.teaching}
        onChange={(teaching) => setC({ ...c, teaching })}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="text-sm">
          <span className="text-muted">{t("อายุ", "Age")}</span>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
            value={c.age}
            onChange={(e) => setC({ ...c, age: Number(e.target.value) || 0 })}
          />
        </label>
        <label className="text-sm">
          <span className="text-muted">{t("เพศ", "Sex")}</span>
          <select
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
            value={c.sex}
            onChange={(e) => setC({ ...c, sex: e.target.value as "m" | "f" })}
          >
            <option value="m">M</option>
            <option value="f">F</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-muted">Urgency</span>
          <select
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
            value={c.urgency}
            onChange={(e) =>
              setC({ ...c, urgency: Number(e.target.value) as 1 | 2 | 3 })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-muted">
            {t("ระดับความยากของเคส", "Case difficulty")}
          </span>
          <select
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
            value={c.difficulty}
            onChange={(e) =>
              setC({
                ...c,
                difficulty: Number(e.target.value) as 1 | 2 | 3,
              })
            }
          >
            <option value={1}>{t("1 — ง่าย", "1 — Easy")}</option>
            <option value={2}>{t("2 — ปานกลาง", "2 — Medium")}</option>
            <option value={3}>{t("3 — ยาก", "3 — Hard")}</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-muted">Portrait 0–11</span>
          <input
            type="number"
            min={0}
            max={11}
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
            value={c.portrait}
            onChange={(e) =>
              setC({ ...c, portrait: Math.max(0, Math.min(11, Number(e.target.value) || 0)) })
            }
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(
          [
            ["bp", "BP"],
            ["hr", "HR"],
            ["bmi", "BMI"],
            ["spo2", "SpO2"],
            ["temp", "Temp"],
            ["glucose", "Glucose"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-sm">
            <span className="text-muted">{label}</span>
            <input
              className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
              value={
                key === "bp"
                  ? c.vitals.bp
                  : key === "glucose"
                    ? (c.vitals.glucose ?? "")
                    : String(c.vitals[key])
              }
              onChange={(e) => {
                const v = e.target.value;
                if (key === "bp") setC({ ...c, vitals: { ...c.vitals, bp: v } });
                else if (key === "glucose")
                  setC({
                    ...c,
                    vitals: {
                      ...c.vitals,
                      glucose: v === "" ? undefined : Number(v),
                    },
                  });
                else
                  setC({
                    ...c,
                    vitals: { ...c.vitals, [key]: Number(v) || 0 },
                  });
              }}
            />
          </label>
        ))}
      </div>

      <MultiCheck
        label={t("วินิจฉัยจริง (true)", "True diagnoses")}
        options={diseaseOpts}
        selected={c.trueDiagnoses}
        onChange={(ids) =>
          setC({ ...c, trueDiagnoses: ids as CaseDef["trueDiagnoses"] })
        }
      />
      <MultiCheck
        label={t("วินิจฉัยที่ต้องมี (required)", "Required diagnoses")}
        options={diseaseOpts}
        selected={c.requiredDx}
        onChange={(ids) =>
          setC({ ...c, requiredDx: ids as CaseDef["requiredDx"] })
        }
      />
      <MultiCheck
        label={t("แล็บที่มีประโยชน์", "Useful labs")}
        options={testOpts}
        selected={c.usefulTests}
        onChange={(ids) =>
          setC({ ...c, usefulTests: ids as CaseDef["usefulTests"] })
        }
      />
      <MultiCheck
        label={t("แผนโบนัส", "Bonus treatments")}
        options={actionOpts}
        selected={c.bonusTreatments}
        onChange={(ids) =>
          setC({ ...c, bonusTreatments: ids as CaseDef["bonusTreatments"] })
        }
      />
      <MultiCheck
        label={t("แผนอันตราย", "Harmful treatments")}
        options={actionOpts}
        selected={c.harmfulTreatments}
        onChange={(ids) =>
          setC({ ...c, harmfulTreatments: ids as CaseDef["harmfulTreatments"] })
        }
      />

      <p className="text-xs text-muted">
        {t(
          "กลุ่มแผนที่จำเป็น: แก้ไขเป็นรายการ id คั่นด้วยจุลภาคต่อบรรทัด (เช่น acei,arb,ccb)",
          "Required plan groups: one group per line, comma-separated ids (e.g. acei,arb,ccb)",
        )}
      </p>
      <textarea
        className="min-h-24 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2 font-mono text-sm"
        value={c.requiredGroups.map((g) => g.join(",")).join("\n")}
        onChange={(e) => {
          const lines = e.target.value
            .split("\n")
            .map((line) =>
              line
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            )
            .filter((g) => g.length > 0);
          setC({
            ...c,
            requiredGroups: lines as CaseDef["requiredGroups"],
          });
        }}
      />

      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          onClick={() => {
            if (!c.id.trim()) return;
            onSave(c);
          }}
        >
          {t("บันทึก", "Save")}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          {t("ยกเลิก", "Cancel")}
        </Button>
      </div>
    </div>
  );
}

function DiseasesAdmin({ onChange }: { onChange: () => void }) {
  const t = useT();
  const [id, setId] = useState("");
  const [entry, setEntry] = useState<DiseaseEntry>({
    label: { th: "", en: "" },
    hint: { th: "", en: "" },
  });
  const order = getDiseaseOrder();
  const map = getDiseases();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        {t(
          "เพิ่มโรคใหม่หรือแก้ชื่อ/คำใบ้ — โรคในตัวเกมแก้ได้แต่ลบไม่ได้",
          "Add diseases or edit labels. Built-ins can be edited, not fully removed.",
        )}
      </p>
      <div className="space-y-2 rounded-lg bg-surface-2 p-4 shadow-[var(--shadow-border)]">
        <label className="block text-sm">
          <span className="text-muted">ID (เช่น my_disease)</span>
          <input
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <LocInputs
          label={t("ชื่อโรค", "Label")}
          value={entry.label}
          onChange={(label) => setEntry({ ...entry, label })}
        />
        <LocInputs
          label={t("คำใบ้", "Hint")}
          value={entry.hint}
          onChange={(hint) => setEntry({ ...entry, hint })}
        />
        <Button
          onClick={() => {
            if (!id.trim()) return;
            upsertDisease(id, entry);
            setId("");
            setEntry({ label: { th: "", en: "" }, hint: { th: "", en: "" } });
            onChange();
          }}
        >
          <Plus className="size-4" />
          {t("บันทึกโรค", "Save disease")}
        </Button>
      </div>
      <ul className="space-y-2">
        {order.map((did) => {
          const d = map[did];
          if (!d) return null;
          return (
            <li
              key={did}
              className="flex items-start gap-2 rounded-lg bg-surface-2 px-3 py-2 shadow-[var(--shadow-border)]"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">{d.label.th}</div>
                <div className="text-xs text-muted">{did}</div>
                <div className="text-sm text-muted">{d.hint.th}</div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setId(did);
                  setEntry(structuredClone(d));
                }}
              >
                <Pencil className="size-4" />
              </Button>
              {isCustomDisease(did) ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-danger"
                  onClick={() => {
                    deleteDisease(did);
                    onChange();
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function LabsAdmin({ onChange }: { onChange: () => void }) {
  const t = useT();
  const [id, setId] = useState("");
  const [entry, setEntry] = useState<TestEntry>({
    label: { th: "", en: "" },
    minutes: 3,
    blurb: { th: "", en: "" },
  });
  const order = getTestOrder();
  const map = getTests();

  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded-lg bg-surface-2 p-4 shadow-[var(--shadow-border)]">
        <label className="block text-sm">
          <span className="text-muted">ID</span>
          <input
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <LocInputs
          label={t("ชื่อแล็บ", "Label")}
          value={entry.label}
          onChange={(label) => setEntry({ ...entry, label })}
        />
        <LocInputs
          label={t("คำอธิบาย", "Blurb")}
          value={entry.blurb}
          onChange={(blurb) => setEntry({ ...entry, blurb })}
        />
        <label className="block text-sm">
          <span className="text-muted">{t("เวลา (นาที)", "Minutes")}</span>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm"
            value={entry.minutes}
            onChange={(e) =>
              setEntry({ ...entry, minutes: Number(e.target.value) || 1 })
            }
          />
        </label>
        <Button
          onClick={() => {
            if (!id.trim()) return;
            upsertTest(id, entry);
            setId("");
            setEntry({
              label: { th: "", en: "" },
              minutes: 3,
              blurb: { th: "", en: "" },
            });
            onChange();
          }}
        >
          <Plus className="size-4" />
          {t("บันทึกแล็บ", "Save lab")}
        </Button>
      </div>
      <ul className="space-y-2">
        {order.map((tid) => {
          const x = map[tid];
          if (!x) return null;
          return (
            <li
              key={tid}
              className="flex items-start gap-2 rounded-lg bg-surface-2 px-3 py-2 shadow-[var(--shadow-border)]"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">
                  {x.label.th}{" "}
                  <span className="text-xs text-muted">
                    ({x.minutes} {t("นาที", "min")})
                  </span>
                </div>
                <div className="text-xs text-muted">{tid}</div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setId(tid);
                  setEntry(structuredClone(x));
                }}
              >
                <Pencil className="size-4" />
              </Button>
              {isCustomTest(tid) ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-danger"
                  onClick={() => {
                    deleteTest(tid);
                    onChange();
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ActionsAdmin({ onChange }: { onChange: () => void }) {
  const t = useT();
  const [id, setId] = useState("");
  const [entry, setEntry] = useState<ActionEntry>({
    label: { th: "", en: "" },
    group: "med",
  });
  const order = getActionOrder();
  const map = getActions();

  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded-lg bg-surface-2 p-4 shadow-[var(--shadow-border)]">
        <label className="block text-sm">
          <span className="text-muted">ID</span>
          <input
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <LocInputs
          label={t("ชื่อ", "Label")}
          value={entry.label}
          onChange={(label) => setEntry({ ...entry, label })}
        />
        <label className="block text-sm">
          <span className="text-muted">{t("กลุ่ม", "Group")}</span>
          <select
            className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm"
            value={entry.group}
            onChange={(e) =>
              setEntry({ ...entry, group: e.target.value as ActionGroup })
            }
          >
            <option value="med">{t("ยา", "Medicine")}</option>
            <option value="life">{t("ปรับชีวิต", "Lifestyle")}</option>
            <option value="refer">{t("ส่งต่อ", "Referral")}</option>
          </select>
        </label>
        <Button
          onClick={() => {
            if (!id.trim()) return;
            upsertAction(id, entry);
            setId("");
            setEntry({ label: { th: "", en: "" }, group: "med" });
            onChange();
          }}
        >
          <Plus className="size-4" />
          {t("บันทึกแผน", "Save treatment")}
        </Button>
      </div>
      <ul className="space-y-2">
        {order.map((aid) => {
          const x = map[aid];
          if (!x) return null;
          return (
            <li
              key={aid}
              className="flex items-start gap-2 rounded-lg bg-surface-2 px-3 py-2 shadow-[var(--shadow-border)]"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">{x.label.th}</div>
                <div className="text-xs text-muted">
                  {aid} · {x.group}
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setId(aid);
                  setEntry(structuredClone(x));
                }}
              >
                <Pencil className="size-4" />
              </Button>
              {isCustomAction(aid) ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-danger"
                  onClick={() => {
                    deleteAction(aid);
                    onChange();
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ScoringAdmin() {
  const t = useT();
  const [cfg, setCfg] = useState(() => loadScoring());
  const [saved, setSaved] = useState(false);

  const previewGrades = cfg.autoGrade
    ? computeGradeThresholds(cfg)
    : {
        gradeExcellent: cfg.gradeExcellent,
        gradeGood: cfg.gradeGood,
        gradeMixed: cfg.gradeMixed,
      };

  const displayCfg = cfg.autoGrade ? { ...cfg, ...previewGrades } : cfg;

  const groups: { id: ScoringField["group"]; th: string; en: string }[] = [
    { id: "dx", th: "วินิจฉัย", en: "Diagnosis" },
    { id: "plan", th: "แผนรักษา", en: "Treatment plan" },
    { id: "lab", th: "แล็บ", en: "Labs" },
    { id: "perfect", th: "โบนัสเคส", en: "Case bonus" },
    { id: "grade", th: "เกณฑ์เกรด", en: "Grade thresholds" },
    { id: "rep", th: "ชื่อเสียง (หลังเวร)", en: "Reputation (end of shift)" },
  ];

  const updatePoints = (
    key: ScoringField["key"],
    value: number,
  ) => {
    const next = { ...cfg, [key]: value };
    if (next.autoGrade) {
      Object.assign(next, computeGradeThresholds(next));
    }
    setCfg(next);
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        {t(
          "ปรับคะแนนในเดอบรีฟ — ค่าติดลบหมายถึงหักคะแนน เกณฑ์เกรดคำนวณอัตโนมัติจากน้ำหนักคะแนนได้",
          "Tune debrief points. Negative values subtract score. Grade cutoffs can scale automatically from point weights.",
        )}
      </p>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-accent/10 px-4 py-3 ring-1 ring-accent/30">
        <input
          type="checkbox"
          className="mt-1 size-4"
          checked={cfg.autoGrade}
          onChange={(e) => {
            const autoGrade = e.target.checked;
            const next = withAutoGrades({ ...cfg, autoGrade });
            setCfg(next);
            setSaved(false);
          }}
        />
        <span className="text-sm">
          <span className="font-medium">
            {t("ปรับเกณฑ์เกรดอัตโนมัติ", "Auto grade thresholds")}
          </span>
          <span className="mt-1 block text-muted">
            {t(
              "คำนวณ Excellent / Good / Mixed จากคะแนนวินิจฉัย + แผน + แล็บ + โบนัสเคส (สัดส่วนเดิมของเกม)",
              "Derives Excellent / Good / Mixed from diagnosis + plan + lab + perfect weights (same proportions as the original game).",
            )}
          </span>
        </span>
      </label>

      {groups.map((g) => (
        <section key={g.id} className="space-y-2">
          <h3 className="text-lg font-medium">{t(g.th, g.en)}</h3>
          {g.id === "grade" && cfg.autoGrade ? (
            <p className="text-xs text-muted">
              {t(
                "โหมดอัตโนมัติ — ค่าด้านล่างคำนวณจากน้ำหนักคะแนน (อ่านอย่างเดียว จนกว่าจะปิด auto)",
                "Auto mode — values below are computed from point weights (read-only until you turn auto off).",
              )}
            </p>
          ) : null}
          <div className="grid gap-2 sm:grid-cols-2">
            {SCORING_FIELDS.filter((f) => f.group === g.id).map((f) => {
              const locked = g.id === "grade" && cfg.autoGrade;
              return (
                <label
                  key={f.key}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 shadow-[var(--shadow-border)] ${
                    locked ? "bg-surface-2/60 opacity-90" : "bg-surface-2"
                  }`}
                >
                  <span className="min-w-0 flex-1 text-sm">
                    {t(f.th, f.en)}
                    <span className="mt-0.5 block text-[10px] text-muted">
                      {f.key}
                      {locked ? ` · ${t("อัตโนมัติ", "auto")}` : ""}
                    </span>
                  </span>
                  <input
                    type="number"
                    disabled={locked}
                    className="w-20 rounded-lg border border-foreground/15 bg-background px-2 py-1.5 text-right tabular text-sm disabled:opacity-70"
                    value={displayCfg[f.key]}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      updatePoints(f.key, Number.isFinite(n) ? n : 0);
                    }}
                  />
                </label>
              );
            })}
          </div>
        </section>
      ))}

      <div className="rounded-lg bg-surface-2 px-4 py-3 text-sm shadow-[var(--shadow-border)]">
        <div className="font-medium">
          {t("ตัวอย่างเกณฑ์ที่ใช้ตอนนี้", "Active grade bands")}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 tabular text-muted">
          <span>
            Excellent ≥ <strong className="text-foreground">{previewGrades.gradeExcellent}</strong>
          </span>
          <span>
            Good ≥ <strong className="text-foreground">{previewGrades.gradeGood}</strong>
          </span>
          <span>
            Mixed ≥ <strong className="text-foreground">{previewGrades.gradeMixed}</strong>
          </span>
          <span>
            Poor &lt; <strong className="text-foreground">{previewGrades.gradeMixed}</strong>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            const next = withAutoGrades(cfg);
            saveScoring(next);
            setCfg(next);
            setSaved(true);
          }}
        >
          {t("บันทึกคะแนน", "Save scoring")}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (
              window.confirm(
                t(
                  "คืนค่าเริ่มต้นของระบบคะแนน?",
                  "Reset scoring to defaults?",
                ),
              )
            ) {
              setCfg(resetScoring());
              setSaved(true);
            }
          }}
        >
          {t("คืนค่าเริ่มต้น", "Reset defaults")}
        </Button>
      </div>
      {saved ? (
        <p className="text-sm text-ok">
          {t("บันทึกแล้ว — มีผลกับเคสถัดไป", "Saved — applies to the next case")}
        </p>
      ) : null}
    </div>
  );
}

function formatBackupTime(ts: number): string {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

function PlayersAdmin({ onChange }: { onChange: () => void }) {
  const t = useT();
  const hydrate = useGame((s) => s.hydrate);
  const [msg, setMsg] = useState<string | null>(null);
  const [backups, setBackups] = useState<PlayerBackup[]>(() =>
    listPlayerBackups(),
  );
  const [board, setBoard] = useState<LeaderboardEntry[]>([]);
  const [serverMode, setServerMode] = useState(false);

  const refreshBackups = () => setBackups(listPlayerBackups());

  const refreshBoard = () => {
    void (async () => {
      try {
        const rows = await getLeaderboardFn({ data: "careerScore" });
        setBoard(rows);
        setServerMode(true);
      } catch {
        setBoard(getLeaderboard("careerScore"));
        setServerMode(false);
      }
    })();
  };

  useEffect(() => {
    refreshBoard();
  }, []);

  const afterReset = () => {
    hydrate();
    onChange();
    refreshBackups();
    refreshBoard();
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        {serverMode
          ? t(
              "ข้อมูลผู้เล่นจากเซิร์ฟเวอร์กลาง — รีเซ็ตมีผลกับทุกเครื่อง",
              "Players from the shared server — resets apply everywhere.",
            )
          : t(
              "โหมดออฟไลน์ — จัดการเฉพาะเครื่องนี้ (เซิร์ฟเวอร์ไม่พร้อม)",
              "Offline mode — this device only (server unavailable).",
            )}
      </p>

      {/* Backup actions */}
      <section className="space-y-3 rounded-lg bg-surface-2 p-4 shadow-[var(--shadow-border)]">
        <h3 className="font-medium">
          {t("สำรองข้อมูลผู้เล่น", "Player data backup")}
        </h3>
        <p className="text-xs text-muted">
          {t(
            "เก็บชื่อ ผู้เล่น สถิติ และอันดับ — สูงสุด 10 ชุดล่าสุดบนเครื่องนี้",
            "Stores names, stats, and rankings — up to 10 recent snapshots on this device.",
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => {
              const b = createPlayerBackup("manual");
              downloadPlayerBackup(b);
              refreshBackups();
              setMsg(
                t(
                  `สำรองแล้ว (${b.players.length} คน) และดาวน์โหลดไฟล์`,
                  `Backed up (${b.players.length} players) and downloaded file`,
                ),
              );
            }}
          >
            {t("สำรอง + ดาวน์โหลด", "Backup + download")}
          </Button>
          <label className="inline-flex cursor-pointer">
            <span className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-background px-3 text-sm shadow-[var(--shadow-border)] hover:opacity-90">
              {t("นำเข้าไฟล์สำรอง", "Import backup file")}
            </span>
            <input
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                try {
                  const text = await file.text();
                  const data = JSON.parse(text) as unknown;
                  const b = importPlayerBackup(data);
                  if (!b) {
                    setMsg(
                      t(
                        "ไฟล์สำรองไม่ถูกต้อง",
                        "Invalid backup file",
                      ),
                    );
                    return;
                  }
                  refreshBackups();
                  setMsg(
                    t(
                      `นำเข้าสำรองแล้ว (${b.players.length} คน) — กดกู้คืนถ้าต้องการใช้`,
                      `Imported backup (${b.players.length} players) — restore when ready`,
                    ),
                  );
                } catch {
                  setMsg(
                    t("อ่านไฟล์ไม่สำเร็จ", "Failed to read file"),
                  );
                }
              }}
            />
          </label>
        </div>

        {backups.length === 0 ? (
          <p className="text-sm text-muted">
            {t("ยังไม่มีสำรอง", "No backups yet")}
          </p>
        ) : (
          <ul className="space-y-2">
            {backups.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center gap-2 rounded-lg bg-background/60 px-3 py-2"
              >
                <div className="min-w-0 flex-1 text-sm">
                  <div className="font-medium">
                    {formatBackupTime(b.createdAt)}
                  </div>
                  <div className="text-xs text-muted">
                    {b.label} · {b.players.length}{" "}
                    {t("คน", "players")}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => downloadPlayerBackup(b)}
                >
                  {t("ดาวน์โหลด", "Download")}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (
                      !window.confirm(
                        t(
                          "กู้คืนสำรองนี้? ข้อมูลผู้เล่นปัจจุบันจะถูกแทนที่ (มีการสำรองก่อนกู้คืนอัตโนมัติ)",
                          "Restore this backup? Current player data will be replaced (auto-backup before restore).",
                        ),
                      )
                    )
                      return;
                    if (restorePlayerBackup(b.id)) {
                      afterReset();
                      setMsg(
                        t(
                          "กู้คืนสำรองแล้ว",
                          "Backup restored",
                        ),
                      );
                    } else {
                      setMsg(
                        t("กู้คืนไม่สำเร็จ", "Restore failed"),
                      );
                    }
                  }}
                >
                  {t("กู้คืน", "Restore")}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-danger"
                  onClick={() => {
                    deletePlayerBackup(b.id);
                    refreshBackups();
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            if (
              !window.confirm(
                t(
                  "จะสำรองข้อมูลอัตโนมัติก่อน แล้วรีเซ็ตสถิติทุกคน (ชื่อยังอยู่)?",
                  "Auto-backup first, then reset all player stats (names kept)?",
                ),
              )
            )
              return;
            void (async () => {
              createPlayerBackup("before-reset-stats");
              let n = 0;
              try {
                n = await resetAllPlayerStatsFn();
              } catch {
                n = resetAllPlayerStats({ skipBackup: true });
              }
              afterReset();
              setMsg(
                t(
                  `สำรองแล้ว และรีเซ็ตสถิติ ${n} คน`,
                  `Backed up and reset stats for ${n} player(s)`,
                ),
              );
            })();
          }}
        >
          {t("รีเซ็ตคะแนนทุกคน", "Reset all scores")}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (
              !window.confirm(
                t(
                  "จะสำรองข้อมูลอัตโนมัติก่อน แล้วลบผู้เล่นทั้งหมด?",
                  "Auto-backup first, then delete ALL players?",
                ),
              )
            )
              return;
            if (
              !window.confirm(
                t(
                  "ยืนยันอีกครั้ง — ลบผู้เล่นปัจจุบัน (กู้คืนจากสำรองได้)",
                  "Confirm again — current players will be removed (restorable from backup)",
                ),
              )
            )
              return;
            void (async () => {
              createPlayerBackup("before-wipe");
              let n = 0;
              try {
                n = await wipeAllPlayersFn();
              } catch {
                n = wipeAllPlayers({ skipBackup: true });
              }
              afterReset();
              setMsg(
                t(
                  `สำรองแล้ว และลบผู้เล่น ${n} คน`,
                  `Backed up and wiped ${n} player(s)`,
                ),
              );
            })();
          }}
        >
          {t("ลบผู้เล่นทั้งหมด", "Wipe all players")}
        </Button>
      </div>

      {msg ? <p className="text-sm text-ok">{msg}</p> : null}

      {board.length === 0 ? (
        <p className="text-muted">
          {t("ยังไม่มีผู้เล่นลงทะเบียน", "No registered players")}
        </p>
      ) : (
        <ul className="space-y-2">
          {board.map((e) => (
            <li
              key={e.id}
              className="flex flex-wrap items-center gap-2 rounded-lg bg-surface-2 px-3 py-3 shadow-[var(--shadow-border)]"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">
                  #{e.rank} {e.name}
                </div>
                <div className="text-xs text-muted">
                  {t(
                    `คะแนน ${e.careerScore} · เวรดีสุด ${e.bestShiftScore} · คนไข้ ${e.patientsTreated} · วัน ${e.day}`,
                    `Score ${e.careerScore} · Best shift ${e.bestShiftScore} · Patients ${e.patientsTreated} · Day ${e.day}`,
                  )}
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  if (
                    !window.confirm(
                      t(
                        `รีเซ็ตสถิติของ "${e.name}"?`,
                        `Reset stats for "${e.name}"?`,
                      ),
                    )
                  )
                    return;
                  void (async () => {
                    try {
                      await resetPlayerStatsFn({ data: { id: e.id } });
                    } catch {
                      resetPlayerStats(e.id);
                    }
                    afterReset();
                    setMsg(
                      t(
                        `รีเซ็ตสถิติของ ${e.name} แล้ว`,
                        `Reset stats for ${e.name}`,
                      ),
                    );
                  })();
                }}
              >
                {t("รีเซ็ตคะแนน", "Reset score")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-danger"
                onClick={() => {
                  if (
                    !window.confirm(
                      t(
                        `ลบผู้เล่น "${e.name}"?`,
                        `Delete player "${e.name}"?`,
                      ),
                    )
                  )
                    return;
                  void (async () => {
                    try {
                      await deletePlayerFn({ data: e.id });
                    } catch {
                      deletePlayer(e.id);
                    }
                    afterReset();
                    setMsg(
                      t(`ลบ ${e.name} แล้ว`, `Deleted ${e.name}`),
                    );
                  })();
                }}
              >
                <Trash2 className="size-4" />
                {t("ลบ", "Delete")}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PasswordAdmin() {
  const t = useT();
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState<"ok" | "current" | "short" | null>(null);

  return (
    <div className="max-w-md space-y-3 rounded-lg bg-surface-2 p-4 shadow-[var(--shadow-border)]">
      <div className="flex items-center gap-2 text-lg font-medium">
        <KeyRound className="size-5" />
        {t("เปลี่ยนรหัสผ่านแอดมิน", "Change admin password")}
      </div>
      <label className="block text-sm">
        <span className="text-muted">{t("รหัสผ่านปัจจุบัน", "Current password")}</span>
        <input
          type="password"
          className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
          value={cur}
          onChange={(e) => setCur(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted">{t("รหัสผ่านใหม่ (อย่างน้อย 4 ตัว)", "New password (min 4)")}</span>
        <input
          type="password"
          className="mt-1 w-full rounded-lg border border-foreground/15 bg-background px-3 py-2"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />
      </label>
      {msg === "ok" ? (
        <p className="text-sm text-ok">{t("เปลี่ยนรหัสผ่านแล้ว", "Password updated")}</p>
      ) : null}
      {msg === "current" ? (
        <p className="text-sm text-danger">
          {t("รหัสผ่านปัจจุบันไม่ถูกต้อง", "Current password is wrong")}
        </p>
      ) : null}
      {msg === "short" ? (
        <p className="text-sm text-danger">
          {t("รหัสใหม่สั้นเกินไป", "New password is too short")}
        </p>
      ) : null}
      <Button
        onClick={() => {
          const r = changeAdminPassword(cur, next);
          if (r.ok) {
            setMsg("ok");
            setCur("");
            setNext("");
          } else setMsg(r.error === "short" ? "short" : "current");
        }}
      >
        {t("บันทึกรหัสผ่าน", "Save password")}
      </Button>
    </div>
  );
}
