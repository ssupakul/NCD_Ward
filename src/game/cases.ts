import type { CaseDef } from "./types";

export const CASES: CaseDef[] = [
  {
    id: "new_t2dm",
    portrait: 0,
    name: { th: "สมชาย บุญมี", en: "Somchai Boonmee" },
    age: 52,
    sex: "m",
    job: { th: "ค้าขาย", en: "Shopkeeper" },
    complaint: {
      th: "กระหายน้ำ ปัสสาวะบ่อย น้ำหนักลด 4 กก. ใน 2 เดือน",
      en: "Thirst, frequent urination, 4 kg weight loss in 2 months",
    },
    history: {
      th: "ไม่เคยตรวจสุขภาพ 5 ปี พ่อเป็นเบาหวาน ดื่มน้ำหวานทั้งวัน นั่งขายของทั้งวัน บุหรี่ไม่มี",
      en: "No checkup in 5 years. Father had diabetes. Sweet drinks all day, sits at the stall. No smoking.",
    },
    vitals: { bp: "132/84", hr: 78, bmi: 29.4, spo2: 98, temp: 36.7, glucose: 186 },
    flags: [
      { th: "น้ำตาลปลายนิ้ว 186", en: "Fingerstick glucose 186" },
      { th: "BMI 29.4", en: "BMI 29.4" },
    ],
    urgency: 2,
    difficulty: 1,
    trueDiagnoses: ["t2dm", "obesity"],
    testResults: {
      hba1c: { th: "HbA1c 8.4%", en: "HbA1c 8.4%" },
      lipid: { th: "LDL 142  HDL 38  TG 210", en: "LDL 142  HDL 38  TG 210" },
      egfr: { th: "eGFR 92 mL/min", en: "eGFR 92 mL/min" },
    },
    usefulTests: ["hba1c", "lipid", "egfr"],
    requiredDx: ["t2dm"],
    requiredGroups: [["metformin"], ["diet"], ["exercise"], ["weight"]],
    bonusTreatments: ["statin"],
    harmfulTreatments: ["insulin", "aspirin", "refer_er", "glucose_oral"],
    teaching: {
      th: "เบาหวานใหม่ HbA1c 8.4% โดยไม่มีภาวะขาดอินซูลินรุนแรง: metformin + ปรับชีวิตเป็นแกน ไม่เริ่มอินซูลินเป็นด่านแรก สเตตินเหมาะสมในเบาหวานอายุ ≥40 แอสไพรินไม่ใช่การป้องกันปฐมภูมิทั่วไป",
      en: "New T2DM at HbA1c 8.4% without severe catabolism: metformin plus lifestyle, not insulin first. Statin is reasonable at age ≥40. Aspirin is not routine primary prevention.",
    },
    outcomes: {
      excellent: {
        th: "สมชายได้แผนที่ครบ จะกลับมาวัด HbA1c ใน 3 เดือน",
        en: "Somchai leaves with a complete plan and a 3-month HbA1c follow-up.",
      },
      good: {
        th: "น้ำตาลจะดีขึ้น แต่ยังมีช่องโหว่ในแผน",
        en: "Glucose should improve, though the plan has gaps.",
      },
      mixed: {
        th: "เขายังสับสนว่าต้องเปลี่ยนอะไรในชีวิตประจำวัน",
        en: "He still is not sure what to change day to day.",
      },
      poor: {
        th: "เบาหวานไม่ถูกจัดการ เสี่ยงภาวะแทรกซ้อนในไม่ช้า",
        en: "Diabetes is unmanaged. Complications will not wait.",
      },
    },
  },
  {
    id: "essential_htn",
    portrait: 1,
    name: { th: "ลำดวน ศรีสุข", en: "Lamduan Srisuk" },
    age: 68,
    sex: "f",
    job: { th: "เกษียณ", en: "Retired" },
    complaint: {
      th: "ปวดหัวตุบ ๆ ตอนเช้า วัดความดันที่บ้านได้ 170",
      en: "Throbbing morning headaches. Home BP readings around 170",
    },
    history: {
      th: "กินอาหารเค็ม ลูกทำกับข้าวให้ เดินในซอยได้ บุหรี่ไม่มี ไม่มีเจ็บหน้าอก แขนขาเท่ากัน มองเห็นชัด",
      en: "Salty diet. Walks the soi fine. No smoking, no chest pain, equal limbs, vision unchanged.",
    },
    vitals: { bp: "168/96", hr: 72, bmi: 23.1, spo2: 98, temp: 36.6 },
    flags: [{ th: "ความดันบ้าน ~170", en: "Home BP ~170" }],
    urgency: 1,
    difficulty: 1,
    trueDiagnoses: ["htn"],
    testResults: {
      egfr: { th: "eGFR 78 mL/min", en: "eGFR 78 mL/min" },
      lipid: { th: "LDL 118  HDL 52  TG 140", en: "LDL 118  HDL 52  TG 140" },
      hba1c: { th: "HbA1c 5.6%", en: "HbA1c 5.6%" },
      ecg: { th: "sinus, LVH เล็กน้อย", en: "Sinus, mild LVH" },
    },
    usefulTests: ["egfr", "ecg"],
    requiredDx: ["htn"],
    requiredGroups: [["acei", "arb", "ccb"], ["salt"]],
    bonusTreatments: ["exercise"],
    harmfulTreatments: ["refer_er", "insulin", "aspirin", "metformin", "glucose_oral"],
    teaching: {
      th: "ความดัน 168/96 โดยไม่มีอาการอวัยวะเป้าหมายเสีย คือความดันโลหิตสูงที่คลินิก เริ่มยาหนึ่งชนิดและลดเกลือ ไม่ใช่เหตุส่งห้องฉุกเฉิน",
      en: "BP 168/96 without end-organ symptoms is clinic hypertension. Start one agent and cut salt. This is not an ER transfer.",
    },
    outcomes: {
      excellent: {
        th: "ลำดวนได้ยาและความเข้าใจเรื่องเกลือ จะวัดความดันที่บ้าน",
        en: "Lamduan leaves with a pill and a salt plan, and will log home BP.",
      },
      good: {
        th: "ความดันจะถูกแตะต้อง แต่คำแนะนำยังไม่ครบ",
        en: "BP will be addressed, though counseling is thin.",
      },
      mixed: {
        th: "เธอยังไม่แน่ใจว่าปวดหัวเรื่องความดันหรือไม่",
        en: "She still is not sure the headaches are about blood pressure.",
      },
      poor: {
        th: "ความดันสูงเดินต่อไป เสี่ยงหลอดเลือดสมอง",
        en: "Hypertension continues. Stroke risk stays high.",
      },
    },
  },
  {
    id: "dyslipidemia",
    portrait: 2,
    name: { th: "พิชญา วงศ์ไพบูลย์", en: "Pitchaya Wongpaiboon" },
    age: 34,
    sex: "f",
    job: { th: "บัญชี", en: "Accountant" },
    complaint: {
      th: "มาตรวจสุขภาพบริษัท ผลเลือดไขมันสูง",
      en: "Company checkup flagged high cholesterol",
    },
    history: {
      th: "พ่อกล้ามเนื้อหัวใจตายอายุ 50 ตัวเองไม่สูบบุหรี่ ออกกำลังน้อย นั่งหน้าจอทั้งวัน ประจำเดือนปกติ ไม่ได้ตั้งครรภ์",
      en: "Father had an MI at 50. She does not smoke, sits at a screen all day, cycles normally, not pregnant.",
    },
    vitals: { bp: "118/76", hr: 68, bmi: 22.4, spo2: 99, temp: 36.5 },
    flags: [{ th: "ประวัติครอบครัว CAD เร็ว", en: "Premature family CAD" }],
    urgency: 1,
    difficulty: 1,
    trueDiagnoses: ["dyslipidemia"],
    testResults: {
      lipid: { th: "LDL 178  HDL 42  TG 160", en: "LDL 178  HDL 42  TG 160" },
      hba1c: { th: "HbA1c 5.4%", en: "HbA1c 5.4%" },
      egfr: { th: "eGFR 104 mL/min", en: "eGFR 104 mL/min" },
    },
    usefulTests: ["lipid"],
    requiredDx: ["dyslipidemia"],
    requiredGroups: [["statin"], ["diet"]],
    bonusTreatments: ["exercise"],
    harmfulTreatments: ["aspirin", "metformin", "insulin", "refer_er", "glucose_oral"],
    teaching: {
      th: "LDL 178 กับประวัติครอบครัวโรคหัวใจเร็ว: สเตตินและอาหารคือคำตอบ แอสไพรินไม่ได้ให้เป็นค่าเริ่มต้นสำหรับการป้องกันปฐมภูมิ",
      en: "LDL 178 plus premature family CAD: statin and diet. Aspirin is not default primary prevention.",
    },
    outcomes: {
      excellent: {
        th: "พิชญาเข้าใจว่าไขมันสูงเป็นโรคที่รักษาได้ แม้ยังไม่เจ็บ",
        en: "Pitchaya understands high LDL is a treatable disease, even without pain.",
      },
      good: {
        th: "ได้สเตติน แต่ยังขาดภาพรวมการป้องกัน",
        en: "She has a statin, but prevention counseling is incomplete.",
      },
      mixed: {
        th: "เธออาจไม่กินยาเพราะยังรู้สึกสบายดี",
        en: "She may not take the medicine because she feels well.",
      },
      poor: {
        th: "LDL สูงเดินต่อไปบนพื้นประวัติครอบครัวที่เสี่ยง",
        en: "High LDL continues on a high-risk family background.",
      },
    },
  },
  {
    id: "metabolic",
    portrait: 4,
    name: { th: "นภา เจริญผล", en: "Napa Charoenphon" },
    age: 48,
    sex: "f",
    job: { th: "ขายอาหาร", en: "Food vendor" },
    complaint: {
      th: "เหนื่อยง่าย ชาปลายเท้า มีดเป็นแผลหายช้า",
      en: "Easy fatigue, tingling toes, a slow-healing knife cut",
    },
    history: {
      th: "ชิมอาหารเค็มทั้งวัน นั่งขายของ น้ำอัดลมทุกมื้อ ไม่เคยตรวจน้ำตาล ความดันที่ร้านได้ 150 ขึ้น",
      en: "Tastes salty food all day, sits at the stall, soda with every meal. Never checked sugar. Shop BP often above 150.",
    },
    vitals: { bp: "154/94", hr: 82, bmi: 32.1, spo2: 97, temp: 36.8, glucose: 162 },
    flags: [
      { th: "น้ำตาลปลายนิ้ว 162", en: "Fingerstick 162" },
      { th: "BMI 32.1", en: "BMI 32.1" },
    ],
    urgency: 2,
    difficulty: 2,
    trueDiagnoses: ["t2dm", "htn", "obesity", "dyslipidemia"],
    testResults: {
      hba1c: { th: "HbA1c 7.6%", en: "HbA1c 7.6%" },
      lipid: { th: "LDL 138  HDL 36  TG 220", en: "LDL 138  HDL 36  TG 220" },
      egfr: { th: "eGFR 88 mL/min", en: "eGFR 88 mL/min" },
      uacr: { th: "UACR 28 mg/g", en: "UACR 28 mg/g" },
    },
    usefulTests: ["hba1c", "lipid", "egfr"],
    requiredDx: ["t2dm", "htn", "obesity"],
    requiredGroups: [["metformin"], ["acei", "arb"], ["statin"], ["diet"], ["weight"]],
    bonusTreatments: ["exercise", "salt", "sglt2"],
    harmfulTreatments: ["insulin", "refer_er", "aspirin", "nsaid", "glucose_oral"],
    teaching: {
      th: "กลุ่มเมตาบอลิกต้องรักษาพร้อมกัน: น้ำตาล ความดัน ไขมัน น้ำหนัก ACEI/ARB เหมาะเมื่อมีเบาหวาน สเตตินในเบาหวานอายุ ≥40 อย่าให้แอสไพรินป้องกันปฐมภูมิเป็นค่าเริ่ม",
      en: "Metabolic cluster: treat glucose, BP, lipids, and weight together. ACEI/ARB fits diabetes. Statin at age ≥40. Do not default to aspirin for primary prevention.",
    },
    outcomes: {
      excellent: {
        th: "นภาได้แผนครบสี่เสา จะปรับร้านและยาไปด้วยกัน",
        en: "Napa leaves with all four pillars covered — stall habits and medicines together.",
      },
      good: {
        th: "โรคหลักถูกแตะ แต่ยังมีเสาที่ขาด",
        en: "The main diseases are touched, with pillars still missing.",
      },
      mixed: {
        th: "เธอยังคิดว่าเหนื่อยเพราะงานหนักอย่างเดียว",
        en: "She still thinks fatigue is only the job.",
      },
      poor: {
        th: "เมตาบอลิกซินโดรมเดินต่อ แผลที่มือคือคำใบ้ที่ถูกมองข้าม",
        en: "The metabolic syndrome continues. The slow wound was a warning.",
      },
    },
  },
  {
    id: "stable_angina",
    portrait: 5,
    name: { th: "ประยุทธ แก้วมณี", en: "Prayut Kaewmanee" },
    age: 58,
    sex: "m",
    job: { th: "ก่อสร้าง", en: "Construction" },
    complaint: {
      th: "แน่นหน้าอกเวลาปีนนั่งร้าน หายเมื่อพัก 3–4 นาที",
      en: "Chest tightness climbing scaffolding, eases after 3–4 minutes of rest",
    },
    history: {
      th: "สูบบุหรี่ 20 ซอง-ปี ยังไม่เลิก ไม่มีเหงื่อท่วมหรือเจ็บตอนพัก ได้กลิ่นควันเชื่อมทั้งวัน",
      en: "20 pack-year smoker, still smoking. No rest pain, no drenching sweat. Weld smoke all day.",
    },
    vitals: { bp: "148/90", hr: 84, bmi: 27.2, spo2: 97, temp: 36.6 },
    flags: [
      { th: "เจ็บตามแรงงาน หายเมื่อพัก", en: "Exertional pain, rest-relieved" },
      { th: "สูบบุหรี่", en: "Smoker" },
    ],
    urgency: 3,
    difficulty: 2,
    trueDiagnoses: ["cad", "htn"],
    testResults: {
      ecg: {
        th: "T inversion inferolateral สงสัย ischemia",
        en: "Inferolateral T inversion, possible ischemia",
      },
      trop: { th: "troponin ลบ", en: "Troponin negative" },
      lipid: { th: "LDL 154  HDL 34  TG 180", en: "LDL 154  HDL 34  TG 180" },
      hba1c: { th: "HbA1c 5.8%", en: "HbA1c 5.8%" },
    },
    usefulTests: ["ecg", "trop", "lipid"],
    requiredDx: ["cad"],
    requiredGroups: [["statin"], ["aspirin"], ["refer_cardio"], ["smoking"]],
    bonusTreatments: ["bb", "acei", "exercise"],
    harmfulTreatments: ["refer_er", "nsaid", "insulin", "glucose_oral"],
    teaching: {
      th: "เจ็บหน้าอกตามแรงงาน หายเมื่อพัก คือ angina คงที่: แอสไพริน สเตติน ส่งต่อหัวใจ เลิกบุหรี่ ไม่ใช่ ACS ที่ต้องห้องฉุกเฉินถ้าเจ็บไม่เกิดตอนพักและ troponin ลบ",
      en: "Exertional, rest-relieved pain is stable angina: aspirin, statin, cardiology, stop smoking. Not an ER ACS if pain is not at rest and troponin is negative.",
    },
    outcomes: {
      excellent: {
        th: "ประยุทธได้ยาป้องกันทุติยภูมิและคิวหัวใจ บุหรี่ถูกพูดถึงอย่างจริง",
        en: "Prayut leaves on secondary prevention with a cardiology slot. Smoking was named.",
      },
      good: {
        th: "ทิศทางถูก แต่แผนยังไม่ครบแกนป้องกัน",
        en: "Direction is right, but prevention is incomplete.",
      },
      mixed: {
        th: "เขาอาจกลับไปปีนนั่งร้านโดยไม่มีแผนเจ็บหน้าอก",
        en: "He may climb scaffolding again with no angina plan.",
      },
      poor: {
        th: "โรคหลอดเลือดหัวใจถูกมองข้าม — นี่คือเคสที่พลาดแล้วแพง",
        en: "CAD was missed. This is an expensive miss.",
      },
    },
  },
  {
    id: "copd",
    portrait: 5,
    name: { th: "อนุชา พิทักษ์", en: "Anucha Phithak" },
    age: 63,
    sex: "m",
    job: { th: "ทำนา", en: "Farmer" },
    complaint: {
      th: "ไอเรื้อรัง เหนื่อยตอนเดินคันนา เสมหะทุกเช้า",
      en: "Chronic cough, breathless on the paddy path, morning sputum",
    },
    history: {
      th: "สูบบุหรี่ 35 ซอง-ปี ยังไม่เลิก ไม่มีไข้ ไม่มีเลือดในเสมหะ เคยได้ยาปฏิชีวนะซ้ำโดยไม่ดีขึ้น",
      en: "35 pack-year smoker, still smoking. No fever, no hemoptysis. Repeated antibiotics have not helped.",
    },
    vitals: { bp: "130/80", hr: 88, bmi: 21.0, spo2: 93, temp: 36.7 },
    flags: [
      { th: "SpO2 93%", en: "SpO2 93%" },
      { th: "สูบบุหรี่", en: "Smoker" },
    ],
    urgency: 2,
    difficulty: 2,
    trueDiagnoses: ["copd"],
    testResults: {
      spiro: { th: "FEV1/FVC 0.62  FEV1 58%", en: "FEV1/FVC 0.62  FEV1 58%" },
      cxr: { th: "hyperinflation ไม่มีปอดอักเสบ", en: "Hyperinflation, no pneumonia" },
      ecg: { th: "sinus tachycardia เล็กน้อย", en: "Mild sinus tachycardia" },
    },
    usefulTests: ["spiro", "cxr"],
    requiredDx: ["copd"],
    requiredGroups: [["laba_lama"], ["smoking"]],
    bonusTreatments: ["exercise"],
    harmfulTreatments: ["insulin", "aspirin", "refer_er", "metformin", "glucose_oral"],
    teaching: {
      th: "COPD ยืนยันด้วยสไปโรมิเตอร์ ไม่ใช่ด้วยการให้ยาปฏิชีวนะซ้ำ LAMA/LABA และเลิกบุหรี่คือแกน ออกกำลังช่วยสมรรถภาพ",
      en: "COPD is confirmed with spirometry, not repeat antibiotics. LAMA/LABA and smoking cessation are the core.",
    },
    outcomes: {
      excellent: {
        th: "อนุชาได้ยาขยายหลอดลมและเหตุผลที่ต้องเลิกบุหรี่วันนี้",
        en: "Anucha leaves with a bronchodilator and a reason to quit today.",
      },
      good: {
        th: "ทิศทางปอดถูก แต่ยังขาดชิ้นสำคัญ",
        en: "Lung direction is right, with a key piece missing.",
      },
      mixed: {
        th: "เขายังคิดว่าไอเพราะฝุ่นนาอย่างเดียว",
        en: "He still blames only paddy dust.",
      },
      poor: {
        th: "COPD ไม่ถูกเรียกชื่อ บุหรี่เดินต่อ",
        en: "COPD unnamed. The cigarettes continue.",
      },
    },
  },
  {
    id: "ckd_htn",
    portrait: 3,
    name: { th: "วิเชียร ทองคำ", en: "Wichian Thongkham" },
    age: 74,
    sex: "m",
    job: { th: "ครูเกษียณ", en: "Retired teacher" },
    complaint: {
      th: "ข้อเท้าบวม กินยาแก้ปวดเข่าทุกวัน ความดันขึ้น ๆ ลง ๆ",
      en: "Ankle swelling, daily knee-pain pills, swinging blood pressure",
    },
    history: {
      th: "ความดันสูง 12 ปี กินยาไม่สม่ำเสมอ ใช้ NSAID แก้ข้อเข่าเสื่อม ไม่มีหอบตอนนอนราบ",
      en: "Hypertension for 12 years, irregular pills. Daily NSAIDs for osteoarthritis. No orthopnea.",
    },
    vitals: { bp: "162/88", hr: 70, bmi: 26.4, spo2: 97, temp: 36.6 },
    flags: [
      { th: "NSAID รายวัน", en: "Daily NSAIDs" },
      { th: "บวมข้อเท้า", en: "Ankle edema" },
    ],
    urgency: 2,
    difficulty: 2,
    trueDiagnoses: ["ckd", "htn"],
    testResults: {
      egfr: { th: "eGFR 48 mL/min", en: "eGFR 48 mL/min" },
      uacr: { th: "UACR 120 mg/g", en: "UACR 120 mg/g" },
      hba1c: { th: "HbA1c 5.7%", en: "HbA1c 5.7%" },
      bnp: { th: "BNP ปกติ", en: "BNP normal" },
    },
    usefulTests: ["egfr", "uacr", "bnp"],
    requiredDx: ["ckd", "htn"],
    requiredGroups: [["acei", "arb"], ["salt"]],
    bonusTreatments: ["statin", "refer_nephro"],
    harmfulTreatments: ["nsaid", "refer_er", "insulin", "metformin", "glucose_oral"],
    teaching: {
      th: "eGFR 48 กับอัลบูมินในปัสสาวะคือ CKD ที่คลินิก ACEI/ARB คือยาความดันที่ปกป้องไต เลิก NSAID การส่งต่อไตยังไม่บังคับที่ระยะนี้ถ้าแผนครบ",
      en: "eGFR 48 with albuminuria is clinic CKD. ACEI/ARB is kidney-protective BP therapy. Stop NSAIDs. Nephrology is optional at this stage if the plan is complete.",
    },
    outcomes: {
      excellent: {
        th: "วิเชียรเลิก NSAID ได้ยาปกป้องไต และเข้าใจเรื่องเกลือ",
        en: "Wichian stops NSAIDs, starts kidney-protective therapy, and understands salt.",
      },
      good: {
        th: "ไตถูกพูดถึง แต่ยังมียาที่ทำร้ายหรือแผนไม่ครบ",
        en: "The kidney was named, with remaining holes in the plan.",
      },
      mixed: {
        th: "เขายังอาจกลับไปซื้อยาแก้ปวดเข่าเอง",
        en: "He may still buy knee-pain pills himself.",
      },
      poor: {
        th: "CKD ถูกมองเป็นแค่บวม ความดันและ NSAID เดินต่อ",
        en: "CKD was treated as swelling. BP and NSAIDs continue.",
      },
    },
  },
  {
    id: "post_stroke",
    portrait: 6,
    name: { th: "สุภาพ รัตนชัย", en: "Suphap Rattanachai" },
    age: 61,
    sex: "f",
    job: { th: "แม่บ้าน", en: "Homemaker" },
    complaint: {
      th: "มาตามนัดหลังอัมพาตเล็กเมื่อ 8 เดือน ยังไม่ได้กินยาอะไรเป็นประจำ",
      en: "Follow-up 8 months after a small ischemic stroke. Not on regular medicines",
    },
    history: {
      th: "แขนขวาอ่อนแรงชั่วคราว รักษาที่อำเภอแล้วกลับบ้าน ไม่มี AF ที่รู้ ไม่สูบบุหรี่ อาหารเค็ม",
      en: "Transient right-arm weakness, treated at the district hospital, then home. No known AF. No smoking. Salty diet.",
    },
    vitals: { bp: "152/90", hr: 76, bmi: 25.2, spo2: 98, temp: 36.6 },
    flags: [{ th: "stroke 8 เดือน ยังไม่มียาป้องกัน", en: "Stroke 8 months ago, no prevention" }],
    urgency: 2,
    difficulty: 2,
    trueDiagnoses: ["stroke_risk", "htn", "dyslipidemia"],
    testResults: {
      lipid: { th: "LDL 148  HDL 46  TG 150", en: "LDL 148  HDL 46  TG 150" },
      egfr: { th: "eGFR 71 mL/min", en: "eGFR 71 mL/min" },
      ecg: { th: "sinus ไม่มี AF", en: "Sinus, no AF" },
      hba1c: { th: "HbA1c 5.9%", en: "HbA1c 5.9%" },
    },
    usefulTests: ["lipid", "ecg"],
    requiredDx: ["stroke_risk"],
    requiredGroups: [["aspirin"], ["statin"], ["acei", "arb", "ccb"], ["salt"]],
    bonusTreatments: ["exercise", "diet"],
    harmfulTreatments: ["refer_er", "insulin", "nsaid", "glucose_oral"],
    teaching: {
      th: "หลังสมองขาดเลือด การป้องกันทุติยภูมิคือแอสไพริน สเตติน คุมความดัน — ไม่ใช่การรอให้อาการกลับมา",
      en: "After ischemic stroke, secondary prevention is aspirin, statin, and BP control — not waiting for the next event.",
    },
    outcomes: {
      excellent: {
        th: "สุภาพได้ชุดป้องกันทุติยภูมิครบ ครั้งหน้าจะไม่ใช่ ‘รอให้อัมพาตกลับ’",
        en: "Suphap leaves on a full secondary-prevention set.",
      },
      good: {
        th: "ทิศทางถูก แต่ยังขาดชิ้นป้องกัน",
        en: "Direction is right, with prevention still incomplete.",
      },
      mixed: {
        th: "เธอยังคิดว่าโรคจบแล้วตั้งแต่กลับบ้าน",
        en: "She still thinks the illness ended when she went home.",
      },
      poor: {
        th: "ความเสี่ยงหลอดเลือดสมองซ้ำยังสูงเท่าเดิม",
        en: "Recurrent stroke risk is unchanged.",
      },
    },
  },
  {
    id: "gout",
    portrait: 7,
    name: { th: "ธนกร อารีรักษ์", en: "Thanakorn Areerak" },
    age: 41,
    sex: "m",
    job: { th: "คนขับ", en: "Driver" },
    complaint: {
      th: "นิ้วโป้งเท้าขวาเคยบวมแดงมา 3 ครั้งปีนี้ ครั้งล่าสุดหายไป 2 สัปดาห์",
      en: "Right big toe swollen and red three times this year. Last flare settled 2 weeks ago",
    },
    history: {
      th: "ดื่มเบียร์เย็นหลังวิ่งงาน BMI สูง กินเครื่องใน นั่งขับ 10 ชั่วโมง ไม่มีนิ่วไต",
      en: "Cold beer after shifts, high BMI, organ meat, 10-hour drives. No kidney stones.",
    },
    vitals: { bp: "138/86", hr: 80, bmi: 31.2, spo2: 98, temp: 36.7, glucose: 118 },
    flags: [
      { th: "เกาต์ซ้ำ 3 ครั้ง/ปี", en: "Gout ×3 this year" },
      { th: "BMI 31.2", en: "BMI 31.2" },
    ],
    urgency: 1,
    difficulty: 2,
    trueDiagnoses: ["gout", "obesity"],
    testResults: {
      uric: { th: "uric acid 9.2 mg/dL", en: "Uric acid 9.2 mg/dL" },
      egfr: { th: "eGFR 96 mL/min", en: "eGFR 96 mL/min" },
      hba1c: { th: "HbA1c 5.8%", en: "HbA1c 5.8%" },
      lipid: { th: "LDL 128  TG 240", en: "LDL 128  TG 240" },
    },
    usefulTests: ["uric", "egfr"],
    requiredDx: ["gout"],
    requiredGroups: [["allopurinol"], ["alcohol"], ["weight"]],
    bonusTreatments: ["diet"],
    harmfulTreatments: ["aspirin", "refer_er", "insulin", "glucose_oral"],
    teaching: {
      th: "เกาต์ซ้ำเมื่ออาการสงบแล้ว: เริ่มยาลดยูเรต ลดเบียร์และน้ำหนัก แอสไพรินไม่ใช่ยาเกาต์ และอาจทำยูเรตแย่ลง",
      en: "Recurrent gout, flare settled: start urate-lowering, cut beer and weight. Aspirin is not a gout drug and can worsen urate.",
    },
    outcomes: {
      excellent: {
        th: "ธนกรได้แผนลดยูเรตและเบียร์ จะไม่รอให้โป้งเท้าบวมรอบสี่",
        en: "Thanakorn leaves with a urate plan and a beer plan.",
      },
      good: {
        th: "ทิศทางถูก แต่ชีวิตประจำวันยังไม่ถูกแตะพอ",
        en: "Direction is right, with lifestyle still thin.",
      },
      mixed: {
        th: "เขาคิดว่าเกาต์คือเรื่องข้อเท้า ไม่ใช่เรื่องเมตาบอลิก",
        en: "He still thinks gout is only a toe problem.",
      },
      poor: {
        th: "รอบสี่กำลังมา และแอสไพรินจะไม่ช่วย",
        en: "A fourth flare is coming, and aspirin will not help.",
      },
    },
  },
  {
    id: "htn_urgency",
    portrait: 2,
    name: { th: "ศิริพร แสงทอง", en: "Siriporn Saengthong" },
    age: 45,
    sex: "f",
    job: { th: "ครู", en: "Teacher" },
    complaint: {
      th: "ปวดหัวมาก ความดันที่ห้องพยาบาลโรงเรียน 198/118",
      en: "Severe headache. School-nurse BP 198/118",
    },
    history: {
      th: "ขาดยาความดัน 10 วัน เพราะยาหมด ไม่มีเจ็บหน้าอก ไม่มีอ่อนแรง ไม่ตามัว ไม่หอบ มองเห็นปกติ เดินได้เอง",
      en: "Ran out of BP meds 10 days ago. No chest pain, no weakness, no visual loss, no breathlessness. Walked in.",
    },
    vitals: { bp: "198/118", hr: 90, bmi: 24.8, spo2: 98, temp: 36.6 },
    flags: [
      { th: "ขาดยา 10 วัน", en: "Off meds 10 days" },
      { th: "ไม่มี deficit", en: "No deficit" },
    ],
    urgency: 3,
    difficulty: 3,
    trueDiagnoses: ["htn_urgency", "htn"],
    testResults: {
      ecg: { th: "sinus, ไม่มี ST elevation", en: "Sinus, no ST elevation" },
      egfr: { th: "eGFR 84 mL/min (baseline)", en: "eGFR 84 (baseline)" },
      trop: { th: "troponin ลบ", en: "Troponin negative" },
    },
    usefulTests: ["ecg", "egfr"],
    requiredDx: ["htn_urgency"],
    requiredGroups: [["acei", "arb", "ccb"]],
    bonusTreatments: ["salt"],
    harmfulTreatments: ["refer_er", "insulin", "nsaid", "glucose_oral"],
    teaching: {
      th: "ความดันสูงมากโดยไม่มีอวัยวะเป้าหมายเสียคือ hypertensive urgency: เริ่มยาเม็ด ติดตามใกล้ชิด ไม่ใช่ hypertensive emergency ที่ต้องห้องฉุกเฉิน",
      en: "Very high BP without end-organ damage is hypertensive urgency: restart oral therapy and observe. It is not an ER emergency.",
    },
    outcomes: {
      excellent: {
        th: "ศิริพรได้ยากลับ และรู้ว่าเลขบนเครื่องวัดไม่ได้แปลว่าต้อง ICU เสมอ",
        en: "Siriporn restarts therapy and learns that a scary number is not always an ICU.",
      },
      good: {
        th: "ยาถูกเริ่ม แต่การแยก urgency/emergency ยังไม่คม",
        en: "Meds restarted, with a blurry urgency/emergency line.",
      },
      mixed: {
        th: "เธออาจถูกส่งต่อเกินเหตุ หรือกลับบ้านโดยไม่มียา",
        en: "She may be over-referred, or sent home with no medicine.",
      },
      poor: {
        th: "ห้องฉุกเฉินเต็มไปด้วยเคสที่ไม่ฉุกเฉิน — หรือความดันไม่ถูกแตะเลย",
        en: "Either the ER is used for a non-emergency, or the BP is not touched.",
      },
    },
  },
  {
    id: "hypoglycemia",
    portrait: 4,
    name: { th: "มานี สุขสวัสดิ์", en: "Manee Suksawat" },
    age: 55,
    sex: "f",
    job: { th: "พยาบาล", en: "Nurse" },
    complaint: {
      th: "เหงื่อแตก มือสั่น งุนงง หลังเวรดึก ข้ามมื้อเช้า",
      en: "Sweating, tremor, foggy after a night shift, skipped breakfast",
    },
    history: {
      th: "เบาหวาน 8 ปี กิน metformin + glipizide ยังไม่ขาดยา ข้ามมื้อบ่อยตอนเวร ไม่มีเจ็บหน้าอก",
      en: "T2DM for 8 years on metformin plus glipizide. Skips meals on shift. No chest pain.",
    },
    vitals: { bp: "118/74", hr: 96, bmi: 26.0, spo2: 98, temp: 36.5, glucose: 52 },
    flags: [
      { th: "น้ำตาลปลายนิ้ว 52", en: "Fingerstick 52" },
      { th: "ข้ามมื้อ + sulfonylurea", en: "Skipped meal + sulfonylurea" },
    ],
    urgency: 3,
    difficulty: 3,
    trueDiagnoses: ["hypoglycemia", "t2dm"],
    testResults: {
      hba1c: { th: "HbA1c 6.6%", en: "HbA1c 6.6%" },
      egfr: { th: "eGFR 90 mL/min", en: "eGFR 90 mL/min" },
      ecg: { th: "sinus tachycardia", en: "Sinus tachycardia" },
    },
    usefulTests: ["hba1c"],
    requiredDx: ["hypoglycemia"],
    requiredGroups: [["glucose_oral"], ["meals"]],
    bonusTreatments: ["diet"],
    harmfulTreatments: ["insulin", "refer_er", "sglt2", "nsaid"],
    teaching: {
      th: "น้ำตาล 52 กับอาการ: ให้กลูโคสก่อน แล้วทบทวนมื้ออาหารกับ sulfonylurea อย่าเพิ่มยาลดน้ำตาลและไม่ต้องห้องฉุกเฉินถ้ากินได้และอาการดีขึ้น",
      en: "Glucose 52 with symptoms: give glucose first, then review meals and sulfonylurea. Do not intensify glucose-lowering. ER is unnecessary if she can swallow and improves.",
    },
    outcomes: {
      excellent: {
        th: "มานีตื่นชัด น้ำตาลขึ้น และจะไม่ฉีดหรือเพิ่มยาในจังหวะนี้",
        en: "Manee clears, glucose rises, and nobody stacked more diabetes drugs.",
      },
      good: {
        th: "Hypo ถูกแตะ แต่บทเรียนมื้ออาหารยังบาง",
        en: "Hypo was treated, with thin meal counseling.",
      },
      mixed: {
        th: "อาการอาจผ่าน แต่สาเหตุเวรดึกยังอยู่",
        en: "Symptoms may pass while the night-shift cause remains.",
      },
      poor: {
        th: "การเพิ่มยาเบาหวานตอน hypo คือความผิดพลาดที่อันตราย",
        en: "Intensifying diabetes therapy during hypo is a dangerous miss.",
      },
    },
  },
  {
    id: "hf_cad",
    portrait: 3,
    name: { th: "เกรียงไกร ชัยชนะ", en: "Kriangkrai Chaichana" },
    age: 70,
    sex: "m",
    job: { th: "ทหารเกษียณ", en: "Retired soldier" },
    complaint: {
      th: "นอนราบแล้วหอบ ข้อเท้าบวม สองปีหลังกล้ามเนื้อหัวใจตาย",
      en: "Orthopnea and ankle swelling, two years after a myocardial infarction",
    },
    history: {
      th: "MI เมื่อ 2 ปี ยาไม่ครบเพราะหมดสิทธิ์ ยังสูบบุหรี่บางมวน เดินได้ 20 เมตรแล้วเหนื่อย ไม่มีเจ็บหน้าอกวันนี้",
      en: "MI two years ago, incomplete meds after coverage lapsed. Still smokes a few. Breathless at 20 metres. No chest pain today.",
    },
    vitals: { bp: "110/70", hr: 92, bmi: 24.1, spo2: 94, temp: 36.6 },
    flags: [
      { th: "orthopnea + บวม", en: "Orthopnea + edema" },
      { th: "ประวัติ MI", en: "Prior MI" },
    ],
    urgency: 3,
    difficulty: 3,
    trueDiagnoses: ["hf", "cad"],
    testResults: {
      bnp: { th: "BNP สูงชัด", en: "BNP markedly elevated" },
      ecg: { th: "Q wave เก่า inferior", en: "Old inferior Q waves" },
      cxr: { th: "cardiomegaly, mild congestion", en: "Cardiomegaly, mild congestion" },
      egfr: { th: "eGFR 62 mL/min", en: "eGFR 62 mL/min" },
      lipid: { th: "LDL 132", en: "LDL 132" },
    },
    usefulTests: ["bnp", "ecg", "cxr"],
    requiredDx: ["hf", "cad"],
    requiredGroups: [["acei", "arb"], ["bb"], ["loop"], ["statin"], ["aspirin"], ["refer_cardio"]],
    bonusTreatments: ["smoking", "salt"],
    harmfulTreatments: ["nsaid", "insulin", "glucose_oral"],
    teaching: {
      th: "หัวใจล้มเหลวจากโรคหลอดเลือด: ACEI/ARB, เบตาบล็อกเกอร์, ยาขับปัสสาวะเมื่อคั่ง, สเตตินและแอสไพรินเพราะมี CAD ส่งต่อหัวใจ เลิก NSAID",
      en: "Ischemic heart failure: ACEI/ARB, beta-blocker, loop if congested, statin and aspirin for CAD, cardiology. Stop NSAIDs.",
    },
    outcomes: {
      excellent: {
        th: "เกรียงไกรได้แกนยาหัวใจล้มเหลวและคิวหัวใจ — นี่คือเวรที่คุ้ม",
        en: "Kriangkrai leaves on HF pillars with a cardiology slot. This is a shift that mattered.",
      },
      good: {
        th: "ทิศทางถูก แต่แกนยายังไม่ครบ",
        en: "Direction is right, with GDMT still incomplete.",
      },
      mixed: {
        th: "บวมอาจลด แต่โรคต้นไม่ถูกเรียกชื่อ",
        en: "Swelling may ease while the underlying disease stays unnamed.",
      },
      poor: {
        th: "หัวใจล้มเหลวที่ไม่ถูกจัดการจะกลับมาเป็นหอบที่บ้าน",
        en: "Unmanaged heart failure will come back as breathlessness at home.",
      },
    },
  },
];

export const CASE_BY_ID: Record<string, CaseDef> = Object.fromEntries(
  CASES.map((c) => [c.id, c]),
);

export const DAY_PLANS: string[][] = [
  ["new_t2dm", "essential_htn", "dyslipidemia"],
  ["metabolic", "essential_htn", "stable_angina", "new_t2dm"],
  ["copd", "ckd_htn", "metabolic", "post_stroke"],
  ["htn_urgency", "stable_angina", "gout", "copd", "dyslipidemia"],
  ["hypoglycemia", "hf_cad", "ckd_htn", "post_stroke", "metabolic"],
  ["hf_cad", "htn_urgency", "gout", "stable_angina", "copd", "new_t2dm"],
  ["hypoglycemia", "ckd_htn", "metabolic", "post_stroke", "copd", "gout"],
  ["hf_cad", "htn_urgency", "hypoglycemia", "stable_angina", "ckd_htn", "metabolic"],
];

export const DAY_MINUTES = [34, 38, 42, 44, 46, 48, 50, 52];
