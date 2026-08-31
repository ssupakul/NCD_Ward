import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getActionOrder,
  getActions,
  getDiseaseOrder,
  getDiseases,
  getTestOrder,
  getTests,
} from "./catalog";
import { loc } from "./content";
import { diagnosisOptionsForCase, getCase } from "./engine";
import { useGame } from "./store";
import type { ActionGroup, ActionId, DiseaseId, Grade, TestId } from "./types";
import { Chip, Paper, Portrait, useT } from "./ui";
import { Hud } from "./ClinicFlow";

export function ConsultScreen() {
  const lang = useGame((s) => s.lang);
  const t = useT();
  const shift = useGame((s) => s.shift);
  const setTab = useGame((s) => s.setTab);
  const orderTest = useGame((s) => s.orderTest);
  const toggleDx = useGame((s) => s.toggleDx);
  const toggleTx = useGame((s) => s.toggleTx);
  const signOff = useGame((s) => s.signOff);
  const openOverlay = useGame((s) => s.openOverlay);
  const difficulty = useGame((s) => s.difficulty);
  const p = shift?.patients.find((x) => x.instanceId === shift.activeId);
  if (!shift || !p) return null;
  const c = getCase(p.caseId);
  const tab = shift.tab;
  const dxOptions = diagnosisOptionsForCase(
    c,
    difficulty,
    getDiseaseOrder(),
  );

  return (
    <div className="min-h-dvh bg-background">
      <Hud onHandbook={() => openOverlay("handbook")} />
      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,18rem)_1fr]">
        <Paper className="overflow-hidden ward-enter">
          <Portrait
            index={c.portrait}
            alt=""
            className="h-48 w-full sm:h-56 lg:h-44"
          />
          <div className="p-4">
            <p className="text-xs tracking-[0.16em] text-paper-muted uppercase">
              {loc(lang, c.job)}
            </p>
            <h2 className="mt-1 font-display text-3xl leading-tight">
              {loc(lang, c.name)}
            </h2>
            <p className="mt-1 text-sm text-paper-muted">
              {c.age}
              {t(c.sex === "m" ? " ปี · ชาย" : " ปี · หญิง", c.sex === "m" ? " y · M" : " y · F")}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{loc(lang, c.complaint)}</p>
            <VitalsGrid
              bp={c.vitals.bp}
              hr={c.vitals.hr}
              bmi={c.vitals.bmi}
              spo2={c.vitals.spo2}
              glucose={c.vitals.glucose}
            />
          </div>
        </Paper>

        <Paper className="flex min-h-[28rem] flex-col p-4 sm:p-5 ward-enter">
          <div className="flex gap-1 rounded-lg bg-background/5 p-1">
            {(
              [
                ["chart", t("ประวัติ", "History")],
                ["labs", t("แล็บ", "Labs")],
                ["plan", t("แผน", "Plan")],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "min-h-11 flex-1 rounded-md text-sm",
                  tab === id
                    ? "bg-paper-foreground text-paper"
                    : "text-paper-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            {tab === "chart" ? (
              <div>
                <h3 className="font-sans text-sm font-medium tracking-normal text-paper-muted">
                  {t("ประวัติ", "History")}
                </h3>
                <p className="mt-2 leading-relaxed">{loc(lang, c.history)}</p>
                {c.flags.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.flags.map((f) => (
                      <li
                        key={f.en}
                        className="rounded-full bg-background/8 px-3 py-1 text-sm"
                      >
                        {loc(lang, f)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {tab === "labs" ? (
              <div className="space-y-2">
                {getTestOrder().map((id) => {
                  const ordered = p.tests.includes(id as TestId);
                  const result = ordered
                    ? c.testResults[id as TestId]
                    : undefined;
                  const test = getTests()[id];
                  if (!test) return null;
                  return (
                    <div
                      key={id}
                      className="flex flex-col gap-2 rounded-lg bg-background/5 px-3 py-3 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-medium">{loc(lang, test.label)}</span>
                          <span className="text-xs tabular text-paper-muted">
                            {test.minutes} {t("นาที", "min")}
                          </span>
                        </div>
                        <p className="text-sm text-paper-muted">
                          {result ? loc(lang, result) : loc(lang, test.blurb)}
                        </p>
                      </div>
                      {ordered ? (
                        <span className="text-sm text-ok">{t("ได้ผล", "Reported")}</span>
                      ) : (
                        <Button
                          variant="ink"
                          size="sm"
                          onClick={() => orderTest(id as TestId)}
                          disabled={shift.minutesLeft < test.minutes}
                        >
                          {t("สั่ง", "Order")}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {tab === "plan" ? (
              <div className="space-y-5">
                <section>
                  <h3 className="font-sans text-sm font-medium tracking-normal text-paper-muted">
                    {t("วินิจฉัย", "Diagnoses")}
                  </h3>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {dxOptions.map((id) => {
                      const d = getDiseases()[id];
                      if (!d) return null;
                      return (
                        <Chip
                          key={id}
                          on={p.diagnoses.includes(id as DiseaseId)}
                          onClick={() => toggleDx(id as DiseaseId)}
                        >
                          {loc(lang, d.label)}
                        </Chip>
                      );
                    })}
                  </div>
                </section>
                <PlanGroup
                  title={t("ยา", "Medicines")}
                  group="med"
                  selected={p.treatments}
                  onToggle={toggleTx}
                />
                <PlanGroup
                  title={t("ปรับชีวิต", "Lifestyle")}
                  group="life"
                  selected={p.treatments}
                  onToggle={toggleTx}
                />
                <PlanGroup
                  title={t("ส่งต่อ", "Referral")}
                  group="refer"
                  selected={p.treatments}
                  onToggle={toggleTx}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-paper-foreground/10 pt-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-paper-muted">
              {p.diagnoses.length === 0
                ? t("เลือกอย่างน้อยหนึ่งวินิจฉัยก่อนลงนาม", "Pick at least one diagnosis to sign.")
                : t("ลงนามแล้วจะได้เดอบรีฟทันที", "Signing locks the plan and opens the debrief.")}
            </p>
            <Button
              variant="ink"
              onClick={signOff}
              disabled={p.diagnoses.length === 0}
              className="sm:min-w-44"
            >
              {t("ลงนามแผน", "Sign plan")}
            </Button>
          </div>
        </Paper>
      </main>
    </div>
  );
}

function PlanGroup({
  title,
  group,
  selected,
  onToggle,
}: {
  title: string;
  group: ActionGroup;
  selected: string[];
  onToggle: (id: import("./types").ActionId) => void;
}) {
  const lang = useGame((s) => s.lang);
  const actions = getActions();
  const ids = getActionOrder().filter((id) => actions[id]?.group === group);
  return (
    <section>
      <h3 className="font-sans text-sm font-medium tracking-normal text-paper-muted">
        {title}
      </h3>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {ids.map((id) => {
          const a = actions[id];
          if (!a) return null;
          return (
            <Chip
              key={id}
              on={selected.includes(id)}
              onClick={() => onToggle(id as ActionId)}
            >
              {loc(lang, a.label)}
            </Chip>
          );
        })}
      </div>
    </section>
  );
}

function VitalsGrid({
  bp,
  hr,
  bmi,
  spo2,
  glucose,
}: {
  bp: string;
  hr: number;
  bmi: number;
  spo2: number;
  glucose?: number;
}) {
  const t = useT();
  const cells = [
    { k: "BP", v: bp },
    { k: "HR", v: String(hr) },
    { k: "BMI", v: bmi.toFixed(1) },
    { k: "SpO2", v: `${spo2}%` },
  ];
  if (glucose != null) cells.push({ k: t("น้ำตาล", "Glu"), v: String(glucose) });
  return (
    <dl className="mt-4 grid grid-cols-3 gap-2">
      {cells.map((c) => (
        <div key={c.k} className="rounded-md bg-background/8 px-2 py-2">
          <dt className="text-[0.65rem] tracking-wide text-paper-muted uppercase">
            {c.k}
          </dt>
          <dd className="tabular text-sm font-medium">{c.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DebriefScreen() {
  const lang = useGame((s) => s.lang);
  const t = useT();
  const shift = useGame((s) => s.shift);
  const afterDebrief = useGame((s) => s.afterDebrief);
  const p = shift?.patients.find((x) => x.instanceId === shift.activeId);
  const d = p?.debrief;
  if (!shift || !p || !d) return null;
  const c = getCase(p.caseId);

  return (
    <div className="min-h-dvh bg-background">
      <Hud />
      <main className="mx-auto max-w-2xl px-4 py-8 ward-enter">
        <Paper className="p-5 sm:p-6">
          <p className={cn("text-sm tracking-[0.16em] uppercase", gradeColor(d.grade))}>
            {gradeLabel(d.grade, t)}
          </p>
          <h1 className="mt-1 font-display text-4xl">
            {d.score >= 0 ? "+" : ""}
            {d.score}
          </h1>
          <p className="mt-2 text-paper-muted">
            {loc(lang, c.name)} · {loc(lang, d.outcome)}
          </p>

          <ul className="mt-5 space-y-2">
            {d.lines.map((line, i) => (
              <li
                key={`${line.delta}-${i}`}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span
                  className={cn(
                    line.kind === "ok" && "text-ok",
                    line.kind === "bonus" && "text-ok",
                    line.kind === "miss" && "text-warn",
                    line.kind === "bad" && "text-danger",
                  )}
                >
                  {loc(lang, line.text)}
                </span>
                <span className="tabular text-paper-muted">
                  {line.delta > 0 ? "+" : ""}
                  {line.delta}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-lg bg-background/8 p-4">
            <h2 className="font-sans text-sm font-medium tracking-normal text-paper-muted">
              {t("โน้ตเวร", "Shift note")}
            </h2>
            <p className="mt-2 leading-relaxed">{loc(lang, d.teaching)}</p>
          </div>

          <Button variant="ink" className="mt-6 w-full" onClick={afterDebrief}>
            {t("คนไข้ถัดไป", "Next patient")}
          </Button>
        </Paper>
      </main>
    </div>
  );
}

function gradeLabel(g: Grade, t: (th: string, en: string) => string) {
  if (g === "excellent") return t("ยอดเยี่ยม", "Excellent");
  if (g === "good") return t("ดี", "Good");
  if (g === "mixed") return t("ปนกัน", "Mixed");
  return t("ต้องทบทวน", "Needs review");
}

function gradeColor(g: Grade) {
  if (g === "excellent" || g === "good") return "text-ok";
  if (g === "mixed") return "text-warn";
  return "text-danger";
}
