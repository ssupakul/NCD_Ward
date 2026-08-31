import { ACTIONS, DISEASES, TESTS } from "./content";
import { CASE_BY_ID, CASES, DAY_MINUTES, DAY_PLANS } from "./cases";
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
  const c = CASE_BY_ID[id];
  if (!c) throw new Error(`Unknown case ${id}`);
  return c;
}

export function minutesForDay(day: number): number {
  if (day <= DAY_MINUTES.length) return DAY_MINUTES[day - 1] ?? 40;
  return 50;
}

export function planForDay(day: number): string[] {
  if (day <= DAY_PLANS.length) return [...(DAY_PLANS[day - 1] ?? DAY_PLANS[0])];
  const pool = CASES.map((c) => c.id);
  const n = 5 + (day % 2);
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

  for (const d of c.requiredDx) {
    if (dx.includes(d)) {
      score += 16;
      lines.push({
        kind: "ok",
        delta: 16,
        text: {
          th: `วินิจฉัย ${DISEASES[d].label.th} ถูกต้อง`,
          en: `Correct diagnosis: ${DISEASES[d].label.en}`,
        },
      });
    } else {
      score -= 14;
      lines.push({
        kind: "miss",
        delta: -14,
        text: {
          th: `พลาด ${DISEASES[d].label.th}`,
          en: `Missed ${DISEASES[d].label.en}`,
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
          th: `วินิจฉัยเกิน: ${DISEASES[d].label.th}`,
          en: `Over-called ${DISEASES[d].label.en}`,
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
          th: `จับ ${DISEASES[extra].label.th} ได้ด้วย`,
          en: `Also caught ${DISEASES[extra].label.en}`,
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
          th: `แผนถูก: ${ACTIONS[hit].label.th}`,
          en: `Plan includes ${ACTIONS[hit].label.en}`,
        },
      });
    } else {
      score -= 10;
      const names = group.map((a) => ACTIONS[a].label);
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
          th: `โบนัส: ${ACTIONS[a].label.th}`,
          en: `Bonus: ${ACTIONS[a].label.en}`,
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
          th: `อันตราย: ${ACTIONS[a].label.th}`,
          en: `Harmful: ${ACTIONS[a].label.en}`,
        },
      });
    } else if (!known.has(a)) {
      score -= 3;
      lines.push({
        kind: "bad",
        delta: -3,
        text: {
          th: `ไม่จำเป็น: ${ACTIONS[a].label.th}`,
          en: `Unnecessary: ${ACTIONS[a].label.en}`,
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
          th: `แล็บคุ้ม: ${TESTS[t].label.th}`,
          en: `Useful test: ${TESTS[t].label.en}`,
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
          th: `แล็บเกิน: ${TESTS[t].label.th}`,
          en: `Low-yield test: ${TESTS[t].label.en}`,
        },
      });
    } else if (!c.usefulTests.includes(t) && t in c.testResults) {
      score -= 2;
      lines.push({
        kind: "bad",
        delta: -2,
        text: {
          th: `แล็บไม่จำเป็น: ${TESTS[t].label.th}`,
          en: `Unneeded test: ${TESTS[t].label.en}`,
        },
      });
    }
  }

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
  return TESTS[id].minutes;
}
