/**
 * Admin-configurable scoring rules (localStorage).
 * Grade thresholds can auto-scale from point weights.
 */

const SCORING_KEY = "ward-ncd-scoring-v1";

export type ScoringConfig = {
  version: number;
  /** When true, gradeExcellent/Good/Mixed are derived from point weights */
  autoGrade: boolean;
  /** Diagnosis */
  correctDx: number;
  missedDx: number;
  overDx: number;
  extraDxBonus: number;
  /** Treatment plan */
  correctPlan: number;
  missedPlan: number;
  bonusTx: number;
  harmfulTx: number;
  unnecessaryTx: number;
  /** Labs */
  usefulLab: number;
  lowYieldLab: number;
  unneededLab: number;
  /** Case bonus */
  perfectBonus: number;
  /** Grade thresholds (score >= threshold) — may be auto-filled */
  gradeExcellent: number;
  gradeGood: number;
  gradeMixed: number;
  /** Reputation after shift */
  repExcellent: number;
  repGood: number;
  repMixed: number;
  repPoor: number;
  repMissedPerPatient: number;
};

export const DEFAULT_SCORING: ScoringConfig = {
  version: 1,
  autoGrade: true,
  correctDx: 16,
  missedDx: -14,
  overDx: -8,
  extraDxBonus: 6,
  correctPlan: 10,
  missedPlan: -10,
  bonusTx: 5,
  harmfulTx: -18,
  unnecessaryTx: -3,
  usefulLab: 4,
  lowYieldLab: -3,
  unneededLab: -2,
  perfectBonus: 8,
  gradeExcellent: 55,
  gradeGood: 32,
  gradeMixed: 12,
  repExcellent: 5,
  repGood: 2,
  repMixed: 0,
  repPoor: -6,
  repMissedPerPatient: 4,
};

/**
 * Reference "solid clean case" score used to scale grade bands:
 * 1 correct Dx + 2 plan groups + 1 useful lab + perfect bonus
 * Ratios match the original defaults (≈55 / 32 / 12 when using default points).
 */
export function computeGradeThresholds(
  cfg: Pick<
    ScoringConfig,
    "correctDx" | "correctPlan" | "usefulLab" | "perfectBonus"
  >,
): Pick<ScoringConfig, "gradeExcellent" | "gradeGood" | "gradeMixed"> {
  const core =
    Math.max(0, cfg.correctDx) +
    Math.max(0, cfg.correctPlan) * 2 +
    Math.max(0, cfg.usefulLab) +
    Math.max(0, cfg.perfectBonus);

  // Fallback if all zeros
  const base = core > 0 ? core : 48;

  let excellent = Math.round(base * (55 / 48));
  let good = Math.round(base * (32 / 48));
  let mixed = Math.round(base * (12 / 48));

  // Keep strict ordering: excellent > good > mixed >= 0
  if (mixed < 0) mixed = 0;
  if (good <= mixed) good = mixed + 1;
  if (excellent <= good) excellent = good + 1;

  return {
    gradeExcellent: excellent,
    gradeGood: good,
    gradeMixed: mixed,
  };
}

export function withAutoGrades(cfg: ScoringConfig): ScoringConfig {
  if (!cfg.autoGrade) {
    // Still enforce order if manual
    const grades = [cfg.gradeExcellent, cfg.gradeGood, cfg.gradeMixed].sort(
      (a, b) => b - a,
    );
    return {
      ...cfg,
      gradeExcellent: grades[0]!,
      gradeGood: grades[1]!,
      gradeMixed: Math.max(0, grades[2]!),
    };
  }
  return { ...cfg, ...computeGradeThresholds(cfg) };
}

function canStore(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadScoring(): ScoringConfig {
  if (!canStore()) return withAutoGrades({ ...DEFAULT_SCORING });
  try {
    const raw = localStorage.getItem(SCORING_KEY);
    if (!raw) return withAutoGrades({ ...DEFAULT_SCORING });
    const parsed = JSON.parse(raw) as Partial<ScoringConfig>;
    const merged: ScoringConfig = {
      ...DEFAULT_SCORING,
      ...parsed,
      version: 1,
      autoGrade: parsed.autoGrade !== false,
    };
    return withAutoGrades(merged);
  } catch {
    return withAutoGrades({ ...DEFAULT_SCORING });
  }
}

export function saveScoring(cfg: ScoringConfig): void {
  if (!canStore()) return;
  const next = withAutoGrades({ ...cfg, version: 1 });
  try {
    localStorage.setItem(SCORING_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function resetScoring(): ScoringConfig {
  const d = withAutoGrades({ ...DEFAULT_SCORING });
  saveScoring(d);
  return d;
}

/** Field metadata for admin UI */
export type ScoringField = {
  key: keyof Omit<ScoringConfig, "version" | "autoGrade">;
  th: string;
  en: string;
  group: "dx" | "plan" | "lab" | "perfect" | "grade" | "rep";
};

export const SCORING_FIELDS: ScoringField[] = [
  { key: "correctDx", th: "วินิจฉัยถูกต้อง", en: "Correct diagnosis", group: "dx" },
  { key: "missedDx", th: "พลาดวินิจฉัยหลัก", en: "Missed required diagnosis", group: "dx" },
  { key: "overDx", th: "วินิจฉัยเกิน", en: "Over-called diagnosis", group: "dx" },
  { key: "extraDxBonus", th: "จับโรคเสริมได้", en: "Extra true diagnosis", group: "dx" },
  { key: "correctPlan", th: "แผนรักษาครบกลุ่ม", en: "Required plan group hit", group: "plan" },
  { key: "missedPlan", th: "ขาดกลุ่มแผน", en: "Missed plan group", group: "plan" },
  { key: "bonusTx", th: "แผนโบนัส", en: "Bonus treatment", group: "plan" },
  { key: "harmfulTx", th: "แผนอันตราย", en: "Harmful treatment", group: "plan" },
  { key: "unnecessaryTx", th: "แผนไม่จำเป็น", en: "Unnecessary treatment", group: "plan" },
  { key: "usefulLab", th: "แล็บที่มีประโยชน์", en: "Useful lab ordered", group: "lab" },
  { key: "lowYieldLab", th: "แล็บเกิน (ไม่มีผลในเคส)", en: "Low-yield lab", group: "lab" },
  { key: "unneededLab", th: "แล็บไม่จำเป็น (มีผลแต่ไม่ useful)", en: "Unneeded lab", group: "lab" },
  { key: "perfectBonus", th: "โบนัสเคสสมบูรณ์", en: "Clean case bonus", group: "perfect" },
  { key: "gradeExcellent", th: "เกณฑ์ Excellent (≥)", en: "Excellent threshold (≥)", group: "grade" },
  { key: "gradeGood", th: "เกณฑ์ Good (≥)", en: "Good threshold (≥)", group: "grade" },
  { key: "gradeMixed", th: "เกณฑ์ Mixed (≥)", en: "Mixed threshold (≥)", group: "grade" },
  { key: "repExcellent", th: "ชื่อเสียงต่อเคส Excellent", en: "Rep per excellent case", group: "rep" },
  { key: "repGood", th: "ชื่อเสียงต่อเคส Good", en: "Rep per good case", group: "rep" },
  { key: "repMixed", th: "ชื่อเสียงต่อเคส Mixed", en: "Rep per mixed case", group: "rep" },
  { key: "repPoor", th: "ชื่อเสียงต่อเคส Poor", en: "Rep per poor case", group: "rep" },
  { key: "repMissedPerPatient", th: "หักชื่อเสียงต่อคนไข้ที่พลาด", en: "Rep penalty per missed patient", group: "rep" },
];
