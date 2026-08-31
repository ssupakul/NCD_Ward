/**
 * Runtime catalog: built-in content + localStorage overrides.
 * Admin can CRUD cases and extend/edit diseases, labs, and actions.
 */
import { CASES as BUILTIN_CASES } from "./cases";
import {
  ACTIONS as BUILTIN_ACTIONS,
  ACTION_ORDER as BUILTIN_ACTION_ORDER,
  DISEASES as BUILTIN_DISEASES,
  DISEASE_ORDER as BUILTIN_DISEASE_ORDER,
  TESTS as BUILTIN_TESTS,
  TEST_ORDER as BUILTIN_TEST_ORDER,
} from "./content";
import type {
  ActionGroup,
  ActionId,
  CaseDef,
  DiseaseId,
  Loc,
  TestId,
} from "./types";

const CATALOG_KEY = "ward-ncd-catalog-v1";

export type DiseaseEntry = { label: Loc; hint: Loc };
export type TestEntry = { label: Loc; minutes: number; blurb: Loc };
export type ActionEntry = { label: Loc; group: ActionGroup };

type CatalogStore = {
  version: number;
  /** Full case definitions keyed by id (overrides + custom) */
  caseOverrides: Record<string, CaseDef>;
  /** Built-in case ids that admin soft-deleted */
  deletedCaseIds: string[];
  diseaseOverrides: Record<string, DiseaseEntry>;
  testOverrides: Record<string, TestEntry>;
  actionOverrides: Record<string, ActionEntry>;
  /** Extra ids beyond builtins, in display order */
  extraDiseaseIds: string[];
  extraTestIds: string[];
  extraActionIds: string[];
};

const emptyStore = (): CatalogStore => ({
  version: 1,
  caseOverrides: {},
  deletedCaseIds: [],
  diseaseOverrides: {},
  testOverrides: {},
  actionOverrides: {},
  extraDiseaseIds: [],
  extraTestIds: [],
  extraActionIds: [],
});

