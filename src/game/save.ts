import type { Difficulty, Lang } from "./types";

export const SAVE_VERSION = 2;
const PROFILES_KEY = "ward-ncd-profiles-v1";
const CURRENT_KEY = "ward-ncd-current-v1";
const LEGACY_KEY = "ward-ncd-v1";

export type SaveData = {
  version: number;
  lang: Lang;
  /** Preferred case/diagnosis difficulty: 1 easy · 2 medium · 3 hard */
  difficulty: Difficulty;
  day: number;
  reputation: number;
  careerScore: number;
  patientsTreated: number;
  perfectCases: number;
  bestShiftScore: number;
  careerComplete: boolean;
};

export type PlayerProfile = {
  id: string;
  name: string;
  createdAt: number;
  lastPlayed: number;
};

export type ProfilesIndex = {
  version: number;
  players: PlayerProfile[];
};

const defaults: SaveData = {
  version: SAVE_VERSION,
  lang: "th",
  difficulty: 2,
  day: 1,
  reputation: 58,
  careerScore: 0,
  patientsTreated: 0,
  perfectCases: 0,
  bestShiftScore: 0,
  careerComplete: false,
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function newId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* ignore */
  }
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeDifficulty(v: unknown): Difficulty {
  const n = Number(v);
  if (n === 1 || n === 2 || n === 3) return n;
  return 2;
}

function migrate(raw: SaveData): SaveData {
  return {
    ...defaults,
    ...raw,
    difficulty: normalizeDifficulty(raw?.difficulty),
    version: SAVE_VERSION,
  };
}

function playerKey(id: string) {
  return `ward-ncd-player-${id}-v1`;
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function readProfilesRaw(): ProfilesIndex {
  if (!canUseStorage()) return { version: 1, players: [] };
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    const parsed = safeParse<ProfilesIndex>(raw);
    if (!parsed || !Array.isArray(parsed.players)) {
      return { version: 1, players: [] };
    }
    return { version: 1, players: parsed.players };
  } catch {
    return { version: 1, players: [] };
  }
}

/** Migrate single-slot legacy save into a named profile once. */
function migrateLegacyIfNeeded(): void {
  if (!canUseStorage()) return;
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return;
    const existing = readProfilesRaw();
    if (existing.players.length > 0) {
      localStorage.removeItem(LEGACY_KEY);
      return;
    }
    const parsed = safeParse<SaveData>(legacy);
    if (!parsed) {
      localStorage.removeItem(LEGACY_KEY);
      return;
    }
    const id = newId();
    const profile: PlayerProfile = {
      id,
      name: "ผู้เล่นเดิม",
      createdAt: Date.now(),
      lastPlayed: Date.now(),
    };
    writeProfilesIndex({ version: 1, players: [profile] });
    writePlayerSave(id, migrate(parsed));
    setCurrentPlayerId(id);
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* ignore */
  }
}

export function loadProfilesIndex(): ProfilesIndex {
  migrateLegacyIfNeeded();
  return readProfilesRaw();
}

export function writeProfilesIndex(index: ProfilesIndex): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(index));
  } catch {
    /* private mode / quota */
  }
}

export function getCurrentPlayerId(): string | null {
  if (!canUseStorage()) return null;
  try {
    return localStorage.getItem(CURRENT_KEY);
  } catch {
    return null;
  }
}

export function setCurrentPlayerId(id: string | null): void {
  if (!canUseStorage()) return;
  try {
    if (id) localStorage.setItem(CURRENT_KEY, id);
    else localStorage.removeItem(CURRENT_KEY);
  } catch {
    /* ignore */
  }
}

export function loadPlayerSave(playerId: string): SaveData | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(playerKey(playerId));
    if (!raw) return null;
    const parsed = safeParse<SaveData>(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return migrate(parsed);
  } catch {
    return null;
  }
}

export function writePlayerSave(playerId: string, data: SaveData): void {
  if (!canUseStorage()) return;
  try {
    const blob = JSON.stringify({ ...data, version: SAVE_VERSION });
    localStorage.setItem(playerKey(playerId), blob);
  } catch {
    /* private mode / quota */
  }
}

export function clearPlayerSave(playerId: string): void {
  if (!canUseStorage()) return;
  try {
    localStorage.removeItem(playerKey(playerId));
  } catch {
    /* ignore */
  }
}

export function freshSave(lang: Lang): SaveData {
  return { ...defaults, lang };
}

export function createPlayer(name: string, lang: Lang = "th"): PlayerProfile {
  const trimmed = name.trim().slice(0, 24);
  const id = newId();
  const profile: PlayerProfile = {
    id,
    name: trimmed || "ผู้เล่น",
    createdAt: Date.now(),
    lastPlayed: Date.now(),
  };
  const index = loadProfilesIndex();
  index.players.push(profile);
  writeProfilesIndex(index);
  writePlayerSave(id, freshSave(lang));
  setCurrentPlayerId(id);
  return profile;
}

