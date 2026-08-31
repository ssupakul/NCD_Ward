import { create } from "zustand";
import { sfxBad, sfxClick, sfxOk, sfxStamp, unlockAudio } from "./audio";
import { getCase, makeShift, scoreConsult, testCost } from "./engine";
import {
  clearPlayerSave,
  createPlayer,
  deletePlayer,
  freshSave,
  getCurrentPlayerId,
  loadPlayerSave,
  loadProfilesIndex,
  setCurrentPlayerId,
  touchPlayer,
  writePlayerSave,
  type PlayerProfile,
  type SaveData,
} from "./save";
import { loadScoring } from "./scoring";
import type { ActionId, DiseaseId, Lang, Screen, ShiftState, TestId } from "./types";

const REAL_TO_CLINIC = 0.07; // ~14s per clinic minute

type Overlay = "howTo" | "records" | "leaderboard" | "handbook" | null;

type GameState = SaveData & {
  screen: Screen;
  overlay: Overlay;
  returnScreen: Screen | null;
  hydrated: boolean;
  hasSave: boolean;
  shift: ShiftState | null;
  lastRepDelta: number;
  /** Multi-player */
  playerId: string | null;
  playerName: string | null;
  players: PlayerProfile[];
  hydrate: () => void;
  setLang: (lang: Lang) => void;
  setDifficulty: (d: import("./types").Difficulty) => void;
  persist: () => void;
  registerPlayer: (name: string) => void;
  selectPlayer: (id: string) => void;
  removePlayer: (id: string) => void;
  logoutPlayer: () => void;
  newCareer: () => void;
  continueCareer: () => void;
  openOverlay: (o: Overlay) => void;
  closeOverlay: () => void;
  openAdmin: () => void;
  closeAdmin: () => void;
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

function applySave(saved: SaveData | null) {
  if (!saved) {
    return {
      day: 1,
      reputation: 58,
      careerScore: 0,
      patientsTreated: 0,
      perfectCases: 0,
      bestShiftScore: 0,
      careerComplete: false,
      hasSave: false,
    };
  }
  return {
    ...saved,
    hasSave:
      saved.day > 1 ||
      saved.patientsTreated > 0 ||
      saved.careerScore > 0 ||
      saved.careerComplete,
  };
}

export const useGame = create<GameState>((set, get) => ({
  version: 2,
  lang: "th",
  difficulty: 2,
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
  playerId: null,
  playerName: null,
  players: [],

  hydrate: () => {
    try {
      const index = loadProfilesIndex();
      const currentId = getCurrentPlayerId();
      const profile = currentId
        ? index.players.find((p) => p.id === currentId) ?? null
        : null;
      if (!profile) {
        set({
          hydrated: true,
          hasSave: false,
          playerId: null,
          playerName: null,
          players: index.players,
          screen: "title",
          shift: null,
        });
        return;
      }
      const saved = loadPlayerSave(profile.id);
      const applied = applySave(saved);
      set({
        ...applied,
        lang: saved?.lang ?? get().lang,
        hydrated: true,
        playerId: profile.id,
        playerName: profile.name,
        players: index.players,
      });
    } catch {
      // Never leave the UI stuck on the loading spinner
      set({
        hydrated: true,
        hasSave: false,
        playerId: null,
        playerName: null,
        players: [],
        screen: "title",
        shift: null,
      });
    }
  },

  persist: () => {
    const s = get();
    if (!s.playerId) return;
    writePlayerSave(s.playerId, {
      version: 2,
      lang: s.lang,
      difficulty: s.difficulty,
      day: s.day,
      reputation: s.reputation,
      careerScore: s.careerScore,
      patientsTreated: s.patientsTreated,
      perfectCases: s.perfectCases,
      bestShiftScore: s.bestShiftScore,
      careerComplete: s.careerComplete,
    });
    touchPlayer(s.playerId);
  },

  setLang: (lang) => {
    set({ lang });
    get().persist();
  },

  setDifficulty: (d) => {
    unlockAudio();
    sfxClick();
    set({ difficulty: d });
    get().persist();
  },

  registerPlayer: (name) => {
    unlockAudio();
    sfxClick();
    const profile = createPlayer(name, get().lang);
    const saved = loadPlayerSave(profile.id);
    const applied = applySave(saved);
    const index = loadProfilesIndex();
    set({
      ...applied,
      lang: saved?.lang ?? get().lang,
      playerId: profile.id,
      playerName: profile.name,
      players: index.players,
      screen: "title",
      overlay: null,
      shift: null,
      lastRepDelta: 0,
    });
  },

  selectPlayer: (id) => {
    unlockAudio();
    sfxClick();
    const index = loadProfilesIndex();
    const profile = index.players.find((p) => p.id === id);
    if (!profile) return;
    setCurrentPlayerId(id);
    touchPlayer(id);
    const saved = loadPlayerSave(id);
    const applied = applySave(saved);
    set({
      ...applied,
      lang: saved?.lang ?? get().lang,
      playerId: profile.id,
      playerName: profile.name,
      players: index.players,
      screen: "title",
      overlay: null,
      shift: null,
      lastRepDelta: 0,
    });
  },

  removePlayer: (id) => {
    unlockAudio();
    sfxClick();
    const wasCurrent = get().playerId === id;
    deletePlayer(id);
    const index = loadProfilesIndex();
    if (wasCurrent) {
      const next = index.players[0] ?? null;
      if (next) {
        setCurrentPlayerId(next.id);
        const saved = loadPlayerSave(next.id);
        const applied = applySave(saved);
        set({
          ...applied,
          lang: saved?.lang ?? get().lang,
          playerId: next.id,
          playerName: next.name,
          players: index.players,
          screen: "title",
          overlay: null,
          shift: null,
        });
      } else {
        setCurrentPlayerId(null);
        set({
          ...applySave(null),
          playerId: null,
          playerName: null,
          players: [],
          screen: "title",
          overlay: null,
          shift: null,
          hasSave: false,
        });
      }
    } else {
      set({ players: index.players });
    }
  },

  logoutPlayer: () => {
    unlockAudio();
    sfxClick();
    get().persist();
    setCurrentPlayerId(null);
    set({
      ...applySave(null),
      playerId: null,
      playerName: null,
      players: loadProfilesIndex().players,
      screen: "title",
      overlay: null,
      shift: null,
      hasSave: false,
    });
  },

  newCareer: () => {
    unlockAudio();
    sfxClick();
    const { playerId, lang } = get();
    if (!playerId) return;
    clearPlayerSave(playerId);
    const fresh = freshSave(lang);
    writePlayerSave(playerId, fresh);
    set({
      ...fresh,
      hasSave: true,
      screen: "briefing",
      overlay: null,
      shift: null,
      lastRepDelta: 0,
    });
  },

  continueCareer: () => {
    unlockAudio();
    sfxClick();
    if (!get().playerId) return;
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
    else if (o === "leaderboard")
      set({ screen: "leaderboard", overlay: null, returnScreen: current });
    else if (o === "handbook") set({ screen: "handbook", overlay: null, returnScreen: current });
  },

  closeOverlay: () => {
    const back = get().returnScreen ?? (get().shift ? "waiting" : "title");
    set({ screen: back, returnScreen: null });
  },

  openAdmin: () => {
    unlockAudio();
    sfxClick();
    set({
      screen: "admin",
      overlay: null,
      returnScreen: get().screen === "admin" ? "title" : get().screen,
    });
  },

  closeAdmin: () => {
    sfxClick();
    set({ screen: "title", returnScreen: null, overlay: null });
  },

  startShift: () => {
    unlockAudio();
    sfxClick();
    set({
      shift: makeShift(get().day, get().difficulty),
      screen: "waiting",
      overlay: null,
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
    const sc = loadScoring();
    let rep = 0;
    const seen = unseen.filter((p) => p.debrief);
    if (seen.length === 0)
      rep = -Math.max(8, sc.repMissedPerPatient * 2) * Math.max(1, missed);
    else {
      const avg =
        seen.reduce((a, p) => {
          const g = p.debrief!.grade;
          return (
            a +
            (g === "excellent"
              ? sc.repExcellent
              : g === "good"
                ? sc.repGood
                : g === "mixed"
                  ? sc.repMixed
                  : sc.repPoor)
          );
        }, 0) / seen.length;
      rep = Math.round(avg - missed * sc.repMissedPerPatient);
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
