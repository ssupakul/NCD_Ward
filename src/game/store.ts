import { create } from "zustand";
import { sfxBad, sfxClick, sfxOk, sfxStamp, unlockAudio } from "./audio";
import { getCase, makeShift, scoreConsult, testCost } from "./engine";
import { clearSave, freshSave, loadSave, writeSave, type SaveData } from "./save";
import type { ActionId, DiseaseId, Lang, Screen, ShiftState, TestId } from "./types";

const REAL_TO_CLINIC = 0.07; // ~14s per clinic minute

type Overlay = "howTo" | "records" | "handbook" | null;

type GameState = SaveData & {
  screen: Screen;
  overlay: Overlay;
  returnScreen: Screen | null;
  hydrated: boolean;
  hasSave: boolean;
  shift: ShiftState | null;
  lastRepDelta: number;
  hydrate: () => void;
  setLang: (lang: Lang) => void;
  persist: () => void;
  newCareer: () => void;
  continueCareer: () => void;
  openOverlay: (o: Overlay) => void;
  closeOverlay: () => void;
  startShift: () => void;
  openPatient: (id: string) => void;
  setTab: (tab: ShiftState["tab"]) => void;
  orderTest: (id: TestId) => void;
  toggleDx: (id: DiseaseId) => void;
  toggleTx: (id: ActionId) => void;
  signOff: () => void;
  afterDebrief: () => void;
  tick: (dt: number) => void;
  closeClinic: () => void;
  nextDay: () => void;
  toTitle: () => void;
};

function clampRep(n: number) {
  return Math.max(0, Math.min(100, n));
}

function activePatient(shift: ShiftState | null) {
  if (!shift?.activeId) return null;
  return shift.patients.find((p) => p.instanceId === shift.activeId) ?? null;
}

