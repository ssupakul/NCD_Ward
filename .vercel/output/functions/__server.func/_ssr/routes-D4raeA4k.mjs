import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as BookOpen, i as ClipboardList, n as Play, r as Clock3, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D4raeA4k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 min-h-11 px-4 text-sm font-medium rounded-lg transition-opacity transition-transform disabled:pointer-events-none disabled:opacity-40 active:opacity-80", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-foreground",
			secondary: "bg-surface-2 text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-muted hover:text-foreground hover:bg-surface-2",
			ink: "bg-paper-foreground text-paper",
			danger: "bg-danger text-paper"
		},
		size: {
			default: "min-h-11 px-4",
			sm: "min-h-10 px-3 text-sm",
			lg: "min-h-12 px-5",
			icon: "size-11 p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var DISEASES = {
	t2dm: {
		label: {
			th: "เบาหวานชนิดที่ 2",
			en: "Type 2 diabetes"
		},
		hint: {
			th: "Metformin เป็นยา一线แรก ร่วมกับปรับอาหาร ออกกำลัง ลดน้ำหนัก สเตตินเมื่ออายุ ≥40",
			en: "Metformin first-line with diet, activity, weight. Statin if age ≥40."
		}
	},
	htn: {
		label: {
			th: "ความดันโลหิตสูง",
			en: "Hypertension"
		},
		hint: {
			th: "เริ่มยาหนึ่งชนิด (ACEI/ARB/CCB) ลดเกลือ ออกกำลัง ไม่ใช่เหตุฉุกเฉินถ้าไม่มีอวัยวะเป้าหมายเสีย",
			en: "Start one agent (ACEI/ARB/CCB), salt, activity. Not an emergency without end-organ damage."
		}
	},
	dyslipidemia: {
		label: {
			th: "ไขมันในเลือดสูง",
			en: "Dyslipidemia"
		},
		hint: {
			th: "สเตตินเมื่อ LDL สูงหรือเสี่ยงหลอดเลือดสูง แอสไพรินไม่ใช่การป้องกันปฐมภูมิทั่วไป",
			en: "Statin for high LDL or high ASCVD risk. Aspirin is not routine primary prevention."
		}
	},
	cad: {
		label: {
			th: "โรคหลอดเลือดหัวใจ",
			en: "Coronary artery disease"
		},
		hint: {
			th: "ป้องกันทุติยภูมิ: แอสไพริน สเตติน ยาต้านเจ็บหน้าอก ส่งต่ออายุรแพทย์หัวใจ เลิกบุหรี่",
			en: "Secondary prevention: aspirin, statin, antianginal, cardiology, stop smoking."
		}
	},
	copd: {
		label: {
			th: "COPD",
			en: "COPD"
		},
		hint: {
			th: "ยืนยันด้วยสไปโรมิเตอร์ LAMA/LABA และเลิกบุหรี่คือแกนหลัก",
			en: "Confirm with spirometry. LAMA/LABA plus smoking cessation are the core."
		}
	},
	obesity: {
		label: {
			th: "โรคอ้วน",
			en: "Obesity"
		},
		hint: {
			th: "เป้าหมายลดน้ำหนัก อาหาร และการเคลื่อนไหว — อย่าข้ามไปที่ยาอย่างเดียว",
			en: "Weight target, diet, and movement — do not skip to drugs alone."
		}
	},
	ckd: {
		label: {
			th: "โรคไตเรื้อรัง",
			en: "Chronic kidney disease"
		},
		hint: {
			th: "ACEI/ARB เมื่อมีอัลบูมินในปัสสาวะ เลิก NSAID ควบคุมความดัน",
			en: "ACEI/ARB if albuminuria. Stop NSAIDs. Control blood pressure."
		}
	},
	stroke_risk: {
		label: {
			th: "ป้องกันหลอดเลือดสมอง",
			en: "Stroke secondary prevention"
		},
		hint: {
			th: "หลังสมองขาดเลือด: ยาต้านเกล็ดเลือด สเตติน คุมความดัน",
			en: "After ischemic stroke: antiplatelet, statin, blood-pressure control."
		}
	},
	gout: {
		label: {
			th: "โรคเกาต์",
			en: "Gout"
		},
		hint: {
			th: "เกาต์ซ้ำ: ลดยูเรต (allopurinol) ลดแอลกอฮอล์และน้ำหนัก อย่าใช้แอสไพรินรักษาเกาต์",
			en: "Recurrent gout: urate-lowering, cut alcohol and weight. Do not treat gout with aspirin."
		}
	},
	hf: {
		label: {
			th: "หัวใจล้มเหลว",
			en: "Heart failure"
		},
		hint: {
			th: "ACEI/ARB, เบตาบล็อกเกอร์, ยาขับปัสสาวะเมื่อบวม ส่งต่อหัวใจ",
			en: "ACEI/ARB, beta-blocker, loop diuretic if congested, refer cardiology."
		}
	},
	hypoglycemia: {
		label: {
			th: "น้ำตาลในเลือดต่ำ",
			en: "Hypoglycemia"
		},
		hint: {
			th: "รักษา hypo ก่อน แล้วทบทวนมื้ออาหารและยาที่ดึงน้ำตาล อย่าเพิ่มยาเบาหวานตอนนี้",
			en: "Treat hypo first, then review meals and glucose-lowering drugs. Do not intensify diabetes meds now."
		}
	},
	htn_urgency: {
		label: {
			th: "ความดันสูงวิกฤต (urgency)",
			en: "Hypertensive urgency"
		},
		hint: {
			th: "ไม่มีอวัยวะเป้าหมายเสีย: ยาเม็ด ติดตามใกล้ชิด ไม่ต้องส่งห้องฉุกเฉิน",
			en: "No end-organ damage: oral agents and close follow-up — not the ER."
		}
	}
};
var TESTS = {
	hba1c: {
		label: {
			th: "HbA1c",
			en: "HbA1c"
		},
		minutes: 3,
		blurb: {
			th: "น้ำตาลเฉลี่ย 3 เดือน",
			en: "3-month glucose average"
		}
	},
	lipid: {
		label: {
			th: "lipid panel",
			en: "Lipid panel"
		},
		minutes: 3,
		blurb: {
			th: "LDL HDL ไตรกลีเซอไรด์",
			en: "LDL, HDL, triglycerides"
		}
	},
	egfr: {
		label: {
			th: "creatinine / eGFR",
			en: "Creatinine / eGFR"
		},
		minutes: 2,
		blurb: {
			th: "การทำงานของไต",
			en: "Kidney function"
		}
	},
	ecg: {
		label: {
			th: "ECG",
			en: "ECG"
		},
		minutes: 4,
		blurb: {
			th: "คลื่นไฟฟ้าหัวใจ",
			en: "Heart rhythm and ischemia clues"
		}
	},
	cxr: {
		label: {
			th: "chest X-ray",
			en: "Chest X-ray"
		},
		minutes: 5,
		blurb: {
			th: "ภาพรังสีทรวงอก",
			en: "Lungs and heart size"
		}
	},
	spiro: {
		label: {
			th: "spirometry",
			en: "Spirometry"
		},
		minutes: 6,
		blurb: {
			th: "สมรรถภาพปอด",
			en: "Lung function"
		}
	},
	trop: {
		label: {
			th: "troponin",
			en: "Troponin"
		},
		minutes: 8,
		blurb: {
			th: "เอนไซม์กล้ามเนื้อหัวใจ",
			en: "Cardiac injury marker"
		}
	},
	uacr: {
		label: {
			th: "urine albumin",
			en: "Urine albumin"
		},
		minutes: 3,
		blurb: {
			th: "อัลบูมินในปัสสาวะ",
			en: "Albuminuria"
		}
	},
	bnp: {
		label: {
			th: "BNP",
			en: "BNP"
		},
		minutes: 4,
		blurb: {
			th: "เปปไทด์หัวใจล้มเหลว",
			en: "Heart-failure peptide"
		}
	},
	uric: {
		label: {
			th: "uric acid",
			en: "Uric acid"
		},
		minutes: 2,
		blurb: {
			th: "กรดยูริก",
			en: "Serum urate"
		}
	}
};
var ACTIONS = {
	metformin: {
		label: {
			th: "Metformin",
			en: "Metformin"
		},
		group: "med"
	},
	sglt2: {
		label: {
			th: "SGLT2 inhibitor",
			en: "SGLT2 inhibitor"
		},
		group: "med"
	},
	insulin: {
		label: {
			th: "Insulin",
			en: "Insulin"
		},
		group: "med"
	},
	acei: {
		label: {
			th: "ACE inhibitor",
			en: "ACE inhibitor"
		},
		group: "med"
	},
	arb: {
		label: {
			th: "ARB",
			en: "ARB"
		},
		group: "med"
	},
	ccb: {
		label: {
			th: "Amlodipine (CCB)",
			en: "Amlodipine (CCB)"
		},
		group: "med"
	},
	thiazide: {
		label: {
			th: "Thiazide",
			en: "Thiazide"
		},
		group: "med"
	},
	bb: {
		label: {
			th: "Beta-blocker",
			en: "Beta-blocker"
		},
		group: "med"
	},
	statin: {
		label: {
			th: "Statin",
			en: "Statin"
		},
		group: "med"
	},
	aspirin: {
		label: {
			th: "Aspirin",
			en: "Aspirin"
		},
		group: "med"
	},
	laba_lama: {
		label: {
			th: "LAMA / LABA",
			en: "LAMA / LABA"
		},
		group: "med"
	},
	allopurinol: {
		label: {
			th: "Allopurinol",
			en: "Allopurinol"
		},
		group: "med"
	},
	loop: {
		label: {
			th: "Loop diuretic",
			en: "Loop diuretic"
		},
		group: "med"
	},
	glucose_oral: {
		label: {
			th: "น้ำตาลกิน / glucose gel",
			en: "Oral glucose"
		},
		group: "med"
	},
	nsaid: {
		label: {
			th: "NSAID",
			en: "NSAID"
		},
		group: "med"
	},
	diet: {
		label: {
			th: "ปรับอาหาร",
			en: "Diet counseling"
		},
		group: "life"
	},
	exercise: {
		label: {
			th: "ออกกำลังกาย",
			en: "Exercise counseling"
		},
		group: "life"
	},
	smoking: {
		label: {
			th: "เลิกบุหรี่",
			en: "Smoking cessation"
		},
		group: "life"
	},
	salt: {
		label: {
			th: "ลดเกลือ",
			en: "Salt reduction"
		},
		group: "life"
	},
	weight: {
		label: {
			th: "ลดน้ำหนัก",
			en: "Weight counseling"
		},
		group: "life"
	},
	alcohol: {
		label: {
			th: "ลดแอลกอฮอล์",
			en: "Alcohol counseling"
		},
		group: "life"
	},
	meals: {
		label: {
			th: "ไม่ข้ามมื้อ / จับคู่ยา",
			en: "Meal timing / med pairing"
		},
		group: "life"
	},
	refer_er: {
		label: {
			th: "ส่งห้องฉุกเฉิน",
			en: "Refer to ER"
		},
		group: "refer"
	},
	refer_cardio: {
		label: {
			th: "ส่งต่อหัวใจ",
			en: "Refer cardiology"
		},
		group: "refer"
	},
	refer_nephro: {
		label: {
			th: "ส่งต่อไต",
			en: "Refer nephrology"
		},
		group: "refer"
	}
};
var DISEASE_ORDER = [
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
	"htn_urgency"
];
var ACTION_ORDER = [
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
	"refer_nephro"
];
var TEST_ORDER = [
	"hba1c",
	"lipid",
	"egfr",
	"uacr",
	"uric",
	"ecg",
	"trop",
	"bnp",
	"cxr",
	"spiro"
];
function loc(lang, s) {
	return s[lang];
}
var CASES = [
	{
		id: "new_t2dm",
		portrait: 0,
		name: {
			th: "สมชาย บุญมี",
			en: "Somchai Boonmee"
		},
		age: 52,
		sex: "m",
		job: {
			th: "ค้าขาย",
			en: "Shopkeeper"
		},
		complaint: {
			th: "กระหายน้ำ ปัสสาวะบ่อย น้ำหนักลด 4 กก. ใน 2 เดือน",
			en: "Thirst, frequent urination, 4 kg weight loss in 2 months"
		},
		history: {
			th: "ไม่เคยตรวจสุขภาพ 5 ปี พ่อเป็นเบาหวาน ดื่มน้ำหวานทั้งวัน นั่งขายของทั้งวัน บุหรี่ไม่มี",
			en: "No checkup in 5 years. Father had diabetes. Sweet drinks all day, sits at the stall. No smoking."
		},
		vitals: {
			bp: "132/84",
			hr: 78,
			bmi: 29.4,
			spo2: 98,
			temp: 36.7,
			glucose: 186
		},
		flags: [{
			th: "น้ำตาลปลายนิ้ว 186",
			en: "Fingerstick glucose 186"
		}, {
			th: "BMI 29.4",
			en: "BMI 29.4"
		}],
		urgency: 2,
		difficulty: 1,
		trueDiagnoses: ["t2dm", "obesity"],
		testResults: {
			hba1c: {
				th: "HbA1c 8.4%",
				en: "HbA1c 8.4%"
			},
			lipid: {
				th: "LDL 142  HDL 38  TG 210",
				en: "LDL 142  HDL 38  TG 210"
			},
			egfr: {
				th: "eGFR 92 mL/min",
				en: "eGFR 92 mL/min"
			}
		},
		usefulTests: [
			"hba1c",
			"lipid",
			"egfr"
		],
		requiredDx: ["t2dm"],
		requiredGroups: [
			["metformin"],
			["diet"],
			["exercise"],
			["weight"]
		],
		bonusTreatments: ["statin"],
		harmfulTreatments: [
			"insulin",
			"aspirin",
			"refer_er",
			"glucose_oral"
		],
		teaching: {
			th: "เบาหวานใหม่ HbA1c 8.4% โดยไม่มีภาวะขาดอินซูลินรุนแรง: metformin + ปรับชีวิตเป็นแกน ไม่เริ่มอินซูลินเป็นด่านแรก สเตตินเหมาะสมในเบาหวานอายุ ≥40 แอสไพรินไม่ใช่การป้องกันปฐมภูมิทั่วไป",
			en: "New T2DM at HbA1c 8.4% without severe catabolism: metformin plus lifestyle, not insulin first. Statin is reasonable at age ≥40. Aspirin is not routine primary prevention."
		},
		outcomes: {
			excellent: {
				th: "สมชายได้แผนที่ครบ จะกลับมาวัด HbA1c ใน 3 เดือน",
				en: "Somchai leaves with a complete plan and a 3-month HbA1c follow-up."
			},
			good: {
				th: "น้ำตาลจะดีขึ้น แต่ยังมีช่องโหว่ในแผน",
				en: "Glucose should improve, though the plan has gaps."
			},
			mixed: {
				th: "เขายังสับสนว่าต้องเปลี่ยนอะไรในชีวิตประจำวัน",
				en: "He still is not sure what to change day to day."
			},
			poor: {
				th: "เบาหวานไม่ถูกจัดการ เสี่ยงภาวะแทรกซ้อนในไม่ช้า",
				en: "Diabetes is unmanaged. Complications will not wait."
			}
		}
	},
	{
		id: "essential_htn",
		portrait: 1,
		name: {
			th: "ลำดวน ศรีสุข",
			en: "Lamduan Srisuk"
		},
		age: 68,
		sex: "f",
		job: {
			th: "เกษียณ",
			en: "Retired"
		},
		complaint: {
			th: "ปวดหัวตุบ ๆ ตอนเช้า วัดความดันที่บ้านได้ 170",
			en: "Throbbing morning headaches. Home BP readings around 170"
		},
		history: {
			th: "กินอาหารเค็ม ลูกทำกับข้าวให้ เดินในซอยได้ บุหรี่ไม่มี ไม่มีเจ็บหน้าอก แขนขาเท่ากัน มองเห็นชัด",
			en: "Salty diet. Walks the soi fine. No smoking, no chest pain, equal limbs, vision unchanged."
		},
		vitals: {
			bp: "168/96",
			hr: 72,
			bmi: 23.1,
			spo2: 98,
			temp: 36.6
		},
		flags: [{
			th: "ความดันบ้าน ~170",
			en: "Home BP ~170"
		}],
		urgency: 1,
		difficulty: 1,
		trueDiagnoses: ["htn"],
		testResults: {
			egfr: {
				th: "eGFR 78 mL/min",
				en: "eGFR 78 mL/min"
			},
			lipid: {
				th: "LDL 118  HDL 52  TG 140",
				en: "LDL 118  HDL 52  TG 140"
			},
			hba1c: {
				th: "HbA1c 5.6%",
				en: "HbA1c 5.6%"
			},
			ecg: {
				th: "sinus, LVH เล็กน้อย",
				en: "Sinus, mild LVH"
			}
		},
		usefulTests: ["egfr", "ecg"],
		requiredDx: ["htn"],
		requiredGroups: [[
			"acei",
			"arb",
			"ccb"
		], ["salt"]],
		bonusTreatments: ["exercise"],
		harmfulTreatments: [
			"refer_er",
			"insulin",
			"aspirin",
			"metformin",
			"glucose_oral"
		],
		teaching: {
			th: "ความดัน 168/96 โดยไม่มีอาการอวัยวะเป้าหมายเสีย คือความดันโลหิตสูงที่คลินิก เริ่มยาหนึ่งชนิดและลดเกลือ ไม่ใช่เหตุส่งห้องฉุกเฉิน",
			en: "BP 168/96 without end-organ symptoms is clinic hypertension. Start one agent and cut salt. This is not an ER transfer."
		},
		outcomes: {
			excellent: {
				th: "ลำดวนได้ยาและความเข้าใจเรื่องเกลือ จะวัดความดันที่บ้าน",
				en: "Lamduan leaves with a pill and a salt plan, and will log home BP."
			},
			good: {
				th: "ความดันจะถูกแตะต้อง แต่คำแนะนำยังไม่ครบ",
				en: "BP will be addressed, though counseling is thin."
			},
			mixed: {
				th: "เธอยังไม่แน่ใจว่าปวดหัวเรื่องความดันหรือไม่",
				en: "She still is not sure the headaches are about blood pressure."
			},
			poor: {
				th: "ความดันสูงเดินต่อไป เสี่ยงหลอดเลือดสมอง",
				en: "Hypertension continues. Stroke risk stays high."
			}
		}
	},
	{
		id: "dyslipidemia",
		portrait: 2,
		name: {
			th: "พิชญา วงศ์ไพบูลย์",
			en: "Pitchaya Wongpaiboon"
		},
		age: 34,
		sex: "f",
		job: {
			th: "บัญชี",
			en: "Accountant"
		},
		complaint: {
			th: "มาตรวจสุขภาพบริษัท ผลเลือดไขมันสูง",
			en: "Company checkup flagged high cholesterol"
		},
		history: {
			th: "พ่อกล้ามเนื้อหัวใจตายอายุ 50 ตัวเองไม่สูบบุหรี่ ออกกำลังน้อย นั่งหน้าจอทั้งวัน ประจำเดือนปกติ ไม่ได้ตั้งครรภ์",
			en: "Father had an MI at 50. She does not smoke, sits at a screen all day, cycles normally, not pregnant."
		},
		vitals: {
			bp: "118/76",
			hr: 68,
			bmi: 22.4,
			spo2: 99,
			temp: 36.5
		},
		flags: [{
			th: "ประวัติครอบครัว CAD เร็ว",
			en: "Premature family CAD"
		}],
		urgency: 1,
		difficulty: 1,
		trueDiagnoses: ["dyslipidemia"],
		testResults: {
			lipid: {
				th: "LDL 178  HDL 42  TG 160",
				en: "LDL 178  HDL 42  TG 160"
			},
			hba1c: {
				th: "HbA1c 5.4%",
				en: "HbA1c 5.4%"
			},
			egfr: {
				th: "eGFR 104 mL/min",
				en: "eGFR 104 mL/min"
			}
		},
		usefulTests: ["lipid"],
		requiredDx: ["dyslipidemia"],
		requiredGroups: [["statin"], ["diet"]],
		bonusTreatments: ["exercise"],
		harmfulTreatments: [
			"aspirin",
			"metformin",
			"insulin",
			"refer_er",
			"glucose_oral"
		],
		teaching: {
			th: "LDL 178 กับประวัติครอบครัวโรคหัวใจเร็ว: สเตตินและอาหารคือคำตอบ แอสไพรินไม่ได้ให้เป็นค่าเริ่มต้นสำหรับการป้องกันปฐมภูมิ",
			en: "LDL 178 plus premature family CAD: statin and diet. Aspirin is not default primary prevention."
		},
		outcomes: {
			excellent: {
				th: "พิชญาเข้าใจว่าไขมันสูงเป็นโรคที่รักษาได้ แม้ยังไม่เจ็บ",
				en: "Pitchaya understands high LDL is a treatable disease, even without pain."
			},
			good: {
				th: "ได้สเตติน แต่ยังขาดภาพรวมการป้องกัน",
				en: "She has a statin, but prevention counseling is incomplete."
			},
			mixed: {
				th: "เธออาจไม่กินยาเพราะยังรู้สึกสบายดี",
				en: "She may not take the medicine because she feels well."
			},
			poor: {
				th: "LDL สูงเดินต่อไปบนพื้นประวัติครอบครัวที่เสี่ยง",
				en: "High LDL continues on a high-risk family background."
			}
		}
	},
	{
		id: "metabolic",
		portrait: 4,
		name: {
			th: "นภา เจริญผล",
			en: "Napa Charoenphon"
		},
		age: 48,
		sex: "f",
		job: {
			th: "ขายอาหาร",
			en: "Food vendor"
		},
		complaint: {
			th: "เหนื่อยง่าย ชาปลายเท้า มีดเป็นแผลหายช้า",
			en: "Easy fatigue, tingling toes, a slow-healing knife cut"
		},
		history: {
			th: "ชิมอาหารเค็มทั้งวัน นั่งขายของ น้ำอัดลมทุกมื้อ ไม่เคยตรวจน้ำตาล ความดันที่ร้านได้ 150 ขึ้น",
			en: "Tastes salty food all day, sits at the stall, soda with every meal. Never checked sugar. Shop BP often above 150."
		},
		vitals: {
			bp: "154/94",
			hr: 82,
			bmi: 32.1,
			spo2: 97,
			temp: 36.8,
			glucose: 162
		},
		flags: [{
			th: "น้ำตาลปลายนิ้ว 162",
			en: "Fingerstick 162"
		}, {
			th: "BMI 32.1",
			en: "BMI 32.1"
		}],
		urgency: 2,
		difficulty: 2,
		trueDiagnoses: [
			"t2dm",
			"htn",
			"obesity",
			"dyslipidemia"
		],
		testResults: {
			hba1c: {
				th: "HbA1c 7.6%",
				en: "HbA1c 7.6%"
			},
			lipid: {
				th: "LDL 138  HDL 36  TG 220",
				en: "LDL 138  HDL 36  TG 220"
			},
			egfr: {
				th: "eGFR 88 mL/min",
				en: "eGFR 88 mL/min"
			},
			uacr: {
				th: "UACR 28 mg/g",
				en: "UACR 28 mg/g"
			}
		},
		usefulTests: [
			"hba1c",
			"lipid",
			"egfr"
		],
		requiredDx: [
			"t2dm",
			"htn",
			"obesity"
		],
		requiredGroups: [
			["metformin"],
			["acei", "arb"],
			["statin"],
			["diet"],
			["weight"]
		],
		bonusTreatments: [
			"exercise",
			"salt",
			"sglt2"
		],
		harmfulTreatments: [
			"insulin",
			"refer_er",
			"aspirin",
			"nsaid",
			"glucose_oral"
		],
		teaching: {
			th: "กลุ่มเมตาบอลิกต้องรักษาพร้อมกัน: น้ำตาล ความดัน ไขมัน น้ำหนัก ACEI/ARB เหมาะเมื่อมีเบาหวาน สเตตินในเบาหวานอายุ ≥40 อย่าให้แอสไพรินป้องกันปฐมภูมิเป็นค่าเริ่ม",
			en: "Metabolic cluster: treat glucose, BP, lipids, and weight together. ACEI/ARB fits diabetes. Statin at age ≥40. Do not default to aspirin for primary prevention."
		},
		outcomes: {
			excellent: {
				th: "นภาได้แผนครบสี่เสา จะปรับร้านและยาไปด้วยกัน",
				en: "Napa leaves with all four pillars covered — stall habits and medicines together."
			},
			good: {
				th: "โรคหลักถูกแตะ แต่ยังมีเสาที่ขาด",
				en: "The main diseases are touched, with pillars still missing."
			},
			mixed: {
				th: "เธอยังคิดว่าเหนื่อยเพราะงานหนักอย่างเดียว",
				en: "She still thinks fatigue is only the job."
			},
			poor: {
				th: "เมตาบอลิกซินโดรมเดินต่อ แผลที่มือคือคำใบ้ที่ถูกมองข้าม",
				en: "The metabolic syndrome continues. The slow wound was a warning."
			}
		}
	},
	{
		id: "stable_angina",
		portrait: 5,
		name: {
			th: "ประยุทธ แก้วมณี",
			en: "Prayut Kaewmanee"
		},
		age: 58,
		sex: "m",
		job: {
			th: "ก่อสร้าง",
			en: "Construction"
		},
		complaint: {
			th: "แน่นหน้าอกเวลาปีนนั่งร้าน หายเมื่อพัก 3–4 นาที",
			en: "Chest tightness climbing scaffolding, eases after 3–4 minutes of rest"
		},
		history: {
			th: "สูบบุหรี่ 20 ซอง-ปี ยังไม่เลิก ไม่มีเหงื่อท่วมหรือเจ็บตอนพัก ได้กลิ่นควันเชื่อมทั้งวัน",
			en: "20 pack-year smoker, still smoking. No rest pain, no drenching sweat. Weld smoke all day."
		},
		vitals: {
			bp: "148/90",
			hr: 84,
			bmi: 27.2,
			spo2: 97,
			temp: 36.6
		},
		flags: [{
			th: "เจ็บตามแรงงาน หายเมื่อพัก",
			en: "Exertional pain, rest-relieved"
		}, {
			th: "สูบบุหรี่",
			en: "Smoker"
		}],
		urgency: 3,
		difficulty: 2,
		trueDiagnoses: ["cad", "htn"],
		testResults: {
			ecg: {
				th: "T inversion inferolateral สงสัย ischemia",
				en: "Inferolateral T inversion, possible ischemia"
			},
			trop: {
				th: "troponin ลบ",
				en: "Troponin negative"
			},
			lipid: {
				th: "LDL 154  HDL 34  TG 180",
				en: "LDL 154  HDL 34  TG 180"
			},
			hba1c: {
				th: "HbA1c 5.8%",
				en: "HbA1c 5.8%"
			}
		},
		usefulTests: [
			"ecg",
			"trop",
			"lipid"
		],
		requiredDx: ["cad"],
		requiredGroups: [
			["statin"],
			["aspirin"],
			["refer_cardio"],
			["smoking"]
		],
		bonusTreatments: [
			"bb",
			"acei",
			"exercise"
		],
		harmfulTreatments: [
			"refer_er",
			"nsaid",
			"insulin",
			"glucose_oral"
		],
		teaching: {
			th: "เจ็บหน้าอกตามแรงงาน หายเมื่อพัก คือ angina คงที่: แอสไพริน สเตติน ส่งต่อหัวใจ เลิกบุหรี่ ไม่ใช่ ACS ที่ต้องห้องฉุกเฉินถ้าเจ็บไม่เกิดตอนพักและ troponin ลบ",
			en: "Exertional, rest-relieved pain is stable angina: aspirin, statin, cardiology, stop smoking. Not an ER ACS if pain is not at rest and troponin is negative."
		},
		outcomes: {
			excellent: {
				th: "ประยุทธได้ยาป้องกันทุติยภูมิและคิวหัวใจ บุหรี่ถูกพูดถึงอย่างจริง",
				en: "Prayut leaves on secondary prevention with a cardiology slot. Smoking was named."
			},
			good: {
				th: "ทิศทางถูก แต่แผนยังไม่ครบแกนป้องกัน",
				en: "Direction is right, but prevention is incomplete."
			},
			mixed: {
				th: "เขาอาจกลับไปปีนนั่งร้านโดยไม่มีแผนเจ็บหน้าอก",
				en: "He may climb scaffolding again with no angina plan."
			},
			poor: {
				th: "โรคหลอดเลือดหัวใจถูกมองข้าม — นี่คือเคสที่พลาดแล้วแพง",
				en: "CAD was missed. This is an expensive miss."
			}
		}
	},
	{
		id: "copd",
		portrait: 5,
		name: {
			th: "อนุชา พิทักษ์",
			en: "Anucha Phithak"
		},
		age: 63,
		sex: "m",
		job: {
			th: "ทำนา",
			en: "Farmer"
		},
		complaint: {
			th: "ไอเรื้อรัง เหนื่อยตอนเดินคันนา เสมหะทุกเช้า",
			en: "Chronic cough, breathless on the paddy path, morning sputum"
		},
		history: {
			th: "สูบบุหรี่ 35 ซอง-ปี ยังไม่เลิก ไม่มีไข้ ไม่มีเลือดในเสมหะ เคยได้ยาปฏิชีวนะซ้ำโดยไม่ดีขึ้น",
			en: "35 pack-year smoker, still smoking. No fever, no hemoptysis. Repeated antibiotics have not helped."
		},
		vitals: {
			bp: "130/80",
			hr: 88,
			bmi: 21,
			spo2: 93,
			temp: 36.7
		},
		flags: [{
			th: "SpO2 93%",
			en: "SpO2 93%"
		}, {
			th: "สูบบุหรี่",
			en: "Smoker"
		}],
		urgency: 2,
		difficulty: 2,
		trueDiagnoses: ["copd"],
		testResults: {
			spiro: {
				th: "FEV1/FVC 0.62  FEV1 58%",
				en: "FEV1/FVC 0.62  FEV1 58%"
			},
			cxr: {
				th: "hyperinflation ไม่มีปอดอักเสบ",
				en: "Hyperinflation, no pneumonia"
			},
			ecg: {
				th: "sinus tachycardia เล็กน้อย",
				en: "Mild sinus tachycardia"
			}
		},
		usefulTests: ["spiro", "cxr"],
		requiredDx: ["copd"],
		requiredGroups: [["laba_lama"], ["smoking"]],
		bonusTreatments: ["exercise"],
		harmfulTreatments: [
			"insulin",
			"aspirin",
			"refer_er",
			"metformin",
			"glucose_oral"
		],
		teaching: {
			th: "COPD ยืนยันด้วยสไปโรมิเตอร์ ไม่ใช่ด้วยการให้ยาปฏิชีวนะซ้ำ LAMA/LABA และเลิกบุหรี่คือแกน ออกกำลังช่วยสมรรถภาพ",
			en: "COPD is confirmed with spirometry, not repeat antibiotics. LAMA/LABA and smoking cessation are the core."
		},
		outcomes: {
			excellent: {
				th: "อนุชาได้ยาขยายหลอดลมและเหตุผลที่ต้องเลิกบุหรี่วันนี้",
				en: "Anucha leaves with a bronchodilator and a reason to quit today."
			},
			good: {
				th: "ทิศทางปอดถูก แต่ยังขาดชิ้นสำคัญ",
				en: "Lung direction is right, with a key piece missing."
			},
			mixed: {
				th: "เขายังคิดว่าไอเพราะฝุ่นนาอย่างเดียว",
				en: "He still blames only paddy dust."
			},
			poor: {
				th: "COPD ไม่ถูกเรียกชื่อ บุหรี่เดินต่อ",
				en: "COPD unnamed. The cigarettes continue."
			}
		}
	},
	{
		id: "ckd_htn",
		portrait: 3,
		name: {
			th: "วิเชียร ทองคำ",
			en: "Wichian Thongkham"
		},
		age: 74,
		sex: "m",
		job: {
			th: "ครูเกษียณ",
			en: "Retired teacher"
		},
		complaint: {
			th: "ข้อเท้าบวม กินยาแก้ปวดเข่าทุกวัน ความดันขึ้น ๆ ลง ๆ",
			en: "Ankle swelling, daily knee-pain pills, swinging blood pressure"
		},
		history: {
			th: "ความดันสูง 12 ปี กินยาไม่สม่ำเสมอ ใช้ NSAID แก้ข้อเข่าเสื่อม ไม่มีหอบตอนนอนราบ",
			en: "Hypertension for 12 years, irregular pills. Daily NSAIDs for osteoarthritis. No orthopnea."
		},
		vitals: {
			bp: "162/88",
			hr: 70,
			bmi: 26.4,
			spo2: 97,
			temp: 36.6
		},
		flags: [{
			th: "NSAID รายวัน",
			en: "Daily NSAIDs"
		}, {
			th: "บวมข้อเท้า",
			en: "Ankle edema"
		}],
		urgency: 2,
		difficulty: 2,
		trueDiagnoses: ["ckd", "htn"],
		testResults: {
			egfr: {
				th: "eGFR 48 mL/min",
				en: "eGFR 48 mL/min"
			},
			uacr: {
				th: "UACR 120 mg/g",
				en: "UACR 120 mg/g"
			},
			hba1c: {
				th: "HbA1c 5.7%",
				en: "HbA1c 5.7%"
			},
			bnp: {
				th: "BNP ปกติ",
				en: "BNP normal"
			}
		},
		usefulTests: [
			"egfr",
			"uacr",
			"bnp"
		],
		requiredDx: ["ckd", "htn"],
		requiredGroups: [["acei", "arb"], ["salt"]],
		bonusTreatments: ["statin", "refer_nephro"],
		harmfulTreatments: [
			"nsaid",
			"refer_er",
			"insulin",
			"metformin",
			"glucose_oral"
		],
		teaching: {
			th: "eGFR 48 กับอัลบูมินในปัสสาวะคือ CKD ที่คลินิก ACEI/ARB คือยาความดันที่ปกป้องไต เลิก NSAID การส่งต่อไตยังไม่บังคับที่ระยะนี้ถ้าแผนครบ",
			en: "eGFR 48 with albuminuria is clinic CKD. ACEI/ARB is kidney-protective BP therapy. Stop NSAIDs. Nephrology is optional at this stage if the plan is complete."
		},
		outcomes: {
			excellent: {
				th: "วิเชียรเลิก NSAID ได้ยาปกป้องไต และเข้าใจเรื่องเกลือ",
				en: "Wichian stops NSAIDs, starts kidney-protective therapy, and understands salt."
			},
			good: {
				th: "ไตถูกพูดถึง แต่ยังมียาที่ทำร้ายหรือแผนไม่ครบ",
				en: "The kidney was named, with remaining holes in the plan."
			},
			mixed: {
				th: "เขายังอาจกลับไปซื้อยาแก้ปวดเข่าเอง",
				en: "He may still buy knee-pain pills himself."
			},
			poor: {
				th: "CKD ถูกมองเป็นแค่บวม ความดันและ NSAID เดินต่อ",
				en: "CKD was treated as swelling. BP and NSAIDs continue."
			}
		}
	},
	{
		id: "post_stroke",
		portrait: 6,
		name: {
			th: "สุภาพ รัตนชัย",
			en: "Suphap Rattanachai"
		},
		age: 61,
		sex: "f",
		job: {
			th: "แม่บ้าน",
			en: "Homemaker"
		},
		complaint: {
			th: "มาตามนัดหลังอัมพาตเล็กเมื่อ 8 เดือน ยังไม่ได้กินยาอะไรเป็นประจำ",
			en: "Follow-up 8 months after a small ischemic stroke. Not on regular medicines"
		},
		history: {
			th: "แขนขวาอ่อนแรงชั่วคราว รักษาที่อำเภอแล้วกลับบ้าน ไม่มี AF ที่รู้ ไม่สูบบุหรี่ อาหารเค็ม",
			en: "Transient right-arm weakness, treated at the district hospital, then home. No known AF. No smoking. Salty diet."
		},
		vitals: {
			bp: "152/90",
			hr: 76,
			bmi: 25.2,
			spo2: 98,
			temp: 36.6
		},
		flags: [{
			th: "stroke 8 เดือน ยังไม่มียาป้องกัน",
			en: "Stroke 8 months ago, no prevention"
		}],
		urgency: 2,
		difficulty: 2,
		trueDiagnoses: [
			"stroke_risk",
			"htn",
			"dyslipidemia"
		],
		testResults: {
			lipid: {
				th: "LDL 148  HDL 46  TG 150",
				en: "LDL 148  HDL 46  TG 150"
			},
			egfr: {
				th: "eGFR 71 mL/min",
				en: "eGFR 71 mL/min"
			},
			ecg: {
				th: "sinus ไม่มี AF",
				en: "Sinus, no AF"
			},
			hba1c: {
				th: "HbA1c 5.9%",
				en: "HbA1c 5.9%"
			}
		},
		usefulTests: ["lipid", "ecg"],
		requiredDx: ["stroke_risk"],
		requiredGroups: [
			["aspirin"],
			["statin"],
			[
				"acei",
				"arb",
				"ccb"
			],
			["salt"]
		],
		bonusTreatments: ["exercise", "diet"],
		harmfulTreatments: [
			"refer_er",
			"insulin",
			"nsaid",
			"glucose_oral"
		],
		teaching: {
			th: "หลังสมองขาดเลือด การป้องกันทุติยภูมิคือแอสไพริน สเตติน คุมความดัน — ไม่ใช่การรอให้อาการกลับมา",
			en: "After ischemic stroke, secondary prevention is aspirin, statin, and BP control — not waiting for the next event."
		},
		outcomes: {
			excellent: {
				th: "สุภาพได้ชุดป้องกันทุติยภูมิครบ ครั้งหน้าจะไม่ใช่ ‘รอให้อัมพาตกลับ’",
				en: "Suphap leaves on a full secondary-prevention set."
			},
			good: {
				th: "ทิศทางถูก แต่ยังขาดชิ้นป้องกัน",
				en: "Direction is right, with prevention still incomplete."
			},
			mixed: {
				th: "เธอยังคิดว่าโรคจบแล้วตั้งแต่กลับบ้าน",
				en: "She still thinks the illness ended when she went home."
			},
			poor: {
				th: "ความเสี่ยงหลอดเลือดสมองซ้ำยังสูงเท่าเดิม",
				en: "Recurrent stroke risk is unchanged."
			}
		}
	},
	{
		id: "gout",
		portrait: 7,
		name: {
			th: "ธนกร อารีรักษ์",
			en: "Thanakorn Areerak"
		},
		age: 41,
		sex: "m",
		job: {
			th: "คนขับ",
			en: "Driver"
		},
		complaint: {
			th: "นิ้วโป้งเท้าขวาเคยบวมแดงมา 3 ครั้งปีนี้ ครั้งล่าสุดหายไป 2 สัปดาห์",
			en: "Right big toe swollen and red three times this year. Last flare settled 2 weeks ago"
		},
		history: {
			th: "ดื่มเบียร์เย็นหลังวิ่งงาน BMI สูง กินเครื่องใน นั่งขับ 10 ชั่วโมง ไม่มีนิ่วไต",
			en: "Cold beer after shifts, high BMI, organ meat, 10-hour drives. No kidney stones."
		},
		vitals: {
			bp: "138/86",
			hr: 80,
			bmi: 31.2,
			spo2: 98,
			temp: 36.7,
			glucose: 118
		},
		flags: [{
			th: "เกาต์ซ้ำ 3 ครั้ง/ปี",
			en: "Gout ×3 this year"
		}, {
			th: "BMI 31.2",
			en: "BMI 31.2"
		}],
		urgency: 1,
		difficulty: 2,
		trueDiagnoses: ["gout", "obesity"],
		testResults: {
			uric: {
				th: "uric acid 9.2 mg/dL",
				en: "Uric acid 9.2 mg/dL"
			},
			egfr: {
				th: "eGFR 96 mL/min",
				en: "eGFR 96 mL/min"
			},
			hba1c: {
				th: "HbA1c 5.8%",
				en: "HbA1c 5.8%"
			},
			lipid: {
				th: "LDL 128  TG 240",
				en: "LDL 128  TG 240"
			}
		},
		usefulTests: ["uric", "egfr"],
		requiredDx: ["gout"],
		requiredGroups: [
			["allopurinol"],
			["alcohol"],
			["weight"]
		],
		bonusTreatments: ["diet"],
		harmfulTreatments: [
			"aspirin",
			"refer_er",
			"insulin",
			"glucose_oral"
		],
		teaching: {
			th: "เกาต์ซ้ำเมื่ออาการสงบแล้ว: เริ่มยาลดยูเรต ลดเบียร์และน้ำหนัก แอสไพรินไม่ใช่ยาเกาต์ และอาจทำยูเรตแย่ลง",
			en: "Recurrent gout, flare settled: start urate-lowering, cut beer and weight. Aspirin is not a gout drug and can worsen urate."
		},
		outcomes: {
			excellent: {
				th: "ธนกรได้แผนลดยูเรตและเบียร์ จะไม่รอให้โป้งเท้าบวมรอบสี่",
				en: "Thanakorn leaves with a urate plan and a beer plan."
			},
			good: {
				th: "ทิศทางถูก แต่ชีวิตประจำวันยังไม่ถูกแตะพอ",
				en: "Direction is right, with lifestyle still thin."
			},
			mixed: {
				th: "เขาคิดว่าเกาต์คือเรื่องข้อเท้า ไม่ใช่เรื่องเมตาบอลิก",
				en: "He still thinks gout is only a toe problem."
			},
			poor: {
				th: "รอบสี่กำลังมา และแอสไพรินจะไม่ช่วย",
				en: "A fourth flare is coming, and aspirin will not help."
			}
		}
	},
	{
		id: "htn_urgency",
		portrait: 2,
		name: {
			th: "ศิริพร แสงทอง",
			en: "Siriporn Saengthong"
		},
		age: 45,
		sex: "f",
		job: {
			th: "ครู",
			en: "Teacher"
		},
		complaint: {
			th: "ปวดหัวมาก ความดันที่ห้องพยาบาลโรงเรียน 198/118",
			en: "Severe headache. School-nurse BP 198/118"
		},
		history: {
			th: "ขาดยาความดัน 10 วัน เพราะยาหมด ไม่มีเจ็บหน้าอก ไม่มีอ่อนแรง ไม่ตามัว ไม่หอบ มองเห็นปกติ เดินได้เอง",
			en: "Ran out of BP meds 10 days ago. No chest pain, no weakness, no visual loss, no breathlessness. Walked in."
		},
		vitals: {
			bp: "198/118",
			hr: 90,
			bmi: 24.8,
			spo2: 98,
			temp: 36.6
		},
		flags: [{
			th: "ขาดยา 10 วัน",
			en: "Off meds 10 days"
		}, {
			th: "ไม่มี deficit",
			en: "No deficit"
		}],
		urgency: 3,
		difficulty: 3,
		trueDiagnoses: ["htn_urgency", "htn"],
		testResults: {
			ecg: {
				th: "sinus, ไม่มี ST elevation",
				en: "Sinus, no ST elevation"
			},
			egfr: {
				th: "eGFR 84 mL/min (baseline)",
				en: "eGFR 84 (baseline)"
			},
			trop: {
				th: "troponin ลบ",
				en: "Troponin negative"
			}
		},
		usefulTests: ["ecg", "egfr"],
		requiredDx: ["htn_urgency"],
		requiredGroups: [[
			"acei",
			"arb",
			"ccb"
		]],
		bonusTreatments: ["salt"],
		harmfulTreatments: [
			"refer_er",
			"insulin",
			"nsaid",
			"glucose_oral"
		],
		teaching: {
			th: "ความดันสูงมากโดยไม่มีอวัยวะเป้าหมายเสียคือ hypertensive urgency: เริ่มยาเม็ด ติดตามใกล้ชิด ไม่ใช่ hypertensive emergency ที่ต้องห้องฉุกเฉิน",
			en: "Very high BP without end-organ damage is hypertensive urgency: restart oral therapy and observe. It is not an ER emergency."
		},
		outcomes: {
			excellent: {
				th: "ศิริพรได้ยากลับ และรู้ว่าเลขบนเครื่องวัดไม่ได้แปลว่าต้อง ICU เสมอ",
				en: "Siriporn restarts therapy and learns that a scary number is not always an ICU."
			},
			good: {
				th: "ยาถูกเริ่ม แต่การแยก urgency/emergency ยังไม่คม",
				en: "Meds restarted, with a blurry urgency/emergency line."
			},
			mixed: {
				th: "เธออาจถูกส่งต่อเกินเหตุ หรือกลับบ้านโดยไม่มียา",
				en: "She may be over-referred, or sent home with no medicine."
			},
			poor: {
				th: "ห้องฉุกเฉินเต็มไปด้วยเคสที่ไม่ฉุกเฉิน — หรือความดันไม่ถูกแตะเลย",
				en: "Either the ER is used for a non-emergency, or the BP is not touched."
			}
		}
	},
	{
		id: "hypoglycemia",
		portrait: 4,
		name: {
			th: "มานี สุขสวัสดิ์",
			en: "Manee Suksawat"
		},
		age: 55,
		sex: "f",
		job: {
			th: "พยาบาล",
			en: "Nurse"
		},
		complaint: {
			th: "เหงื่อแตก มือสั่น งุนงง หลังเวรดึก ข้ามมื้อเช้า",
			en: "Sweating, tremor, foggy after a night shift, skipped breakfast"
		},
		history: {
			th: "เบาหวาน 8 ปี กิน metformin + glipizide ยังไม่ขาดยา ข้ามมื้อบ่อยตอนเวร ไม่มีเจ็บหน้าอก",
			en: "T2DM for 8 years on metformin plus glipizide. Skips meals on shift. No chest pain."
		},
		vitals: {
			bp: "118/74",
			hr: 96,
			bmi: 26,
			spo2: 98,
			temp: 36.5,
			glucose: 52
		},
		flags: [{
			th: "น้ำตาลปลายนิ้ว 52",
			en: "Fingerstick 52"
		}, {
			th: "ข้ามมื้อ + sulfonylurea",
			en: "Skipped meal + sulfonylurea"
		}],
		urgency: 3,
		difficulty: 3,
		trueDiagnoses: ["hypoglycemia", "t2dm"],
		testResults: {
			hba1c: {
				th: "HbA1c 6.6%",
				en: "HbA1c 6.6%"
			},
			egfr: {
				th: "eGFR 90 mL/min",
				en: "eGFR 90 mL/min"
			},
			ecg: {
				th: "sinus tachycardia",
				en: "Sinus tachycardia"
			}
		},
		usefulTests: ["hba1c"],
		requiredDx: ["hypoglycemia"],
		requiredGroups: [["glucose_oral"], ["meals"]],
		bonusTreatments: ["diet"],
		harmfulTreatments: [
			"insulin",
			"refer_er",
			"sglt2",
			"nsaid"
		],
		teaching: {
			th: "น้ำตาล 52 กับอาการ: ให้กลูโคสก่อน แล้วทบทวนมื้ออาหารกับ sulfonylurea อย่าเพิ่มยาลดน้ำตาลและไม่ต้องห้องฉุกเฉินถ้ากินได้และอาการดีขึ้น",
			en: "Glucose 52 with symptoms: give glucose first, then review meals and sulfonylurea. Do not intensify glucose-lowering. ER is unnecessary if she can swallow and improves."
		},
		outcomes: {
			excellent: {
				th: "มานีตื่นชัด น้ำตาลขึ้น และจะไม่ฉีดหรือเพิ่มยาในจังหวะนี้",
				en: "Manee clears, glucose rises, and nobody stacked more diabetes drugs."
			},
			good: {
				th: "Hypo ถูกแตะ แต่บทเรียนมื้ออาหารยังบาง",
				en: "Hypo was treated, with thin meal counseling."
			},
			mixed: {
				th: "อาการอาจผ่าน แต่สาเหตุเวรดึกยังอยู่",
				en: "Symptoms may pass while the night-shift cause remains."
			},
			poor: {
				th: "การเพิ่มยาเบาหวานตอน hypo คือความผิดพลาดที่อันตราย",
				en: "Intensifying diabetes therapy during hypo is a dangerous miss."
			}
		}
	},
	{
		id: "hf_cad",
		portrait: 3,
		name: {
			th: "เกรียงไกร ชัยชนะ",
			en: "Kriangkrai Chaichana"
		},
		age: 70,
		sex: "m",
		job: {
			th: "ทหารเกษียณ",
			en: "Retired soldier"
		},
		complaint: {
			th: "นอนราบแล้วหอบ ข้อเท้าบวม สองปีหลังกล้ามเนื้อหัวใจตาย",
			en: "Orthopnea and ankle swelling, two years after a myocardial infarction"
		},
		history: {
			th: "MI เมื่อ 2 ปี ยาไม่ครบเพราะหมดสิทธิ์ ยังสูบบุหรี่บางมวน เดินได้ 20 เมตรแล้วเหนื่อย ไม่มีเจ็บหน้าอกวันนี้",
			en: "MI two years ago, incomplete meds after coverage lapsed. Still smokes a few. Breathless at 20 metres. No chest pain today."
		},
		vitals: {
			bp: "110/70",
			hr: 92,
			bmi: 24.1,
			spo2: 94,
			temp: 36.6
		},
		flags: [{
			th: "orthopnea + บวม",
			en: "Orthopnea + edema"
		}, {
			th: "ประวัติ MI",
			en: "Prior MI"
		}],
		urgency: 3,
		difficulty: 3,
		trueDiagnoses: ["hf", "cad"],
		testResults: {
			bnp: {
				th: "BNP สูงชัด",
				en: "BNP markedly elevated"
			},
			ecg: {
				th: "Q wave เก่า inferior",
				en: "Old inferior Q waves"
			},
			cxr: {
				th: "cardiomegaly, mild congestion",
				en: "Cardiomegaly, mild congestion"
			},
			egfr: {
				th: "eGFR 62 mL/min",
				en: "eGFR 62 mL/min"
			},
			lipid: {
				th: "LDL 132",
				en: "LDL 132"
			}
		},
		usefulTests: [
			"bnp",
			"ecg",
			"cxr"
		],
		requiredDx: ["hf", "cad"],
		requiredGroups: [
			["acei", "arb"],
			["bb"],
			["loop"],
			["statin"],
			["aspirin"],
			["refer_cardio"]
		],
		bonusTreatments: ["smoking", "salt"],
		harmfulTreatments: [
			"nsaid",
			"insulin",
			"glucose_oral"
		],
		teaching: {
			th: "หัวใจล้มเหลวจากโรคหลอดเลือด: ACEI/ARB, เบตาบล็อกเกอร์, ยาขับปัสสาวะเมื่อคั่ง, สเตตินและแอสไพรินเพราะมี CAD ส่งต่อหัวใจ เลิก NSAID",
			en: "Ischemic heart failure: ACEI/ARB, beta-blocker, loop if congested, statin and aspirin for CAD, cardiology. Stop NSAIDs."
		},
		outcomes: {
			excellent: {
				th: "เกรียงไกรได้แกนยาหัวใจล้มเหลวและคิวหัวใจ — นี่คือเวรที่คุ้ม",
				en: "Kriangkrai leaves on HF pillars with a cardiology slot. This is a shift that mattered."
			},
			good: {
				th: "ทิศทางถูก แต่แกนยายังไม่ครบ",
				en: "Direction is right, with GDMT still incomplete."
			},
			mixed: {
				th: "บวมอาจลด แต่โรคต้นไม่ถูกเรียกชื่อ",
				en: "Swelling may ease while the underlying disease stays unnamed."
			},
			poor: {
				th: "หัวใจล้มเหลวที่ไม่ถูกจัดการจะกลับมาเป็นหอบที่บ้าน",
				en: "Unmanaged heart failure will come back as breathlessness at home."
			}
		}
	}
];
var CASE_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c]));
var DAY_PLANS = [
	[
		"new_t2dm",
		"essential_htn",
		"dyslipidemia"
	],
	[
		"metabolic",
		"essential_htn",
		"stable_angina",
		"new_t2dm"
	],
	[
		"copd",
		"ckd_htn",
		"metabolic",
		"post_stroke"
	],
	[
		"htn_urgency",
		"stable_angina",
		"gout",
		"copd",
		"dyslipidemia"
	],
	[
		"hypoglycemia",
		"hf_cad",
		"ckd_htn",
		"post_stroke",
		"metabolic"
	],
	[
		"hf_cad",
		"htn_urgency",
		"gout",
		"stable_angina",
		"copd",
		"new_t2dm"
	],
	[
		"hypoglycemia",
		"ckd_htn",
		"metabolic",
		"post_stroke",
		"copd",
		"gout"
	],
	[
		"hf_cad",
		"htn_urgency",
		"hypoglycemia",
		"stable_angina",
		"ckd_htn",
		"metabolic"
	]
];
var DAY_MINUTES = [
	34,
	38,
	42,
	44,
	46,
	48,
	50,
	52
];
function getCase(id) {
	const c = CASE_BY_ID[id];
	if (!c) throw new Error(`Unknown case ${id}`);
	return c;
}
function minutesForDay(day) {
	if (day <= DAY_MINUTES.length) return DAY_MINUTES[day - 1] ?? 40;
	return 50;
}
function planForDay(day) {
	if (day <= DAY_PLANS.length) return [...DAY_PLANS[day - 1] ?? DAY_PLANS[0]];
	const pool = CASES.map((c) => c.id);
	const n = 5 + day % 2;
	const start = day * 3 % pool.length;
	const out = [];
	for (let i = 0; i < n; i++) out.push(pool[(start + i) % pool.length]);
	return out;
}
function makeShift(day) {
	const patients = planForDay(day).map((caseId, i) => ({
		instanceId: `${day}-${i}-${caseId}`,
		caseId,
		seen: false,
		missed: false,
		wait: i * 1.5,
		tests: [],
		diagnoses: [],
		treatments: [],
		debrief: null
	}));
	return {
		day,
		minutesLeft: minutesForDay(day),
		score: 0,
		patients,
		activeId: null,
		tab: "chart"
	};
}
function gradeOf(score) {
	if (score >= 55) return "excellent";
	if (score >= 32) return "good";
	if (score >= 12) return "mixed";
	return "poor";
}
function scoreConsult(c, tests, dx, tx) {
	const lines = [];
	let score = 0;
	for (const d of c.requiredDx) if (dx.includes(d)) {
		score += 16;
		lines.push({
			kind: "ok",
			delta: 16,
			text: {
				th: `วินิจฉัย ${DISEASES[d].label.th} ถูกต้อง`,
				en: `Correct diagnosis: ${DISEASES[d].label.en}`
			}
		});
	} else {
		score -= 14;
		lines.push({
			kind: "miss",
			delta: -14,
			text: {
				th: `พลาด ${DISEASES[d].label.th}`,
				en: `Missed ${DISEASES[d].label.en}`
			}
		});
	}
	for (const d of dx) if (!c.trueDiagnoses.includes(d) && !c.requiredDx.includes(d)) {
		score -= 8;
		lines.push({
			kind: "bad",
			delta: -8,
			text: {
				th: `วินิจฉัยเกิน: ${DISEASES[d].label.th}`,
				en: `Over-called ${DISEASES[d].label.en}`
			}
		});
	}
	for (const extra of c.trueDiagnoses) if (!c.requiredDx.includes(extra) && dx.includes(extra)) {
		score += 6;
		lines.push({
			kind: "bonus",
			delta: 6,
			text: {
				th: `จับ ${DISEASES[extra].label.th} ได้ด้วย`,
				en: `Also caught ${DISEASES[extra].label.en}`
			}
		});
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
					en: `Plan includes ${ACTIONS[hit].label.en}`
				}
			});
		} else {
			score -= 10;
			const names = group.map((a) => ACTIONS[a].label);
			lines.push({
				kind: "miss",
				delta: -10,
				text: {
					th: `ขาด ${names.map((n) => n.th).join(" / ")}`,
					en: `Missing ${names.map((n) => n.en).join(" / ")}`
				}
			});
		}
	}
	for (const a of c.bonusTreatments) if (tx.includes(a)) {
		score += 5;
		lines.push({
			kind: "bonus",
			delta: 5,
			text: {
				th: `โบนัส: ${ACTIONS[a].label.th}`,
				en: `Bonus: ${ACTIONS[a].label.en}`
			}
		});
	}
	const requiredFlat = new Set(c.requiredGroups.flat());
	const known = /* @__PURE__ */ new Set([
		...requiredFlat,
		...c.bonusTreatments,
		...c.harmfulTreatments
	]);
	for (const a of tx) if (c.harmfulTreatments.includes(a)) {
		score -= 18;
		lines.push({
			kind: "bad",
			delta: -18,
			text: {
				th: `อันตราย: ${ACTIONS[a].label.th}`,
				en: `Harmful: ${ACTIONS[a].label.en}`
			}
		});
	} else if (!known.has(a)) {
		score -= 3;
		lines.push({
			kind: "bad",
			delta: -3,
			text: {
				th: `ไม่จำเป็น: ${ACTIONS[a].label.th}`,
				en: `Unnecessary: ${ACTIONS[a].label.en}`
			}
		});
	}
	for (const t of c.usefulTests) if (tests.includes(t)) {
		score += 4;
		lines.push({
			kind: "ok",
			delta: 4,
			text: {
				th: `แล็บคุ้ม: ${TESTS[t].label.th}`,
				en: `Useful test: ${TESTS[t].label.en}`
			}
		});
	}
	for (const t of tests) if (!c.usefulTests.includes(t) && !(t in c.testResults)) {
		score -= 3;
		lines.push({
			kind: "bad",
			delta: -3,
			text: {
				th: `แล็บเกิน: ${TESTS[t].label.th}`,
				en: `Low-yield test: ${TESTS[t].label.en}`
			}
		});
	} else if (!c.usefulTests.includes(t) && t in c.testResults) {
		score -= 2;
		lines.push({
			kind: "bad",
			delta: -2,
			text: {
				th: `แล็บไม่จำเป็น: ${TESTS[t].label.th}`,
				en: `Unneeded test: ${TESTS[t].label.en}`
			}
		});
	}
	const perfect = c.requiredDx.every((d) => dx.includes(d)) && c.requiredGroups.every((g) => g.some((a) => tx.includes(a))) && !tx.some((a) => c.harmfulTreatments.includes(a));
	if (perfect) {
		score += 8;
		lines.push({
			kind: "bonus",
			delta: 8,
			text: {
				th: "เคสสมบูรณ์",
				en: "Clean case bonus"
			}
		});
	}
	const grade = gradeOf(score);
	return {
		score,
		grade,
		lines,
		teaching: c.teaching,
		outcome: c.outcomes[grade],
		perfect
	};
}
function testCost(id) {
	return TESTS[id].minutes;
}
var ctx = null;
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const C = window.AudioContext || window.webkitAudioContext;
		if (!C) return null;
		ctx = new C();
	}
	return ctx;
}
function unlockAudio() {
	const c = ac();
	if (!c) return;
	if (c.state === "suspended") c.resume();
}
function beep(freq, dur, gain = .04, type = "sine") {
	const c = ac();
	if (!c) return;
	const t = c.currentTime;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = type;
	o.frequency.setValueAtTime(freq, t);
	g.gain.setValueAtTime(gain, t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	o.connect(g);
	g.connect(c.destination);
	o.start(t);
	o.stop(t + dur);
}
function sfxClick() {
	beep(420, .05, .03, "triangle");
}
function sfxOk() {
	beep(520, .08, .04);
	setTimeout(() => beep(720, .1, .035), 70);
}
function sfxBad() {
	beep(180, .16, .05, "square");
}
function sfxStamp() {
	beep(240, .09, .04, "triangle");
	setTimeout(() => beep(360, .12, .03), 90);
}
var KEY = "ward-ncd-v1";
var defaults = {
	version: 1,
	lang: "th",
	day: 1,
	reputation: 58,
	careerScore: 0,
	patientsTreated: 0,
	perfectCases: 0,
	bestShiftScore: 0,
	careerComplete: false
};
function migrate(raw) {
	return {
		...defaults,
		...raw,
		version: 1
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return null;
		return migrate(parsed);
	} catch {
		return null;
	}
}
function writeSave(data) {
	try {
		const blob = JSON.stringify({
			...data,
			version: 1
		});
		localStorage.setItem(KEY, blob);
	} catch {}
}
function clearSave() {
	try {
		localStorage.removeItem(KEY);
	} catch {}
}
function freshSave(lang) {
	return {
		...defaults,
		lang
	};
}
var REAL_TO_CLINIC = .07;
function clampRep(n) {
	return Math.max(0, Math.min(100, n));
}
function activePatient(shift) {
	if (!shift?.activeId) return null;
	return shift.patients.find((p) => p.instanceId === shift.activeId) ?? null;
}
var useGame = create((set, get) => ({
	version: 1,
	lang: "th",
	day: 1,
	reputation: 58,
	careerScore: 0,
	patientsTreated: 0,
	perfectCases: 0,
	bestShiftScore: 0,
	careerComplete: false,
	screen: "title",
	overlay: null,
	returnScreen: null,
	hydrated: false,
	hasSave: false,
	shift: null,
	lastRepDelta: 0,
	hydrate: () => {
		const saved = loadSave();
		if (!saved) {
			set({
				hydrated: true,
				hasSave: false
			});
			return;
		}
		set({
			...saved,
			hydrated: true,
			hasSave: saved.day > 1 || saved.patientsTreated > 0 || saved.careerScore > 0
		});
	},
	persist: () => {
		const s = get();
		writeSave({
			version: 1,
			lang: s.lang,
			day: s.day,
			reputation: s.reputation,
			careerScore: s.careerScore,
			patientsTreated: s.patientsTreated,
			perfectCases: s.perfectCases,
			bestShiftScore: s.bestShiftScore,
			careerComplete: s.careerComplete
		});
	},
	setLang: (lang) => {
		set({ lang });
		get().persist();
	},
	newCareer: () => {
		unlockAudio();
		sfxClick();
		const lang = get().lang;
		clearSave();
		set({
			...freshSave(lang),
			hasSave: true,
			screen: "briefing",
			overlay: null,
			shift: null,
			lastRepDelta: 0
		});
		get().persist();
	},
	continueCareer: () => {
		unlockAudio();
		sfxClick();
		if (get().reputation <= 0) {
			set({
				screen: "gameOver",
				overlay: null
			});
			return;
		}
		set({
			screen: "briefing",
			overlay: null,
			shift: null
		});
	},
	openOverlay: (o) => {
		unlockAudio();
		sfxClick();
		const current = get().screen;
		if (o === "howTo") set({
			screen: "howTo",
			overlay: null,
			returnScreen: current
		});
		else if (o === "records") set({
			screen: "records",
			overlay: null,
			returnScreen: current
		});
		else if (o === "handbook") set({
			screen: "handbook",
			overlay: null,
			returnScreen: current
		});
	},
	closeOverlay: () => {
		set({
			screen: get().returnScreen ?? (get().shift ? "waiting" : "title"),
			returnScreen: null
		});
	},
	startShift: () => {
		unlockAudio();
		sfxClick();
		set({
			shift: makeShift(get().day),
			screen: "waiting",
			overlay: null
		});
	},
	openPatient: (id) => {
		const shift = get().shift;
		if (!shift) return;
		const p = shift.patients.find((x) => x.instanceId === id);
		if (!p || p.seen || p.missed) return;
		unlockAudio();
		sfxClick();
		const cost = Math.min(3, shift.minutesLeft);
		set({
			shift: {
				...shift,
				minutesLeft: Math.max(0, shift.minutesLeft - cost),
				activeId: id,
				tab: "chart"
			},
			screen: "consult"
		});
	},
	setTab: (tab) => {
		const shift = get().shift;
		if (!shift) return;
		set({ shift: {
			...shift,
			tab
		} });
	},
	orderTest: (id) => {
		const shift = get().shift;
		const p = activePatient(shift);
		if (!shift || !p) return;
		if (p.tests.includes(id)) return;
		const cost = testCost(id);
		if (shift.minutesLeft < cost) {
			sfxBad();
			return;
		}
		sfxClick();
		set({ shift: {
			...shift,
			minutesLeft: shift.minutesLeft - cost,
			patients: shift.patients.map((x) => x.instanceId === p.instanceId ? {
				...x,
				tests: [...x.tests, id]
			} : x)
		} });
	},
	toggleDx: (id) => {
		const shift = get().shift;
		const p = activePatient(shift);
		if (!shift || !p) return;
		sfxClick();
		const next = p.diagnoses.includes(id) ? p.diagnoses.filter((d) => d !== id) : [...p.diagnoses, id];
		set({ shift: {
			...shift,
			patients: shift.patients.map((x) => x.instanceId === p.instanceId ? {
				...x,
				diagnoses: next
			} : x)
		} });
	},
	toggleTx: (id) => {
		const shift = get().shift;
		const p = activePatient(shift);
		if (!shift || !p) return;
		sfxClick();
		const next = p.treatments.includes(id) ? p.treatments.filter((d) => d !== id) : [...p.treatments, id];
		set({ shift: {
			...shift,
			patients: shift.patients.map((x) => x.instanceId === p.instanceId ? {
				...x,
				treatments: next
			} : x)
		} });
	},
	signOff: () => {
		const shift = get().shift;
		const p = activePatient(shift);
		if (!shift || !p) return;
		if (p.diagnoses.length === 0) {
			sfxBad();
			return;
		}
		const debrief = scoreConsult(getCase(p.caseId), p.tests, p.diagnoses, p.treatments);
		if (debrief.grade === "excellent" || debrief.grade === "good") sfxOk();
		else sfxStamp();
		const patients = shift.patients.map((x) => x.instanceId === p.instanceId ? {
			...x,
			seen: true,
			debrief
		} : x);
		set({
			shift: {
				...shift,
				score: shift.score + debrief.score,
				patients,
				activeId: p.instanceId
			},
			screen: "debrief",
			patientsTreated: get().patientsTreated + 1,
			perfectCases: get().perfectCases + (debrief.perfect ? 1 : 0)
		});
	},
	afterDebrief: () => {
		const shift = get().shift;
		if (!shift) return;
		if (shift.patients.filter((p) => !p.seen && !p.missed).length === 0 || shift.minutesLeft <= 0) {
			get().closeClinic();
			return;
		}
		set({
			shift: {
				...shift,
				activeId: null,
				tab: "chart"
			},
			screen: "waiting"
		});
	},
	tick: (dt) => {
		const { screen, shift } = get();
		if (!shift) return;
		if (screen !== "waiting" && screen !== "consult") return;
		const rate = screen === "waiting" ? REAL_TO_CLINIC * 1.35 : REAL_TO_CLINIC;
		let minutesLeft = shift.minutesLeft - dt * rate;
		let patients = shift.patients.map((p) => p.seen || p.missed ? p : {
			...p,
			wait: p.wait + dt * rate
		});
		if (minutesLeft <= 0) {
			minutesLeft = 0;
			patients = patients.map((p) => p.seen || p.missed || p.instanceId === shift.activeId ? p : {
				...p,
				missed: true
			});
			set({ shift: {
				...shift,
				minutesLeft,
				patients
			} });
			if (screen === "waiting") get().closeClinic();
			return;
		}
		set({ shift: {
			...shift,
			minutesLeft,
			patients
		} });
	},
	closeClinic: () => {
		const shift = get().shift;
		if (!shift) return;
		const missed = shift.patients.filter((p) => p.missed || !p.seen).length;
		const unseen = shift.patients.map((p) => p.seen ? p : {
			...p,
			missed: true
		});
		let rep = 0;
		const seen = unseen.filter((p) => p.debrief);
		if (seen.length === 0) rep = -8 * Math.max(1, missed);
		else {
			const avg = seen.reduce((a, p) => {
				const g = p.debrief.grade;
				return a + (g === "excellent" ? 5 : g === "good" ? 2 : g === "mixed" ? 0 : -6);
			}, 0) / seen.length;
			rep = Math.round(avg - missed * 4);
		}
		const reputation = clampRep(get().reputation + rep);
		const careerScore = get().careerScore + shift.score;
		const bestShiftScore = Math.max(get().bestShiftScore, shift.score);
		const finishedDay = get().day;
		const careerComplete = finishedDay >= 8 || get().careerComplete;
		set({
			shift: {
				...shift,
				patients: unseen,
				minutesLeft: 0,
				activeId: null
			},
			reputation,
			careerScore,
			bestShiftScore,
			lastRepDelta: rep,
			careerComplete,
			screen: reputation <= 0 ? "gameOver" : finishedDay >= 8 ? "careerWin" : "shiftEnd"
		});
		get().persist();
	},
	nextDay: () => {
		sfxClick();
		set({
			day: get().day + 1,
			screen: "briefing",
			shift: null
		});
		get().persist();
	},
	toTitle: () => {
		get().persist();
		set({
			screen: "title",
			shift: null,
			overlay: null,
			hasSave: true
		});
	}
}));
function useT() {
	const lang = useGame((s) => s.lang);
	return (th, en) => lang === "th" ? th : en;
}
function Tx({ th, en }) {
	const lang = useGame((s) => s.lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loc(lang, {
		th,
		en
	}) });
}
function Portrait({ index, alt, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/portraits/p${index}.jpg`,
		alt,
		className: cn("object-cover outline outline-1 -outline-offset-1 outline-foreground/10", className),
		draggable: false
	});
}
function PulseMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 16h6l2.5-7 4 14 3-8H29",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Paper({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-paper text-paper-foreground shadow-[var(--shadow-paper)]", className),
		children
	});
}
function Chip({ on, onClick, children, tone = "paper" }) {
	const paper = tone === "paper";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 rounded-lg px-3 text-left text-sm leading-snug transition-opacity", paper && (on ? "bg-paper-foreground text-paper" : "bg-background/5 text-paper-foreground shadow-[inset_0_0_0_1px_rgb(28_36_33/0.12)]"), !paper && (on ? "bg-accent text-accent-foreground" : "bg-surface-2 text-foreground shadow-[var(--shadow-border)]")),
		children
	});
}
function LangToggle() {
	const lang = useGame((s) => s.lang);
	const setLang = useGame((s) => s.setLang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex rounded-lg bg-surface-2 p-1 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: cn("min-h-10 rounded-md px-3 text-sm", lang === "th" ? "bg-accent text-accent-foreground" : "text-muted"),
			onClick: () => setLang("th"),
			children: "ไทย"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: cn("min-h-10 rounded-md px-3 text-sm", lang === "en" ? "bg-accent text-accent-foreground" : "text-muted"),
			onClick: () => setLang("en"),
			children: "EN"
		})]
	});
}
function formatMinutes(n) {
	const m = Math.max(0, n);
	const whole = Math.floor(m);
	return `${whole}:${Math.floor((m - whole) * 60).toString().padStart(2, "0")}`;
}
function Hud({ onHandbook }) {
	const t = useT();
	const day = useGame((s) => s.day);
	const reputation = useGame((s) => s.reputation);
	const shift = useGame((s) => s.shift);
	const low = (shift?.minutesLeft ?? 0) < 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulseMark, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl leading-none",
						children: "WARD"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: t(`วันที่ ${day}`, `Day ${day}`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex flex-wrap items-center gap-3 text-sm",
					children: [
						shift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("flex items-center gap-1.5 tabular", low ? "text-danger" : "text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4" }), formatMinutes(shift.minutesLeft)]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-muted",
							children: [
								t("ชื่อเสียง", "Rep"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: reputation
								})
							]
						}),
						shift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-muted",
							children: [
								t("คะแนน", "Score"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: shift.score
								})
							]
						}) : null,
						onHandbook ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onHandbook,
							className: "inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-muted hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: t("คู่มือ", "Handbook")
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {})
					]
				})
			]
		})
	});
}
function BriefingScreen() {
	const t = useT();
	const day = useGame((s) => s.day);
	const reputation = useGame((s) => s.reputation);
	const startShift = useGame((s) => s.startShift);
	const toTitle = useGame((s) => s.toTitle);
	const n = day <= 8 ? [
		3,
		4,
		4,
		5,
		5,
		6,
		6,
		6
	][day - 1] : 6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-xl px-5 py-12 ward-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-[0.18em] text-muted uppercase",
					children: t("เวรเย็น", "Evening shift")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-5xl",
					children: t(`วันที่ ${day}`, `Day ${day}`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: t(`${n} คนไข้ · ${minutesForDay(day)} นาทีคลินิก · ชื่อเสียง ${reputation}`, `${n} patients · ${minutesForDay(day)} clinic minutes · reputation ${reputation}`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-8 space-y-3 text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("เรียกคนไข้ตามความเร่งด่วน", "Call patients by urgency.") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("แล็บกินเวลา — สั่งเท่าที่เปลี่ยนแผน", "Labs cost time. Order only what changes the plan.") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("NCD ต้องการยาและคำปรึกษาชีวิต", "NCDs need medicines and lifestyle counseling.") })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: startShift,
						children: t("เปิดคลินิก", "Open clinic")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: toTitle,
						children: t("กลับหน้าหลัก", "Title")
					})]
				})
			]
		})]
	});
}
function WaitingRoom() {
	const lang = useGame((s) => s.lang);
	const t = useT();
	const shift = useGame((s) => s.shift);
	const openPatient = useGame((s) => s.openPatient);
	const closeClinic = useGame((s) => s.closeClinic);
	const openOverlay = useGame((s) => s.openOverlay);
	const [confirmClose, setConfirmClose] = (0, import_react.useState)(false);
	if (!shift) return null;
	const waiting = shift.patients.filter((p) => !p.seen && !p.missed);
	const done = shift.patients.filter((p) => p.seen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, { onHandbook: () => openOverlay("handbook") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 py-6 md:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl md:text-4xl",
						children: t("ห้องรอ", "Waiting room")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: t(`${waiting.length} คนรอ · เลือกตาม urgency`, `${waiting.length} waiting · pick by urgency`)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: confirmClose ? "danger" : "ghost",
						onClick: () => {
							if (waiting.length > 0 && !confirmClose) {
								setConfirmClose(true);
								return;
							}
							closeClinic();
						},
						children: confirmClose ? t("ยืนยันปิด — คนไข้ยังรอ", "Confirm close — patients waiting") : t("ปิดคลินิก", "Close clinic")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: waiting.map((p, i) => {
						const c = getCase(p.caseId);
						const urgent = c.urgency === 3;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openPatient(p.instanceId),
							className: cn("ward-enter flex w-full items-stretch gap-0 overflow-hidden rounded-xl bg-surface text-left shadow-[var(--shadow-border)]", urgent && "ring-1 ring-danger/50"),
							style: { animationDelay: `${i * 40}ms` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
								index: c.portrait,
								alt: "",
								className: "h-28 w-24 shrink-0 sm:h-32 sm:w-28"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 flex-col justify-center px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: loc(lang, c.name)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm text-muted",
												children: [c.age, t(c.sex === "m" ? " ปี ชาย" : " ปี หญิง", c.sex === "m" ? " y M" : " y F")]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { n: c.urgency })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-sm text-muted",
										children: loc(lang, c.complaint)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs tabular text-subtle",
										children: [
											t("รอ", "Wait"),
											" ",
											formatMinutes(p.wait)
										]
									})
								]
							})]
						}, p.instanceId);
					})
				}),
				waiting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-muted",
					children: t("ห้องรอว่าง", "The waiting room is empty.")
				}) : null,
				done.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm text-subtle",
					children: t(`ตรวจแล้ว ${done.length} คน`, `${done.length} seen`)
				}) : null
			]
		})]
	});
}
function UrgencyBadge({ n }) {
	const t = useT();
	const label = n === 3 ? t("เร่งด่วน", "Urgent") : n === 2 ? t("ปานกลาง", "Moderate") : t("ปกติ", "Routine");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("rounded-full px-2 py-0.5 text-xs", n === 3 && "bg-danger/15 text-danger", n === 2 && "bg-warn/15 text-warn", n === 1 && "bg-foreground/8 text-muted"),
		children: [n === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mr-1 inline size-3" }) : null, label]
	});
}
function ShiftEndScreen({ win = false }) {
	const t = useT();
	const shift = useGame((s) => s.shift);
	const day = useGame((s) => s.day);
	const reputation = useGame((s) => s.reputation);
	const lastRepDelta = useGame((s) => s.lastRepDelta);
	const nextDay = useGame((s) => s.nextDay);
	const toTitle = useGame((s) => s.toTitle);
	if (!shift) return null;
	const seen = shift.patients.filter((p) => p.seen).length;
	const missed = shift.patients.filter((p) => p.missed).length;
	const perfect = shift.patients.filter((p) => p.debrief?.perfect).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-xl px-5 py-12 ward-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-[0.18em] text-muted uppercase",
					children: win ? t("จบ 8 เวร", "Eight shifts") : t("ปิดคลินิก", "Clinic closed")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-5xl",
					children: win ? t("หัวหน้าคลินิก", "Attending") : t(`สรุปวันที่ ${day}`, `Day ${day} report`)
				}),
				win ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: t("คุณพาคลินิก NCD ผ่านแปดเวร เล่นต่อได้ไม่จำกัด", "You took the NCD clinic through eight shifts. Endless days are open.")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: t("คะแนนเวร", "Shift score"),
							v: shift.score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: t("ชื่อเสียง", "Reputation"),
							v: `${reputation} (${lastRepDelta >= 0 ? "+" : ""}${lastRepDelta})`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: t("ตรวจแล้ว", "Seen"),
							v: seen
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: t("พลาดคิว", "Unseen"),
							v: missed
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: t("เคสสมบูรณ์", "Clean"),
							v: perfect
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: nextDay,
						children: t("เวรถัดไป", "Next shift")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: toTitle,
						children: t("หน้าหลัก", "Title")
					})]
				})
			]
		})]
	});
}
function GameOverScreen() {
	const t = useT();
	const careerScore = useGame((s) => s.careerScore);
	const patientsTreated = useGame((s) => s.patientsTreated);
	const newCareer = useGame((s) => s.newCareer);
	const toTitle = useGame((s) => s.toTitle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-xl px-5 py-12 ward-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl",
					children: t("คลินิกปิด", "Clinic closed")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: t("ชื่อเสียงหมด ชุมชนไม่ไว้ใจเวรนี้แล้ว", "Reputation hit zero. The community will not trust this shift.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 tabular text-foreground",
					children: [
						t("คะแนนอาชีพ", "Career score"),
						" ",
						careerScore,
						" · ",
						t("คนไข้", "patients"),
						" ",
						patientsTreated
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: newCareer,
						children: t("เริ่มใหม่", "Start over")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: toTitle,
						children: t("หน้าหลัก", "Title")
					})]
				})
			]
		})]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-3xl tabular",
			children: v
		})]
	});
}
function ConsultScreen() {
	const lang = useGame((s) => s.lang);
	const t = useT();
	const shift = useGame((s) => s.shift);
	const setTab = useGame((s) => s.setTab);
	const orderTest = useGame((s) => s.orderTest);
	const toggleDx = useGame((s) => s.toggleDx);
	const toggleTx = useGame((s) => s.toggleTx);
	const signOff = useGame((s) => s.signOff);
	const openOverlay = useGame((s) => s.openOverlay);
	const p = shift?.patients.find((x) => x.instanceId === shift.activeId);
	if (!shift || !p) return null;
	const c = getCase(p.caseId);
	const tab = shift.tab;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, { onHandbook: () => openOverlay("handbook") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,18rem)_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				className: "overflow-hidden ward-enter",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
					index: c.portrait,
					alt: "",
					className: "h-48 w-full sm:h-56 lg:h-44"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.16em] text-paper-muted uppercase",
							children: loc(lang, c.job)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-3xl leading-tight",
							children: loc(lang, c.name)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-paper-muted",
							children: [c.age, t(c.sex === "m" ? " ปี · ชาย" : " ปี · หญิง", c.sex === "m" ? " y · M" : " y · F")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: loc(lang, c.complaint)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalsGrid, {
							bp: c.vitals.bp,
							hr: c.vitals.hr,
							bmi: c.vitals.bmi,
							spo2: c.vitals.spo2,
							glucose: c.vitals.glucose
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				className: "flex min-h-[28rem] flex-col p-4 sm:p-5 ward-enter",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1 rounded-lg bg-background/5 p-1",
						children: [
							["chart", t("ประวัติ", "History")],
							["labs", t("แล็บ", "Labs")],
							["plan", t("แผน", "Plan")]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTab(id),
							className: cn("min-h-11 flex-1 rounded-md text-sm", tab === id ? "bg-paper-foreground text-paper" : "text-paper-muted"),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 min-h-0 flex-1 overflow-y-auto",
						children: [
							tab === "chart" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-sans text-sm font-medium tracking-normal text-paper-muted",
									children: t("ประวัติ", "History")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 leading-relaxed",
									children: loc(lang, c.history)
								}),
								c.flags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 flex flex-wrap gap-2",
									children: c.flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "rounded-full bg-background/8 px-3 py-1 text-sm",
										children: loc(lang, f)
									}, f.en))
								}) : null
							] }) : null,
							tab === "labs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: TEST_ORDER.map((id) => {
									const ordered = p.tests.includes(id);
									const result = ordered ? c.testResults[id] : void 0;
									const test = TESTS[id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2 rounded-lg bg-background/5 px-3 py-3 sm:flex-row sm:items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-baseline gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: loc(lang, test.label)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs tabular text-paper-muted",
													children: [
														test.minutes,
														" ",
														t("นาที", "min")
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-paper-muted",
												children: result ? loc(lang, result) : loc(lang, test.blurb)
											})]
										}), ordered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-ok",
											children: t("ได้ผล", "Reported")
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ink",
											size: "sm",
											onClick: () => orderTest(id),
											disabled: shift.minutesLeft < test.minutes,
											children: t("สั่ง", "Order")
										})]
									}, id);
								})
							}) : null,
							tab === "plan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-sans text-sm font-medium tracking-normal text-paper-muted",
										children: t("วินิจฉัย", "Diagnoses")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
										children: DISEASE_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											on: p.diagnoses.includes(id),
											onClick: () => toggleDx(id),
											children: loc(lang, DISEASES[id].label)
										}, id))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanGroup, {
										title: t("ยา", "Medicines"),
										group: "med",
										selected: p.treatments,
										onToggle: toggleTx
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanGroup, {
										title: t("ปรับชีวิต", "Lifestyle"),
										group: "life",
										selected: p.treatments,
										onToggle: toggleTx
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanGroup, {
										title: t("ส่งต่อ", "Referral"),
										group: "refer",
										selected: p.treatments,
										onToggle: toggleTx
									})
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2 border-t border-paper-foreground/10 pt-4 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex-1 text-sm text-paper-muted",
							children: p.diagnoses.length === 0 ? t("เลือกอย่างน้อยหนึ่งวินิจฉัยก่อนลงนาม", "Pick at least one diagnosis to sign.") : t("ลงนามแล้วจะได้เดอบรีฟทันที", "Signing locks the plan and opens the debrief.")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ink",
							onClick: signOff,
							disabled: p.diagnoses.length === 0,
							className: "sm:min-w-44",
							children: t("ลงนามแผน", "Sign plan")
						})]
					})
				]
			})]
		})]
	});
}
function PlanGroup({ title, group, selected, onToggle }) {
	const lang = useGame((s) => s.lang);
	const ids = ACTION_ORDER.filter((id) => ACTIONS[id].group === group);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "font-sans text-sm font-medium tracking-normal text-paper-muted",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			on: selected.includes(id),
			onClick: () => onToggle(id),
			children: loc(lang, ACTIONS[id].label)
		}, id))
	})] });
}
function VitalsGrid({ bp, hr, bmi, spo2, glucose }) {
	const t = useT();
	const cells = [
		{
			k: "BP",
			v: bp
		},
		{
			k: "HR",
			v: String(hr)
		},
		{
			k: "BMI",
			v: bmi.toFixed(1)
		},
		{
			k: "SpO2",
			v: `${spo2}%`
		}
	];
	if (glucose != null) cells.push({
		k: t("น้ำตาล", "Glu"),
		v: String(glucose)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "mt-4 grid grid-cols-3 gap-2",
		children: cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md bg-background/8 px-2 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[0.65rem] tracking-wide text-paper-muted uppercase",
				children: c.k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "tabular text-sm font-medium",
				children: c.v
			})]
		}, c.k))
	});
}
function DebriefScreen() {
	const lang = useGame((s) => s.lang);
	const t = useT();
	const shift = useGame((s) => s.shift);
	const afterDebrief = useGame((s) => s.afterDebrief);
	const p = shift?.patients.find((x) => x.instanceId === shift.activeId);
	const d = p?.debrief;
	if (!shift || !p || !d) return null;
	const c = getCase(p.caseId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-2xl px-4 py-8 ward-enter",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				className: "p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("text-sm tracking-[0.16em] uppercase", gradeColor(d.grade)),
						children: gradeLabel(d.grade, t)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 font-display text-4xl",
						children: [d.score >= 0 ? "+" : "", d.score]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-paper-muted",
						children: [
							loc(lang, c.name),
							" · ",
							loc(lang, d.outcome)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-2",
						children: d.lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn(line.kind === "ok" && "text-ok", line.kind === "bonus" && "text-ok", line.kind === "miss" && "text-warn", line.kind === "bad" && "text-danger"),
								children: loc(lang, line.text)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular text-paper-muted",
								children: [line.delta > 0 ? "+" : "", line.delta]
							})]
						}, `${line.delta}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-lg bg-background/8 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-sans text-sm font-medium tracking-normal text-paper-muted",
							children: t("โน้ตเวร", "Shift note")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed",
							children: loc(lang, d.teaching)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ink",
						className: "mt-6 w-full",
						onClick: afterDebrief,
						children: t("คนไข้ถัดไป", "Next patient")
					})
				]
			})
		})]
	});
}
function gradeLabel(g, t) {
	if (g === "excellent") return t("ยอดเยี่ยม", "Excellent");
	if (g === "good") return t("ดี", "Good");
	if (g === "mixed") return t("ปนกัน", "Mixed");
	return t("ต้องทบทวน", "Needs review");
}
function gradeColor(g) {
	if (g === "excellent" || g === "good") return "text-ok";
	if (g === "mixed") return "text-warn";
	return "text-danger";
}
function TitleScreen() {
	const t = useT();
	const hasSave = useGame((s) => s.hasSave);
	const day = useGame((s) => s.day);
	const reputation = useGame((s) => s.reputation);
	const newCareer = useGame((s) => s.newCareer);
	const continueCareer = useGame((s) => s.continueCareer);
	const openOverlay = useGame((s) => s.openOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/clinic.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-10 pt-8 md:justify-center md:pb-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl ward-enter-slow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulseMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm tracking-[0.22em] text-muted uppercase",
								children: "NCD Clinic"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-6xl text-foreground md:text-8xl",
							children: "WARD"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-base text-muted md:text-lg",
							children: t("เวรคลินิกโรคไม่ติดต่อ — เรียกคนไข้ เปิดชาร์ต สั่งแล็บ วางแผนรักษา ก่อนเวลาหมด", "Night shift at the NCD clinic. Call patients, open the chart, order labs, sign a plan — before time runs out.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
							children: [hasSave && reputation > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								onClick: continueCareer,
								className: "min-h-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), t(`ต่อเวร วันที่ ${day}`, `Continue · Day ${day}`)]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: hasSave && reputation > 0 ? "secondary" : "primary",
								onClick: newCareer,
								className: "min-h-12",
								children: t("เริ่มอาชีพใหม่", "New career")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									onClick: () => openOverlay("howTo"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tx, {
										th: "วิธีเล่น",
										en: "How to play"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									onClick: () => openOverlay("handbook"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tx, {
										th: "คู่มือ NCD",
										en: "NCD handbook"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => openOverlay("records"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tx, {
										th: "สถิติ",
										en: "Records"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {})
							]
						})
					]
				})
			})
		]
	});
}
function HowToScreen() {
	const t = useT();
	const close = useGame((s) => s.closeOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoShell, {
		title: t("วิธีเล่น", "How to play"),
		onBack: close,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: t("เกมจำลองคลินิก NCD เพื่อฝึกตัดสินใจ ไม่ใช่คำแนะนำทางการแพทย์", "A clinic simulation for judgment practice — not medical advice.")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 space-y-4",
			children: [
				{
					n: "01",
					th: "เรียกคนไข้จากห้องรอ — คนที่มี urgency สูงอาจแย่ถ้าปล่อยทิ้ง",
					en: "Call from the waiting room. High-urgency patients cost you if they wait out the clock."
				},
				{
					n: "02",
					th: "อ่านประวัติและสัญญาณชีพ แล้วสั่งแล็บเท่าที่คุ้มกับเวลา",
					en: "Read history and vitals. Order labs only when they earn the minutes they cost."
				},
				{
					n: "03",
					th: "เลือกวินิจฉัยและแผน: ยา ปรับชีวิต ส่งต่อ — อย่ารักษาเกินและอย่าพลาดโรคหลัก",
					en: "Pick diagnoses and a plan: meds, lifestyle, referral. Do not over-treat. Do not miss the core disease."
				},
				{
					n: "04",
					th: "ลงนามแล้วรับเดอบรีฟ ชื่อเสียงตกถ้าพลาดเคสหรือปล่อยคนไข้ไม่ทัน",
					en: "Sign off, take the debrief. Reputation falls if you miss the case or leave patients unseen."
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl text-accent",
					children: s.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pt-1 text-foreground",
					children: t(s.th, s.en)
				})]
			}, s.n))
		})]
	});
}
function HandbookScreen() {
	const lang = useGame((s) => s.lang);
	const t = useT();
	const close = useGame((s) => s.closeOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoShell, {
		title: t("คู่มือ NCD", "NCD handbook"),
		onBack: close,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: t("โปรโตคอลย่อสำหรับเวรนี้ — กดเปิดได้ทุกเมื่อจากห้องรอ", "Short protocols for this shift. Open anytime from the waiting room.")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3",
			children: DISEASE_ORDER.map((id) => {
				const d = DISEASES[id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg bg-surface-2 px-4 py-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-sans text-base font-medium tracking-normal",
						children: loc(lang, d.label)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: loc(lang, d.hint)
					})]
				}, id);
			})
		})]
	});
}
function RecordsScreen() {
	const t = useT();
	const close = useGame((s) => s.closeOverlay);
	const day = useGame((s) => s.day);
	const reputation = useGame((s) => s.reputation);
	const careerScore = useGame((s) => s.careerScore);
	const patientsTreated = useGame((s) => s.patientsTreated);
	const perfectCases = useGame((s) => s.perfectCases);
	const bestShiftScore = useGame((s) => s.bestShiftScore);
	const rows = [
		{
			th: "วันที่อาชีพ",
			en: "Career day",
			v: String(day)
		},
		{
			th: "ชื่อเสียง",
			en: "Reputation",
			v: String(reputation)
		},
		{
			th: "คะแนนรวม",
			en: "Career score",
			v: String(careerScore)
		},
		{
			th: "คนไข้ที่รักษา",
			en: "Patients treated",
			v: String(patientsTreated)
		},
		{
			th: "เคสสมบูรณ์",
			en: "Clean cases",
			v: String(perfectCases)
		},
		{
			th: "เวรที่ดีที่สุด",
			en: "Best shift",
			v: String(bestShiftScore)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoShell, {
		title: t("สถิติคลินิก", "Clinic records"),
		onBack: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "grid gap-3 sm:grid-cols-2",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-surface-2 px-4 py-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-sm text-muted",
					children: t(r.th, r.en)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 font-display text-3xl tabular",
					children: r.v
				})]
			}, r.en))
		})
	});
}
function InfoShell({ title, onBack, children }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-background px-5 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl ward-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onBack,
					className: "mb-6 px-0",
					children: t("กลับ", "Back")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl md:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children
				})
			]
		})
	});
}
function Game() {
	const screen = useGame((s) => s.screen);
	const hydrate = useGame((s) => s.hydrate);
	const tick = useGame((s) => s.tick);
	const persist = useGame((s) => s.persist);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min((now - last) / 1e3, .1);
			last = now;
			tick(dt);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		const onHide = () => {
			if (document.visibilityState === "hidden") persist();
		};
		document.addEventListener("visibilitychange", onHide);
		window.addEventListener("pagehide", persist);
		return () => {
			document.removeEventListener("visibilitychange", onHide);
			window.removeEventListener("pagehide", persist);
		};
	}, [persist]);
	switch (screen) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
		case "howTo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowToScreen, {});
		case "records": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordsScreen, {});
		case "handbook": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandbookScreen, {});
		case "briefing": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingScreen, {});
		case "waiting": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitingRoom, {});
		case "consult": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultScreen, {});
		case "debrief": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebriefScreen, {});
		case "shiftEnd": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShiftEndScreen, {});
		case "careerWin": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShiftEndScreen, { win: true });
		case "gameOver": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameOverScreen, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
	}
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {});
}
//#endregion
export { Home as component };
