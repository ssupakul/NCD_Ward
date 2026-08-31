import type { Lang } from "./types";

export const SAVE_VERSION = 1;
const KEY = "ward-ncd-v1";

export type SaveData = {
  version: number;
  lang: Lang;
  day: number;
  reputation: number;
  careerScore: number;
  patientsTreated: number;
  perfectCases: number;
  bestShiftScore: number;
  careerComplete: boolean;
};

const defaults: SaveData = {
  version: SAVE_VERSION,
  lang: "th",
  day: 1,
  reputation: 58,
  careerScore: 0,
  patientsTreated: 0,
  perfectCases: 0,
  bestShiftScore: 0,
  careerComplete: false,
};

function migrate(raw: SaveData): SaveData {
  return { ...defaults, ...raw, version: SAVE_VERSION };
}

export function loadSave(): SaveData | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveData;
    if (!parsed || typeof parsed !== "object") return null;
    return migrate(parsed);
  } catch {
    return null;
  }
}

export function writeSave(data: SaveData): void {
  try {
    const blob = JSON.stringify({ ...data, version: SAVE_VERSION });
    localStorage.setItem(KEY, blob);
  } catch {
    /* private mode / quota */
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function freshSave(lang: Lang): SaveData {
  return { ...defaults, lang };
}
