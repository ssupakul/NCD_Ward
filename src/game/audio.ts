let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  return ctx;
}

export function unlockAudio(): void {
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
}

function beep(freq: number, dur: number, gain = 0.04, type: OscillatorType = "sine") {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + dur);
}

export function sfxClick() {
  beep(420, 0.05, 0.03, "triangle");
}
export function sfxOk() {
  beep(520, 0.08, 0.04);
  setTimeout(() => beep(720, 0.1, 0.035), 70);
}
export function sfxBad() {
  beep(180, 0.16, 0.05, "square");
}
export function sfxStamp() {
  beep(240, 0.09, 0.04, "triangle");
  setTimeout(() => beep(360, 0.12, 0.03), 90);
}
