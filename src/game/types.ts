export type Lang = "th" | "en";

export type Loc = { th: string; en: string };

export type Screen =
  | "title"
  | "howTo"
  | "records"
  | "leaderboard"
  | "handbook"
  | "admin"
  | "briefing"
  | "waiting"
  | "consult"
  | "debrief"
  | "shiftEnd"
  | "gameOver"
  | "careerWin";

export type DiseaseId =
  | "t2dm"
  | "htn"
  | "dyslipidemia"
  | "cad"
  | "copd"
  | "obesity"
  | "ckd"
  | "stroke_risk"
  | "gout"
  | "hf"
  | "hypoglycemia"
  | "htn_urgency";

export type TestId =
  | "hba1c"
  | "lipid"
  | "egfr"
  | "ecg"
  | "cxr"
  | "spiro"
  | "trop"
  | "uacr"
  | "bnp"
  | "uric";

export type ActionId =
  | "metformin"
  | "sglt2"
  | "insulin"
  | "acei"
  | "arb"
  | "ccb"
  | "thiazide"
  | "bb"
  | "statin"
  | "aspirin"
  | "laba_lama"
  | "allopurinol"
  | "loop"
  | "glucose_oral"
  | "nsaid"
  | "diet"
  | "exercise"
  | "smoking"
  | "salt"
  | "weight"
  | "alcohol"
  | "meals"
  | "refer_er"
  | "refer_cardio"
  | "refer_nephro";

export type ActionGroup = "med" | "life" | "refer";

export type Urgency = 1 | 2 | 3;

export type Grade = "excellent" | "good" | "mixed" | "poor";

export type Vitals = {
  bp: string;
  hr: number;
  bmi: number;
  spo2: number;
  temp: number;
  glucose?: number;
};

export type CaseDef = {
  id: string;
  portrait: number;
  name: Loc;
  age: number;
  sex: "m" | "f";
  job: Loc;
  complaint: Loc;
  history: Loc;
  vitals: Vitals;
  flags: Loc[];
  urgency: Urgency;
  difficulty: 1 | 2 | 3;
  trueDiagnoses: DiseaseId[];
  testResults: Partial<Record<TestId, Loc>>;
  usefulTests: TestId[];
  requiredDx: DiseaseId[];
  requiredGroups: ActionId[][];
  bonusTreatments: ActionId[];
  harmfulTreatments: ActionId[];
  teaching: Loc;
  outcomes: Record<Grade, Loc>;
};

export type DebriefLine = {
  kind: "ok" | "bonus" | "miss" | "bad";
  text: Loc;
  delta: number;
};

export type Debrief = {
  score: number;
  grade: Grade;
  lines: DebriefLine[];
  teaching: Loc;
  outcome: Loc;
  perfect: boolean;
};

export type ShiftPatient = {
  instanceId: string;
  caseId: string;
  seen: boolean;
  missed: boolean;
  wait: number;
  tests: TestId[];
  diagnoses: DiseaseId[];
  treatments: ActionId[];
  debrief: Debrief | null;
};

export type ShiftState = {
  day: number;
  minutesLeft: number;
  score: number;
  patients: ShiftPatient[];
  activeId: string | null;
  tab: "chart" | "labs" | "plan";
};