export function touchPlayer(playerId: string): void {
  const index = loadProfilesIndex();
  const p = index.players.find((x) => x.id === playerId);
  if (!p) return;
  p.lastPlayed = Date.now();
  writeProfilesIndex(index);
}

export function deletePlayer(playerId: string): void {
  const index = loadProfilesIndex();
  index.players = index.players.filter((x) => x.id !== playerId);
  writeProfilesIndex(index);
  clearPlayerSave(playerId);
  if (getCurrentPlayerId() === playerId) {
    setCurrentPlayerId(index.players[0]?.id ?? null);
  }
}

export function renamePlayer(playerId: string, name: string): void {
  const trimmed = name.trim().slice(0, 24);
  if (!trimmed) return;
  const index = loadProfilesIndex();
  const p = index.players.find((x) => x.id === playerId);
  if (!p) return;
  p.name = trimmed;
  writeProfilesIndex(index);
}

/** @deprecated single-slot helpers kept for type compatibility during transition */
export function loadSave(): SaveData | null {
  const id = getCurrentPlayerId();
  if (!id) return null;
  return loadPlayerSave(id);
}

export function writeSave(data: SaveData): void {
  const id = getCurrentPlayerId();
  if (!id) return;
  writePlayerSave(id, data);
  touchPlayer(id);
}

export function clearSave(): void {
  const id = getCurrentPlayerId();
  if (!id) return;
  clearPlayerSave(id);
}

/**
 * Reset one player's career stats to a fresh save (keep name/profile).
 * Preserves language preference when possible.
 */
export function resetPlayerStats(playerId: string, lang: Lang = "th"): void {
  const prev = loadPlayerSave(playerId);
  writePlayerSave(playerId, freshSave(prev?.lang ?? lang));
  touchPlayer(playerId);
}

/**
 * Reset career stats for every registered player (names kept).
 * Leaderboard scores go back to zero / defaults.
 * Auto-creates a backup snapshot first.
 */
export function resetAllPlayerStats(opts?: { skipBackup?: boolean }): number {
  if (!opts?.skipBackup) createPlayerBackup("before-reset-stats");
  const index = loadProfilesIndex();
  for (const p of index.players) {
    resetPlayerStats(p.id);
  }
  return index.players.length;
}

/**
 * Delete every player profile + save + current session.
 * Full wipe of multiplayer data and leaderboard on this device.
 * Auto-creates a backup snapshot first.
 */
export function wipeAllPlayers(opts?: { skipBackup?: boolean }): number {
  if (!canUseStorage()) return 0;
  if (!opts?.skipBackup) createPlayerBackup("before-wipe");
  const index = loadProfilesIndex();
  const n = index.players.length;
  for (const p of index.players) {
    clearPlayerSave(p.id);
  }
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("ward-ncd-player-") && k.endsWith("-v1")) {
        toRemove.push(k);
      }
    }
    for (const k of toRemove) localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
  writeProfilesIndex({ version: 1, players: [] });
  setCurrentPlayerId(null);
  try {
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* ignore */
  }
  return n;
}

// ——— Backups (players + stats + leaderboard data) ———

const BACKUPS_KEY = "ward-ncd-player-backups-v1";
const MAX_BACKUPS = 10;

export type PlayerBackupEntry = {
  profile: PlayerProfile;
  save: SaveData | null;
};

export type PlayerBackup = {
  id: string;
  createdAt: number;
  label: string;
  currentPlayerId: string | null;
  players: PlayerBackupEntry[];
};

type BackupsIndex = {
  version: number;
  items: PlayerBackup[];
};

function loadBackupsIndex(): BackupsIndex {
  if (!canUseStorage()) return { version: 1, items: [] };
  try {
    const raw = localStorage.getItem(BACKUPS_KEY);
    const parsed = safeParse<BackupsIndex>(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { version: 1, items: [] };
    return { version: 1, items: parsed.items };
  } catch {
    return { version: 1, items: [] };
  }
}

function saveBackupsIndex(idx: BackupsIndex): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(BACKUPS_KEY, JSON.stringify(idx));
  } catch {
    /* quota */
  }
}

/** Snapshot all players + saves into local backup history (and return the snapshot). */
export function createPlayerBackup(label = "manual"): PlayerBackup {
  const index = loadProfilesIndex();
  const backup: PlayerBackup = {
    id: newId(),
    createdAt: Date.now(),
    label,
    currentPlayerId: getCurrentPlayerId(),
    players: index.players.map((profile) => ({
      profile: { ...profile },
      save: loadPlayerSave(profile.id),
    })),
  };
  const idx = loadBackupsIndex();
  idx.items.unshift(backup);
  idx.items = idx.items.slice(0, MAX_BACKUPS);
  saveBackupsIndex(idx);
  return backup;
}

