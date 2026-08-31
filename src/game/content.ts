import type { ActionGroup, ActionId, DiseaseId, Loc, TestId } from "./types";

export const DISEASES: Record<
  DiseaseId,
  { label: Loc; hint: Loc }
> = {
  t2dm: {
    label: { th: "เบาหวานชนิดที่ 2", en: "Type 2 diabetes" },
    hint: {
      th: "Metformin เป็นยา一线แรก ร่วมกับปรับอาหาร ออกกำลัง ลดน้ำหนัก สเตตินเมื่ออายุ ≥40",
      en: "Metformin first-line with diet, activity, weight. Statin if age ≥40.",
    },
  },
  htn: {
    label: { th: "ความดันโลหิตสูง", en: "Hypertension" },
    hint: {
      th: "เริ่มยาหนึ่งชนิด (ACEI/ARB/CCB) ลดเกลือ ออกกำลัง ไม่ใช่เหตุฉุกเฉินถ้าไม่มีอวัยวะเป้าหมายเสีย",
      en: "Start one agent (ACEI/ARB/CCB), salt, activity. Not an emergency without end-organ damage.",
    },
  },
  dyslipidemia: {
    label: { th: "ไขมันในเลือดสูง", en: "Dyslipidemia" },
    hint: {
      th: "สเตตินเมื่อ LDL สูงหรือเสี่ยงหลอดเลือดสูง แอสไพรินไม่ใช่การป้องกันปฐมภูมิทั่วไป",
      en: "Statin for high LDL or high ASCVD risk. Aspirin is not routine primary prevention.",
    },
  },
  cad: {
    label: { th: "โรคหลอดเลือดหัวใจ", en: "Coronary artery disease" },
    hint: {
      th: "ป้องกันทุติยภูมิ: แอสไพริน สเตติน ยาต้านเจ็บหน้าอก ส่งต่ออายุรแพทย์หัวใจ เลิกบุหรี่",
      en: "Secondary prevention: aspirin, statin, antianginal, cardiology, stop smoking.",
    },
  },
  copd: {
    label: { th: "COPD", en: "COPD" },
    hint: {
      th: "ยืนยันด้วยสไปโรมิเตอร์ LAMA/LABA และเลิกบุหรี่คือแกนหลัก",
      en: "Confirm with spirometry. LAMA/LABA plus smoking cessation are the core.",
    },
  },
  obesity: {
    label: { th: "โรคอ้วน", en: "Obesity" },
    hint: {
      th: "เป้าหมายลดน้ำหนัก อาหาร และการเคลื่อนไหว — อย่าข้ามไปที่ยาอย่างเดียว",
      en: "Weight target, diet, and movement — do not skip to drugs alone.",
    },
  },
  ckd: {
    label: { th: "โรคไตเรื้อรัง", en: "Chronic kidney disease" },
    hint: {
      th: "ACEI/ARB เมื่อมีอัลบูมินในปัสสาวะ เลิก NSAID ควบคุมความดัน",
      en: "ACEI/ARB if albuminuria. Stop NSAIDs. Control blood pressure.",
    },
  },
  stroke_risk: {
    label: { th: "ป้องกันหลอดเลือดสมอง", en: "Stroke secondary prevention" },
    hint: {
      th: "หลังสมองขาดเลือด: ยาต้านเกล็ดเลือด สเตติน คุมความดัน",
      en: "After ischemic stroke: antiplatelet, statin, blood-pressure control.",
    },
  },
  gout: {
    label: { th: "โรคเกาต์", en: "Gout" },
    hint: {
      th: "เกาต์ซ้ำ: ลดยูเรต (allopurinol) ลดแอลกอฮอล์และน้ำหนัก อย่าใช้แอสไพรินรักษาเกาต์",
      en: "Recurrent gout: urate-lowering, cut alcohol and weight. Do not treat gout with aspirin.",
    },
  },
  hf: {
    label: { th: "หัวใจล้มเหลว", en: "Heart failure" },
    hint: {
      th: "ACEI/ARB, เบตาบล็อกเกอร์, ยาขับปัสสาวะเมื่อบวม ส่งต่อหัวใจ",
      en: "ACEI/ARB, beta-blocker, loop diuretic if congested, refer cardiology.",
    },
  },
  hypoglycemia: {
    label: { th: "น้ำตาลในเลือดต่ำ", en: "Hypoglycemia" },
    hint: {
      th: "รักษา hypo ก่อน แล้วทบทวนมื้ออาหารและยาที่ดึงน้ำตาล อย่าเพิ่มยาเบาหวานตอนนี้",
      en: "Treat hypo first, then review meals and glucose-lowering drugs. Do not intensify diabetes meds now.",
    },
  },
  htn_urgency: {
    label: { th: "ความดันสูงวิกฤต (urgency)", en: "Hypertensive urgency" },
    hint: {
      th: "ไม่มีอวัยวะเป้าหมายเสีย: ยาเม็ด ติดตามใกล้ชิด ไม่ต้องส่งห้องฉุกเฉิน",
      en: "No end-organ damage: oral agents and close follow-up — not the ER.",
    },
  },
};

export const TESTS: Record<
  TestId,
  { label: Loc; minutes: number; blurb: Loc }
