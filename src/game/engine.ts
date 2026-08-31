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
    // Drop ids that were deleted; fill from pool if needed
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
  if (score >= 55) return "excellent";
  if (score >= 32) return "good";
  if (score >= 12) return "mixed";
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
  const actions = getActions();

  for (const d of c.requiredDx) {
    if (dx.includes(d)) {
      score += 16;
      lines.push({
        kind: "ok",
        delta: 16,
        text: {
          th: `วินิจฉัย ${diseaseLabel(d, "th")} ถูกต้อง`,
          en: `Correct diagnosis: ${diseaseLabel(d, "en")}`,
        },
      });
    } else {
      score -= 14;
      lines.push({
        kind: "miss",
        delta: -14,
        text: {
          th: `พลาด ${diseaseLabel(d, "th")}`,
          en: `Missed ${diseaseLabel(d, "en")}`,
        },
      });
    }
  }

  for (const d of dx) {
    if (!c.trueDiagnoses.includes(d) && !c.requiredDx.includes(d)) {
      score -= 8;
      lines.push({
        kind: "bad",
        delta: -8,
        text: {
          th: `วินิจฉัยเกิน: ${diseaseLabel(d, "th")}`,
          en: `Over-called ${diseaseLabel(d, "en")}`,
        },
      });
    }
  }

  for (const extra of c.trueDiagnoses) {
    if (!c.requiredDx.includes(extra) && dx.includes(extra)) {
      score += 6;
      lines.push({
        kind: "bonus",
        delta: 6,
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
      score += 10;
      lines.push({
        kind: "ok",
        delta: 10,
        text: {
          th: `แผนถูก: ${actionLabel(hit, "th")}`,
          en: `Plan includes ${actionLabel(hit, "en")}`,
        },
      });
    } else {
      score -= 10;
      const names = group.map((a) => ({
        th: actionLabel(a, "th"),
        en: actionLabel(a, "en"),
      }));
      lines.push({
        kind: "miss",
        delta: -10,
        text: {
          th: `ขาด ${names.map((n) => n.th).join(" / ")}`,
          en: `Missing ${names.map((n) => n.en).join(" / ")}`,
        },
      });
    }
  }

  for (const a of c.bonusTreatments) {
    if (tx.includes(a)) {
      score += 5;
      lines.push({
        kind: "bonus",
        delta: 5,
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
      score -= 18;
      lines.push({
        kind: "bad",
        delta: -18,
        text: {
          th: `อันตราย: ${actionLabel(a, "th")}`,
          en: `Harmful: ${actionLabel(a, "en")}`,
        },
      });
    } else if (!known.has(a)) {
      score -= 3;
      lines.push({
        kind: "bad",
        delta: -3,
        text: {
          th: `ไม่จำเป็น: ${actionLabel(a, "th")}`,
          en: `Unnecessary: ${actionLabel(a, "en")}`,
        },
      });
    }
  }

  for (const t of c.usefulTests) {
    if (tests.includes(t)) {
      score += 4;
      lines.push({
        kind: "ok",
        delta: 4,
        text: {
          th: `แล็บคุ้ม: ${testLabel(t, "th")}`,
          en: `Useful test: ${testLabel(t, "en")}`,
        },
      });
    }
  }
  for (const t of tests) {
    if (!c.usefulTests.includes(t) && !(t in c.testResults)) {
      score -= 3;
      lines.push({
        kind: "bad",
        delta: -3,
        text: {
          th: `แล็บเกิน: ${testLabel(t, "th")}`,
          en: `Low-yield test: ${testLabel(t, "en")}`,
        },
      });
    } else if (!c.usefulTests.includes(t) && t in c.testResults) {
      score -= 2;
      lines.push({
        kind: "bad",
        delta: -2,
        text: {
          th: `แล็บไม่จำเป็น: ${testLabel(t, "th")}`,
          en: `Unneeded test: ${testLabel(t, "en")}`,
        },
      });
    }
  }

  // silence unused if no custom actions labeled
  void actions;

  const perfect =
    c.requiredDx.every((d) => dx.includes(d)) &&
    c.requiredGroups.every((g) => g.some((a) => tx.includes(a))) &&
    !tx.some((a) => c.harmfulTreatments.includes(a));

  if (perfect) {
    score += 8;
    lines.push({
      kind: "bonus",
      delta: 8,
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
  const base =
    grade === "excellent" ? 5 : grade === "good" ? 2 : grade === "mixed" ? 0 : -6;
  return base - missed * 8;
}

export function testCost(id: TestId): number {
  return testMinutes(id);
}