export function listPlayerBackups(): PlayerBackup[] {
  return loadBackupsIndex().items;
}

export function deletePlayerBackup(backupId: string): void {
  const idx = loadBackupsIndex();
  idx.items = idx.items.filter((b) => b.id !== backupId);
  saveBackupsIndex(idx);
}

/** Restore a backup: replaces all current player profiles and saves. */
export function restorePlayerBackup(backupId: string): boolean {
  const idx = loadBackupsIndex();
  const backup = idx.items.find((b) => b.id === backupId);
  if (!backup) return false;

  // Snapshot current state before overwrite
  createPlayerBackup("before-restore");

  // Clear existing player saves
  const current = loadProfilesIndex();
  for (const p of current.players) clearPlayerSave(p.id);

  writeProfilesIndex({
    version: 1,
    players: backup.players.map((e) => ({ ...e.profile })),
  });
  for (const e of backup.players) {
    if (e.save) writePlayerSave(e.profile.id, migrate(e.save));
    else writePlayerSave(e.profile.id, freshSave("th"));
  }
  const stillExists = backup.players.some(
    (e) => e.profile.id === backup.currentPlayerId,
  );
  setCurrentPlayerId(stillExists ? backup.currentPlayerId : backup.players[0]?.profile.id ?? null);
  return true;
}

/** Download backup as JSON file in the browser. */
export function downloadPlayerBackup(backup: PlayerBackup): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date(backup.createdAt).toISOString().slice(0, 19).replace(/[:T]/g, "-");
  a.href = url;
  a.download = `ward-players-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Import a backup JSON object into history (does not auto-restore). */
export function importPlayerBackup(data: unknown): PlayerBackup | null {
  if (!data || typeof data !== "object") return null;
  const raw = data as Partial<PlayerBackup>;
  if (!Array.isArray(raw.players)) return null;
  const backup: PlayerBackup = {
    id: typeof raw.id === "string" ? raw.id : newId(),
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
    label: typeof raw.label === "string" ? raw.label : "imported",
    currentPlayerId:
      typeof raw.currentPlayerId === "string" ? raw.currentPlayerId : null,
    players: raw.players.map((e) => ({
      profile: e.profile,
      save: e.save ? migrate(e.save) : null,
    })),
  };
  const idx = loadBackupsIndex();
  // avoid duplicate id
  if (idx.items.some((b) => b.id === backup.id)) {
    backup.id = newId();
  }
  idx.items.unshift(backup);
  idx.items = idx.items.slice(0, MAX_BACKUPS);
  saveBackupsIndex(idx);
  return backup;
}

/** Leaderboard entry built from all local profiles. */
export type LeaderboardEntry = {
  id: string;
  name: string;
  rank: number;
  careerScore: number;
  bestShiftScore: number;
  reputation: number;
  patientsTreated: number;
  perfectCases: number;
  day: number;
  careerComplete: boolean;
  lastPlayed: number;
};

export type LeaderboardSort =
  | "careerScore"
  | "bestShiftScore"
  | "perfectCases"
  | "patientsTreated";

/**
 * Aggregate all registered players into a ranked leaderboard.
 * Primary sort: chosen metric (default careerScore).
 * Tie-breakers: bestShiftScore → perfectCases → patientsTreated → lastPlayed.
 */
export function getLeaderboard(
  sortBy: LeaderboardSort = "careerScore",
): LeaderboardEntry[] {
  const index = loadProfilesIndex();
  const rows: Omit<LeaderboardEntry, "rank">[] = index.players.map((p) => {
    const save = loadPlayerSave(p.id) ?? defaults;
    return {
      id: p.id,
      name: p.name,
      careerScore: save.careerScore,
      bestShiftScore: save.bestShiftScore,
      reputation: save.reputation,
      patientsTreated: save.patientsTreated,
      perfectCases: save.perfectCases,
      day: save.day,
      careerComplete: save.careerComplete,
      lastPlayed: p.lastPlayed,
    };
  });

  const metric = (e: Omit<LeaderboardEntry, "rank">) => {
    switch (sortBy) {
      case "bestShiftScore":
        return e.bestShiftScore;
      case "perfectCases":
        return e.perfectCases;
      case "patientsTreated":
        return e.patientsTreated;
      default:
        return e.careerScore;
    }
  };

  rows.sort((a, b) => {
    const d = metric(b) - metric(a);
    if (d !== 0) return d;
    if (b.bestShiftScore !== a.bestShiftScore) return b.bestShiftScore - a.bestShiftScore;
    if (b.perfectCases !== a.perfectCases) return b.perfectCases - a.perfectCases;
    if (b.patientsTreated !== a.patientsTreated)
      return b.patientsTreated - a.patientsTreated;
    return b.lastPlayed - a.lastPlayed;
  });

  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}
