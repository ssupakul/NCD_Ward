import {
  actionLabel,
  diseaseLabel,
  getActions,
  getCaseDef,
  listCases,
  testLabel,
  testMinutes,
} from "./catalog";
import { DAY_MINUTES, DAY_PLANS } from "./cases";
import { loadScoring } from "./scoring";
import type {
  ActionId,
  CaseDef,
  Debrief,
  DebriefLine,
  DiseaseId,
  Grade,
  ShiftPatient,
  ShiftState,
  TestId,
} from "./types";

export function getCase(id: string): CaseDef {
  const c = getCaseDef(id);
  if (!c) throw new Error(`Unknown case ${id}`);
  return c;
}

export function minutesForDay(day: number): number {
  if (day <= DAY_MINUTES.length) return DAY_MINUTES[day - 1] ?? 40;
  return 50;
}

export function planForDay(day: number): string[] {
  const all = listCases();
  const pool = all.map((c) => c.id);
  if (pool.length === 0) return [];

  if (day <= DAY_PLANS.length) {
    const planned = [...(DAY_PLANS[day - 1] ?? DAY_PLANS[0]!)];
    const valid = planned.filter((id) => pool.includes(id));
    if (valid.length >= planned.length * 0.5) return valid;
  }

  const n = Math.min(pool.length, 5 + (day % 2));
  const start = (day * 3) % pool.length;
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(pool[(start + i) % pool.length]!);
  return out;
}

export function makeShift(day: number): ShiftState {
  const ids = planForDay(day);
  const patients: ShiftPatient[] = ids.map((caseId, i) => ({
    instanceId: `${day}-${i}-${caseId}`,
    caseId,
    seen: false,
    missed: false,
    wait: i * 1.5,
    tests: [],
    diagnoses: [],
    treatments: [],
    debrief: null,
  }));
  return {
    day,
    minutesLeft: minutesForDay(day),
    score: 0,
    patients,
    activeId: null,
    tab: "chart",
  };
}

function gradeOf(score: number): Grade {
  const s = loadScoring();
  if (score >= s.gradeExcellent) return "excellent";
  if (score >= s.gradeGood) return "good";
  if (score >= s.gradeMixed) return "mixed";
  return "poor";
}