> = {
  hba1c: {
    label: { th: "HbA1c", en: "HbA1c" },
    minutes: 3,
    blurb: { th: "น้ำตาลเฉลี่ย 3 เดือน", en: "3-month glucose average" },
  },
  lipid: {
    label: { th: "lipid panel", en: "Lipid panel" },
    minutes: 3,
    blurb: { th: "LDL HDL ไตรกลีเซอไรด์", en: "LDL, HDL, triglycerides" },
  },
  egfr: {
    label: { th: "creatinine / eGFR", en: "Creatinine / eGFR" },
    minutes: 2,
    blurb: { th: "การทำงานของไต", en: "Kidney function" },
  },
  ecg: {
    label: { th: "ECG", en: "ECG" },
    minutes: 4,
    blurb: { th: "คลื่นไฟฟ้าหัวใจ", en: "Heart rhythm and ischemia clues" },
  },
  cxr: {
    label: { th: "chest X-ray", en: "Chest X-ray" },
    minutes: 5,
    blurb: { th: "ภาพรังสีทรวงอก", en: "Lungs and heart size" },
  },
  spiro: {
    label: { th: "spirometry", en: "Spirometry" },
    minutes: 6,
    blurb: { th: "สมรรถภาพปอด", en: "Lung function" },
  },
  trop: {
    label: { th: "troponin", en: "Troponin" },
    minutes: 8,
    blurb: { th: "เอนไซม์กล้ามเนื้อหัวใจ", en: "Cardiac injury marker" },
  },
  uacr: {
    label: { th: "urine albumin", en: "Urine albumin" },
    minutes: 3,
    blurb: { th: "อัลบูมินในปัสสาวะ", en: "Albuminuria" },
  },
  bnp: {
    label: { th: "BNP", en: "BNP" },
    minutes: 4,
    blurb: { th: "เปปไทด์หัวใจล้มเหลว", en: "Heart-failure peptide" },
  },
  uric: {
    label: { th: "uric acid", en: "Uric acid" },
    minutes: 2,
    blurb: { th: "กรดยูริก", en: "Serum urate" },
  },
};

export const ACTIONS: Record<
  ActionId,
  { label: Loc; group: ActionGroup }
> = {
  metformin: { label: { th: "Metformin", en: "Metformin" }, group: "med" },
  sglt2: { label: { th: "SGLT2 inhibitor", en: "SGLT2 inhibitor" }, group: "med" },
  insulin: { label: { th: "Insulin", en: "Insulin" }, group: "med" },
  acei: { label: { th: "ACE inhibitor", en: "ACE inhibitor" }, group: "med" },
  arb: { label: { th: "ARB", en: "ARB" }, group: "med" },
  ccb: { label: { th: "Amlodipine (CCB)", en: "Amlodipine (CCB)" }, group: "med" },
  thiazide: { label: { th: "Thiazide", en: "Thiazide" }, group: "med" },
  bb: { label: { th: "Beta-blocker", en: "Beta-blocker" }, group: "med" },
  statin: { label: { th: "Statin", en: "Statin" }, group: "med" },
  aspirin: { label: { th: "Aspirin", en: "Aspirin" }, group: "med" },
  laba_lama: { label: { th: "LAMA / LABA", en: "LAMA / LABA" }, group: "med" },
  allopurinol: { label: { th: "Allopurinol", en: "Allopurinol" }, group: "med" },
  loop: { label: { th: "Loop diuretic", en: "Loop diuretic" }, group: "med" },
  glucose_oral: { label: { th: "น้ำตาลกิน / glucose gel", en: "Oral glucose" }, group: "med" },
  nsaid: { label: { th: "NSAID", en: "NSAID" }, group: "med" },
  diet: { label: { th: "ปรับอาหาร", en: "Diet counseling" }, group: "life" },
  exercise: { label: { th: "ออกกำลังกาย", en: "Exercise counseling" }, group: "life" },
  smoking: { label: { th: "เลิกบุหรี่", en: "Smoking cessation" }, group: "life" },
  salt: { label: { th: "ลดเกลือ", en: "Salt reduction" }, group: "life" },
  weight: { label: { th: "ลดน้ำหนัก", en: "Weight counseling" }, group: "life" },
  alcohol: { label: { th: "ลดแอลกอฮอล์", en: "Alcohol counseling" }, group: "life" },
  meals: { label: { th: "ไม่ข้ามมื้อ / จับคู่ยา", en: "Meal timing / med pairing" }, group: "life" },
  refer_er: { label: { th: "ส่งห้องฉุกเฉิน", en: "Refer to ER" }, group: "refer" },
  refer_cardio: { label: { th: "ส่งต่อหัวใจ", en: "Refer cardiology" }, group: "refer" },
  refer_nephro: { label: { th: "ส่งต่อไต", en: "Refer nephrology" }, group: "refer" },
};

export const DISEASE_ORDER: DiseaseId[] = [
  "t2dm",
  "htn",
  "dyslipidemia",
  "obesity",
  "cad",
  "hf",
  "copd",
  "ckd",
  "stroke_risk",
  "gout",
  "hypoglycemia",
  "htn_urgency",
];

export const ACTION_ORDER: ActionId[] = [
  "metformin",
  "sglt2",
  "insulin",
  "acei",
  "arb",
  "ccb",
  "thiazide",
  "bb",
  "statin",
  "aspirin",
  "laba_lama",
  "allopurinol",
  "loop",
  "glucose_oral",
  "nsaid",
  "diet",
  "exercise",
  "smoking",
  "salt",
  "weight",
  "alcohol",
  "meals",
  "refer_er",
  "refer_cardio",
  "refer_nephro",
];

export const TEST_ORDER: TestId[] = [
  "hba1c",
  "lipid",
  "egfr",
  "uacr",
  "uric",
  "ecg",
  "trop",
  "bnp",
  "cxr",
  "spiro",
];

export function loc(lang: "th" | "en", s: Loc): string {
  return s[lang];
}