function canStore(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function loadStore(): CatalogStore {
  if (!canStore()) return emptyStore();
  try {
    const raw = localStorage.getItem(CATALOG_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as CatalogStore;
    return { ...emptyStore(), ...parsed, version: 1 };
  } catch {
    return emptyStore();
  }
}

function saveStore(s: CatalogStore): void {
  if (!canStore()) return;
  try {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(s));
  } catch {
    /* quota */
  }
}

let cache: CatalogStore | null = null;

function store(): CatalogStore {
  if (!cache) cache = loadStore();
  return cache;
}

export function reloadCatalog(): void {
  cache = loadStore();
}

export function persistCatalog(): void {
  if (cache) saveStore(cache);
}

// ——— Cases ———

export function listCases(): CaseDef[] {
  const s = store();
  const deleted = new Set(s.deletedCaseIds);
  const map = new Map<string, CaseDef>();
  for (const c of BUILTIN_CASES) {
    if (!deleted.has(c.id)) map.set(c.id, c);
  }
  for (const [id, c] of Object.entries(s.caseOverrides)) {
    if (!deleted.has(id)) map.set(id, c);
  }
  return Array.from(map.values());
}

export function getCaseDef(id: string): CaseDef | null {
  const s = store();
  if (s.deletedCaseIds.includes(id) && !s.caseOverrides[id]) return null;
  if (s.caseOverrides[id]) return s.caseOverrides[id]!;
  return BUILTIN_CASES.find((c) => c.id === id) ?? null;
}

export function isBuiltinCase(id: string): boolean {
  return BUILTIN_CASES.some((c) => c.id === id);
}

export function upsertCase(c: CaseDef): void {
  const s = store();
  s.caseOverrides[c.id] = c;
  s.deletedCaseIds = s.deletedCaseIds.filter((x) => x !== c.id);
  persistCatalog();
}

export function deleteCase(id: string): void {
  const s = store();
  delete s.caseOverrides[id];
  if (isBuiltinCase(id)) {
    if (!s.deletedCaseIds.includes(id)) s.deletedCaseIds.push(id);
  }
  persistCatalog();
}

export function restoreBuiltinCase(id: string): void {
  const s = store();
  s.deletedCaseIds = s.deletedCaseIds.filter((x) => x !== id);
  delete s.caseOverrides[id];
  persistCatalog();
}

export function blankCase(id?: string): CaseDef {
  const nid =
    id?.trim() ||
    `custom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  return {
    id: nid,
    portrait: 0,
    name: { th: "ผู้ป่วยใหม่", en: "New patient" },
    age: 50,
    sex: "m",
    job: { th: "—", en: "—" },
    complaint: { th: "อาการสำคัญ", en: "Chief complaint" },
    history: { th: "ประวัติ", en: "History" },
    vitals: { bp: "120/80", hr: 72, bmi: 24, spo2: 98, temp: 36.8 },
    flags: [],
    urgency: 1,
    /** Admin can change; used when player picks Easy / Medium / Hard */
    difficulty: 2,
    trueDiagnoses: ["htn"],
    testResults: {},
    usefulTests: [],
    requiredDx: ["htn"],
    requiredGroups: [["acei", "arb", "ccb"]],
    bonusTreatments: [],
    harmfulTreatments: ["refer_er"],
    teaching: {
      th: "ข้อความสอน",
      en: "Teaching note",
    },
    outcomes: {
      excellent: { th: "ผลดีเยี่ยม", en: "Excellent outcome" },
      good: { th: "ผลดี", en: "Good outcome" },
      mixed: { th: "ผลปนกัน", en: "Mixed outcome" },
      poor: { th: "ผลไม่ดี", en: "Poor outcome" },
    },
  };
}

// ——— Diseases / Tests / Actions ———

export function getDiseases(): Record<string, DiseaseEntry> {
  const s = store();
  return { ...BUILTIN_DISEASES, ...s.diseaseOverrides };
}

export function getDiseaseOrder(): string[] {
  const s = store();
  const base = [...BUILTIN_DISEASE_ORDER] as string[];
  for (const id of s.extraDiseaseIds) {
    if (!base.includes(id)) base.push(id);
  }
  // include override-only keys
  for (const id of Object.keys(s.diseaseOverrides)) {
    if (!base.includes(id)) base.push(id);
  }
  return base;
}

export function getTests(): Record<string, TestEntry> {
  const s = store();
  return { ...BUILTIN_TESTS, ...s.testOverrides };
}

export function getTestOrder(): string[] {
  const s = store();
  const base = [...BUILTIN_TEST_ORDER] as string[];
  for (const id of s.extraTestIds) {
    if (!base.includes(id)) base.push(id);
  }
  for (const id of Object.keys(s.testOverrides)) {
    if (!base.includes(id)) base.push(id);
  }
  return base;
}

export function getActions(): Record<string, ActionEntry> {
  const s = store();
  return { ...BUILTIN_ACTIONS, ...s.actionOverrides };
}

export function getActionOrder(): string[] {
  const s = store();
  const base = [...BUILTIN_ACTION_ORDER] as string[];
  for (const id of s.extraActionIds) {
    if (!base.includes(id)) base.push(id);
  }
  for (const id of Object.keys(s.actionOverrides)) {
    if (!base.includes(id)) base.push(id);
  }
  return base;
}

export function upsertDisease(id: string, entry: DiseaseEntry): void {
  const s = store();
  const key = id.trim().toLowerCase().replace(/\s+/g, "_");
  if (!key) return;
  s.diseaseOverrides[key] = entry;
  if (!(BUILTIN_DISEASE_ORDER as string[]).includes(key) && !s.extraDiseaseIds.includes(key)) {
    s.extraDiseaseIds.push(key);
  }
  persistCatalog();
}

export function deleteDisease(id: string): void {
  const s = store();
  delete s.diseaseOverrides[id];
  s.extraDiseaseIds = s.extraDiseaseIds.filter((x) => x !== id);
  // cannot fully remove builtins — reset override only
  persistCatalog();
}

export function upsertTest(id: string, entry: TestEntry): void {
  const s = store();
  const key = id.trim().toLowerCase().replace(/\s+/g, "_");
  if (!key) return;
  s.testOverrides[key] = entry;
  if (!(BUILTIN_TEST_ORDER as string[]).includes(key) && !s.extraTestIds.includes(key)) {
    s.extraTestIds.push(key);
  }
  persistCatalog();
}

export function deleteTest(id: string): void {
  const s = store();
  delete s.testOverrides[id];
  s.extraTestIds = s.extraTestIds.filter((x) => x !== id);
  persistCatalog();
}

export function upsertAction(id: string, entry: ActionEntry): void {
  const s = store();
  const key = id.trim().toLowerCase().replace(/\s+/g, "_");
  if (!key) return;
  s.actionOverrides[key] = entry;
  if (!(BUILTIN_ACTION_ORDER as string[]).includes(key) && !s.extraActionIds.includes(key)) {
    s.extraActionIds.push(key);
  }
  persistCatalog();
}

export function deleteAction(id: string): void {
  const s = store();
  delete s.actionOverrides[id];
  s.extraActionIds = s.extraActionIds.filter((x) => x !== id);
  persistCatalog();
}

export function isCustomDisease(id: string): boolean {
  return !(BUILTIN_DISEASE_ORDER as string[]).includes(id);
}
export function isCustomTest(id: string): boolean {
  return !(BUILTIN_TEST_ORDER as string[]).includes(id);
}
export function isCustomAction(id: string): boolean {
  return !(BUILTIN_ACTION_ORDER as string[]).includes(id);
}

/** Safe label helpers used by engine when id might be custom */
export function diseaseLabel(id: string, lang: "th" | "en"): string {
  const d = getDiseases()[id];
  return d ? d.label[lang] : id;
}
export function actionLabel(id: string, lang: "th" | "en"): string {
  const a = getActions()[id];
  return a ? a.label[lang] : id;
}
export function testLabel(id: string, lang: "th" | "en"): string {
  const t = getTests()[id];
  return t ? t.label[lang] : id;
}

export function testMinutes(id: string): number {
  return getTests()[id]?.minutes ?? 3;
}

// Type bridges for existing CaseDef fields
export type { ActionId, DiseaseId, TestId };