export const useGame = create<GameState>((set, get) => ({
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
      set({ hydrated: true, hasSave: false });
      return;
    }
    set({
      ...saved,
      hydrated: true,
      hasSave: saved.day > 1 || saved.patientsTreated > 0 || saved.careerScore > 0,
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
      careerComplete: s.careerComplete,
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
    const fresh = freshSave(lang);
    set({
      ...fresh,
      hasSave: true,
      screen: "briefing",
      overlay: null,
      shift: null,
      lastRepDelta: 0,
    });
    get().persist();
  },

  continueCareer: () => {
    unlockAudio();
    sfxClick();
    if (get().reputation <= 0) {
      set({ screen: "gameOver", overlay: null });
      return;
    }
    set({ screen: "briefing", overlay: null, shift: null });
  },

  openOverlay: (o) => {
    unlockAudio();
    sfxClick();
    const current = get().screen;
    if (o === "howTo") set({ screen: "howTo", overlay: null, returnScreen: current });
    else if (o === "records") set({ screen: "records", overlay: null, returnScreen: current });
    else if (o === "handbook") set({ screen: "handbook", overlay: null, returnScreen: current });
  },

  closeOverlay: () => {
    const back = get().returnScreen ?? (get().shift ? "waiting" : "title");
    set({ screen: back, returnScreen: null });
  },

  startShift: () => {
    unlockAudio();
    sfxClick();
    set({ shift: makeShift(get().day), screen: "waiting", overlay: null });
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
        tab: "chart",
      },
      screen: "consult",
    });
  },

  setTab: (tab) => {
    const shift = get().shift;
    if (!shift) return;
    set({ shift: { ...shift, tab } });
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
    set({
      shift: {
        ...shift,
        minutesLeft: shift.minutesLeft - cost,
        patients: shift.patients.map((x) =>
          x.instanceId === p.instanceId ? { ...x, tests: [...x.tests, id] } : x,
        ),
      },
    });
  },

  toggleDx: (id) => {
    const shift = get().shift;
    const p = activePatient(shift);
    if (!shift || !p) return;
    sfxClick();
    const next = p.diagnoses.includes(id)
      ? p.diagnoses.filter((d) => d !== id)
      : [...p.diagnoses, id];
    set({
      shift: {
        ...shift,
        patients: shift.patients.map((x) =>
          x.instanceId === p.instanceId ? { ...x, diagnoses: next } : x,
        ),
      },
    });
  },

  toggleTx: (id) => {
    const shift = get().shift;
    const p = activePatient(shift);
    if (!shift || !p) return;
    sfxClick();
    const next = p.treatments.includes(id)
      ? p.treatments.filter((d) => d !== id)
      : [...p.treatments, id];
    set({
      shift: {
        ...shift,
        patients: shift.patients.map((x) =>
          x.instanceId === p.instanceId ? { ...x, treatments: next } : x,
        ),
      },
    });
  },

  signOff: () => {
    const shift = get().shift;
    const p = activePatient(shift);
    if (!shift || !p) return;
    if (p.diagnoses.length === 0) {
      sfxBad();
      return;
    }
    const c = getCase(p.caseId);
    const debrief = scoreConsult(c, p.tests, p.diagnoses, p.treatments);
    if (debrief.grade === "excellent" || debrief.grade === "good") sfxOk();
    else sfxStamp();
    const patients = shift.patients.map((x) =>
      x.instanceId === p.instanceId ? { ...x, seen: true, debrief } : x,
    );
    set({
      shift: {
        ...shift,
        score: shift.score + debrief.score,
        patients,
        activeId: p.instanceId,
      },
      screen: "debrief",
      patientsTreated: get().patientsTreated + 1,
      perfectCases: get().perfectCases + (debrief.perfect ? 1 : 0),
    });
  },

  afterDebrief: () => {
    const shift = get().shift;
    if (!shift) return;
    const remaining = shift.patients.filter((p) => !p.seen && !p.missed);
    if (remaining.length === 0 || shift.minutesLeft <= 0) {
      get().closeClinic();
      return;
    }
    set({
      shift: { ...shift, activeId: null, tab: "chart" },
      screen: "waiting",
    });
  },

  tick: (dt) => {
    const { screen, shift } = get();
    if (!shift) return;
    if (screen !== "waiting" && screen !== "consult") return;
    const rate = screen === "waiting" ? REAL_TO_CLINIC * 1.35 : REAL_TO_CLINIC;
    let minutesLeft = shift.minutesLeft - dt * rate;
    let patients = shift.patients.map((p) =>
      p.seen || p.missed ? p : { ...p, wait: p.wait + dt * rate },
    );
    if (minutesLeft <= 0) {
      minutesLeft = 0;
      patients = patients.map((p) =>
        p.seen || p.missed || p.instanceId === shift.activeId ? p : { ...p, missed: true },
      );
      set({ shift: { ...shift, minutesLeft, patients } });
      if (screen === "waiting") get().closeClinic();
      return;
    }
    set({ shift: { ...shift, minutesLeft, patients } });
  },

  closeClinic: () => {
    const shift = get().shift;
    if (!shift) return;
    const missed = shift.patients.filter((p) => p.missed || !p.seen).length;
    const unseen = shift.patients.map((p) =>
      p.seen ? p : { ...p, missed: true },
    );
    let rep = 0;
    const seen = unseen.filter((p) => p.debrief);
    if (seen.length === 0) rep = -8 * Math.max(1, missed);
    else {
      const avg =
        seen.reduce((a, p) => {
          const g = p.debrief!.grade;
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
      shift: { ...shift, patients: unseen, minutesLeft: 0, activeId: null },
      reputation,
      careerScore,
      bestShiftScore,
      lastRepDelta: rep,
      careerComplete,
      screen: reputation <= 0 ? "gameOver" : finishedDay >= 8 ? "careerWin" : "shiftEnd",
    });
    get().persist();
  },

  nextDay: () => {
    sfxClick();
    set({
      day: get().day + 1,
      screen: "briefing",
      shift: null,
    });
    get().persist();
  },

  toTitle: () => {
    get().persist();
    set({ screen: "title", shift: null, overlay: null, hasSave: true });
  },
}));