export function scoreConsult(
  c: CaseDef,
  tests: TestId[],
  dx: DiseaseId[],
  tx: ActionId[],
): Debrief {
  const lines: DebriefLine[] = [];
  let score = 0;
  const sc = loadScoring();
  void getActions();

  for (const d of c.requiredDx) {
    if (dx.includes(d)) {
      score += sc.correctDx;
      lines.push({
        kind: "ok",
        delta: sc.correctDx,
        text: {
          th: `วินิจฉัย ${diseaseLabel(d, "th")} ถูกต้อง`,
          en: `Correct diagnosis: ${diseaseLabel(d, "en")}`,
        },
      });
    } else {
      score += sc.missedDx;
      lines.push({
        kind: "miss",
        delta: sc.missedDx,
        text: {
          th: `พลาด ${diseaseLabel(d, "th")}`,
          en: `Missed ${diseaseLabel(d, "en")}`,
        },
      });
    }
  }

  for (const d of dx) {
    if (!c.trueDiagnoses.includes(d) && !c.requiredDx.includes(d)) {
      score += sc.overDx;
      lines.push({
        kind: "bad",
        delta: sc.overDx,
        text: {
          th: `วินิจฉัยเกิน: ${diseaseLabel(d, "th")}`,
          en: `Over-called ${diseaseLabel(d, "en")}`,
        },
      });
    }
  }

  for (const extra of c.trueDiagnoses) {
    if (!c.requiredDx.includes(extra) && dx.includes(extra)) {
      score += sc.extraDxBonus;
      lines.push({
        kind: "bonus",
        delta: sc.extraDxBonus,
        text: {
          th: `จับ ${diseaseLabel(extra, "th")} ได้ด้วย`,
          en: `Also caught ${diseaseLabel(extra, "en")}`,
        },
      });
    }
  }

  for (const group of c.requiredGroups) {
    const hit = group.find((a) => tx.includes(a));
    if (hit) {
      score += sc.correctPlan;
      lines.push({
        kind: "ok",
        delta: sc.correctPlan,
        text: {
          th: `แผนถูก: ${actionLabel(hit, "th")}`,
          en: `Plan includes ${actionLabel(hit, "en")}`,
        },
      });
    } else {
      score += sc.missedPlan;
      const names = group.map((a) => ({
        th: actionLabel(a, "th"),
        en: actionLabel(a, "en"),
      }));
      lines.push({
        kind: "miss",
        delta: sc.missedPlan,
        text: {
          th: `ขาด ${names.map((n) => n.th).join(" / ")}`,
          en: `Missing ${names.map((n) => n.en).join(" / ")}`,
        },
      });
    }
  }

  for (const a of c.bonusTreatments) {
    if (tx.includes(a)) {
      score += sc.bonusTx;
      lines.push({
        kind: "bonus",
        delta: sc.bonusTx,
        text: {
          th: `โบนัส: ${actionLabel(a, "th")}`,
          en: `Bonus: ${actionLabel(a, "en")}`,
        },
      });
    }
  }

  const requiredFlat = new Set(c.requiredGroups.flat());
  const known = new Set([
    ...requiredFlat,
    ...c.bonusTreatments,
    ...c.harmfulTreatments,
  ]);

  for (const a of tx) {
    if (c.harmfulTreatments.includes(a)) {
      score += sc.harmfulTx;
      lines.push({
        kind: "bad",
        delta: sc.harmfulTx,
        text: {
          th: `อันตราย: ${actionLabel(a, "th")}`,
          en: `Harmful: ${actionLabel(a, "en")}`,
        },
      });
    } else if (!known.has(a)) {
      score += sc.unnecessaryTx;
      lines.push({
        kind: "bad",
        delta: sc.unnecessaryTx,
        text: {
          th: `ไม่จำเป็น: ${actionLabel(a, "th")}`,
          en: `Unnecessary: ${actionLabel(a, "en")}`,
        },
      });
    }
  }

  for (const t of c.usefulTests) {
    if (tests.includes(t)) {
      score += sc.usefulLab;
      lines.push({
        kind: "ok",
        delta: sc.usefulLab,
        text: {
          th: `แล็บคุ้ม: ${testLabel(t, "th")}`,
          en: `Useful test: ${testLabel(t, "en")}`,
        },
      });
    }
  }
  for (const t of tests) {
    if (!c.usefulTests.includes(t) && !(t in c.testResults)) {
      score += sc.lowYieldLab;
      lines.push({
        kind: "bad",
        delta: sc.lowYieldLab,
        text: {
          th: `แล็บเกิน: ${testLabel(t, "th")}`,
          en: `Low-yield test: ${testLabel(t, "en")}`,
        },
      });
    } else if (!c.usefulTests.includes(t) && t in c.testResults) {
      score += sc.unneededLab;
      lines.push({
        kind: "bad",
        delta: sc.unneededLab,
        text: {
          th: `แล็บไม่จำเป็น: ${testLabel(t, "th")}`,
          en: `Unneeded test: ${testLabel(t, "en")}`,
        },
      });
    }
  }

  const perfect =
    c.requiredDx.every((d) => dx.includes(d)) &&
    c.requiredGroups.every((g) => g.some((a) => tx.includes(a))) &&
    !tx.some((a) => c.harmfulTreatments.includes(a));

  if (perfect) {
    score += sc.perfectBonus;
    lines.push({
      kind: "bonus",
      delta: sc.perfectBonus,
      text: { th: "เคสสมบูรณ์", en: "Clean case bonus" },
    });
  }

  const grade = gradeOf(score);
  return {
    score,
    grade,
    lines,
    teaching: c.teaching,
    outcome: c.outcomes[grade],
    perfect,
  };
}

export function reputationDelta(grade: Grade, missed: number): number {
  const s = loadScoring();
  const base =
    grade === "excellent"
      ? s.repExcellent
      : grade === "good"
        ? s.repGood
        : grade === "mixed"
          ? s.repMixed
          : s.repPoor;
  return base - missed * s.repMissedPerPatient;
}

export function testCost(id: TestId): number {
  return testMinutes(id);
}
