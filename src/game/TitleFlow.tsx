import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ClipboardList,
  LogOut,
  Play,
  Trophy,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { DISEASES, DISEASE_ORDER, loc } from "./content";
import {
  getLeaderboard,
  loadPlayerSave,
  type LeaderboardSort,
} from "./save";
import { useGame } from "./store";
import { LangToggle, PulseMark, Tx, useT } from "./ui";

export function TitleScreen() {
  const t = useT();
  const hydrated = useGame((s) => s.hydrated);
  const hasSave = useGame((s) => s.hasSave);
  const day = useGame((s) => s.day);
  const reputation = useGame((s) => s.reputation);
  const playerId = useGame((s) => s.playerId);
  const playerName = useGame((s) => s.playerName);
  const players = useGame((s) => s.players);
  const newCareer = useGame((s) => s.newCareer);
  const continueCareer = useGame((s) => s.continueCareer);
  const openOverlay = useGame((s) => s.openOverlay);
  const registerPlayer = useGame((s) => s.registerPlayer);
  const selectPlayer = useGame((s) => s.selectPlayer);
  const removePlayer = useGame((s) => s.removePlayer);
  const logoutPlayer = useGame((s) => s.logoutPlayer);

  const [nameInput, setNameInput] = useState("");
  const [mode, setMode] = useState<"menu" | "register" | "select">("menu");

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <PulseMark className="size-10 animate-pulse" />
      </div>
    );
  }

  // Not logged in — show register / select player
  if (!playerId) {
    return (
      <div className="relative min-h-dvh overflow-hidden">
        <img
          src="/art/clinic.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-10 pt-8 md:justify-center md:pb-16">
          <div className="max-w-xl ward-enter-slow">
            <div className="mb-5 flex items-center gap-3">
              <PulseMark className="size-8" />
              <span className="text-sm tracking-[0.22em] text-muted uppercase">
                NCD Clinic
              </span>
            </div>
            <h1 className="font-display text-6xl text-foreground md:text-8xl">WARD</h1>
            <p className="mt-3 max-w-md text-base text-muted md:text-lg">
              {t(
                "ลงทะเบียนชื่อแพทย์เพื่อบันทึกสถิติของตนเอง — หลายคนเล่นเครื่องเดียวกันได้",
                "Register a doctor name to keep your own stats — multiple players on one device.",
              )}
            </p>

            {mode === "menu" && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  size="lg"
                  onClick={() => setMode("register")}
                  className="min-h-12"
                >
                  <UserPlus className="size-4" />
                  {t("ลงทะเบียนชื่อใหม่", "Register new name")}
                </Button>
                {players.length > 0 && (
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => setMode("select")}
                    className="min-h-12"
                  >
                    <Users className="size-4" />
                    {t("เลือกผู้เล่นที่มี", "Select existing player")}
                  </Button>
                )}
              </div>
            )}

            {mode === "register" && (
              <form
                className="mt-8 flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const n = nameInput.trim();
                  if (!n) return;
                  registerPlayer(n);
                  setNameInput("");
                  setMode("menu");
                }}
              >
                <label className="text-sm text-muted">
                  {t("ชื่อแพทย์ / ชื่อเล่น", "Doctor / display name")}
                </label>
                <input
                  autoFocus
                  maxLength={24}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={t("เช่น พญ.สมใจ", "e.g. Dr. Somjai")}
                  className="min-h-12 rounded-lg border border-foreground/15 bg-surface-2 px-4 text-base text-foreground outline-none ring-accent focus:ring-2"
                />
                <div className="flex flex-wrap gap-2">
                  <Button type="submit" size="lg" disabled={!nameInput.trim()} className="min-h-12">
                    <UserPlus className="size-4" />
                    {t("ยืนยันและเข้าเล่น", "Confirm & enter")}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="ghost"
                    onClick={() => {
                      setMode("menu");
                      setNameInput("");
                    }}
                    className="min-h-12"
                  >
                    {t("ยกเลิก", "Cancel")}
                  </Button>
                </div>
              </form>
            )}

            {mode === "select" && (
              <div className="mt-8 space-y-3">
                <p className="text-sm text-muted">
                  {t("เลือกผู้เล่นเพื่อโหลดสถิติของคนนั้น", "Pick a player to load their stats")}
                </p>
                <ul className="space-y-2">
                  {players
                    .slice()
                    .sort((a, b) => b.lastPlayed - a.lastPlayed)
                    .map((p) => {
                      const save = loadPlayerSave(p.id);
                      return (
                        <li
                          key={p.id}
                          className="flex items-center gap-2 rounded-lg bg-surface-2/90 px-3 py-2 shadow-[var(--shadow-border)]"
                        >
                          <button
                            type="button"
                            className="min-w-0 flex-1 text-left"
                            onClick={() => {
                              selectPlayer(p.id);
                              setMode("menu");
                            }}
                          >
                            <span className="block font-medium text-foreground">{p.name}</span>
                            <span className="block text-xs text-muted">
                              {save
                                ? t(
                                    `วัน ${save.day} · ชื่อเสียง ${save.reputation} · คะแนน ${save.careerScore}`,
                                    `Day ${save.day} · Rep ${save.reputation} · Score ${save.careerScore}`,
                                  )
                                : t("ยังไม่มีสถิติ", "No stats yet")}
                            </span>
                          </button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="shrink-0 text-muted hover:text-destructive"
                            onClick={() => {
                              if (
                                window.confirm(
                                  t(
                                    `ลบผู้เล่น "${p.name}" และสถิติทั้งหมด?`,
                                    `Delete player "${p.name}" and all stats?`,
                                  ),
                                )
                              ) {
                                removePlayer(p.id);
                              }
                            }}
                            aria-label={t("ลบ", "Delete")}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </li>
                      );
                    })}
                </ul>
                <Button
                  variant="ghost"
                  onClick={() => setMode("menu")}
                  className="mt-2"
                >
                  {t("กลับ", "Back")}
                </Button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button variant="ghost" onClick={() => openOverlay("howTo")}>
                <ClipboardList className="size-4" />
                <Tx th="วิธีเล่น" en="How to play" />
              </Button>
              <Button variant="ghost" onClick={() => openOverlay("leaderboard")}>
                <Trophy className="size-4" />
                <Tx th="อันดับ" en="Leaderboard" />
              </Button>
              <LangToggle />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <img
        src="/art/clinic.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-10 pt-8 md:justify-center md:pb-16">
        <div className="max-w-xl ward-enter-slow">
          <div className="mb-5 flex items-center gap-3">
            <PulseMark className="size-8" />
            <span className="text-sm tracking-[0.22em] text-muted uppercase">
              NCD Clinic
            </span>
          </div>
          <h1 className="font-display text-6xl text-foreground md:text-8xl">WARD</h1>
          <p className="mt-3 max-w-md text-base text-muted md:text-lg">
            {t(
              "เวรคลินิกโรคไม่ติดต่อ — เรียกคนไข้ เปิดชาร์ต สั่งแล็บ วางแผนรักษา ก่อนเวลาหมด",
              "Night shift at the NCD clinic. Call patients, open the chart, order labs, sign a plan — before time runs out.",
            )}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-2/90 px-3 py-1.5 text-sm shadow-[var(--shadow-border)]">
            <span className="text-muted">{t("แพทย์", "Doctor")}:</span>
            <span className="font-medium text-foreground">{playerName}</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hasSave && reputation > 0 ? (
              <Button size="lg" onClick={continueCareer} className="min-h-12">
                <Play className="size-4" />
                {t(`ต่อเวร วันที่ ${day}`, `Continue · Day ${day}`)}
              </Button>
            ) : null}
            <Button
              size="lg"
              variant={hasSave && reputation > 0 ? "secondary" : "primary"}
              onClick={newCareer}
              className="min-h-12"
            >
              {t("เริ่มอาชีพใหม่", "New career")}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button variant="ghost" onClick={() => openOverlay("howTo")}>
              <ClipboardList className="size-4" />
              <Tx th="วิธีเล่น" en="How to play" />
            </Button>
            <Button variant="ghost" onClick={() => openOverlay("handbook")}>
              <BookOpen className="size-4" />
              <Tx th="คู่มือ NCD" en="NCD handbook" />
            </Button>
            <Button variant="ghost" onClick={() => openOverlay("records")}>
              <Tx th="สถิติ" en="Records" />
            </Button>
            <Button variant="ghost" onClick={() => openOverlay("leaderboard")}>
              <Trophy className="size-4" />
              <Tx th="อันดับ" en="Leaderboard" />
            </Button>
            <Button variant="ghost" onClick={logoutPlayer}>
              <LogOut className="size-4" />
              <Tx th="สลับผู้เล่น" en="Switch player" />
            </Button>
            <LangToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowToScreen() {
  const t = useT();
  const close = useGame((s) => s.closeOverlay);
  const steps = [
    {
      n: "01",
      th: "เรียกคนไข้จากห้องรอ — คนที่มี urgency สูงอาจแย่ถ้าปล่อยทิ้ง",
      en: "Call from the waiting room. High-urgency patients cost you if they wait out the clock.",
    },
    {
      n: "02",
      th: "อ่านประวัติและสัญญาณชีพ แล้วสั่งแล็บเท่าที่คุ้มกับเวลา",
      en: "Read history and vitals. Order labs only when they earn the minutes they cost.",
    },
    {
      n: "03",
      th: "เลือกวินิจฉัยและแผน: ยา ปรับชีวิต ส่งต่อ — อย่ารักษาเกินและอย่าพลาดโรคหลัก",
      en: "Pick diagnoses and a plan: meds, lifestyle, referral. Do not over-treat. Do not miss the core disease.",
    },
    {
      n: "04",
      th: "ลงนามแล้วรับเดอบรีฟ ชื่อเสียงตกถ้าพลาดเคสหรือปล่อยคนไข้ไม่ทัน",
      en: "Sign off, take the debrief. Reputation falls if you miss the case or leave patients unseen.",
    },
  ];
  return (
    <InfoShell title={t("วิธีเล่น", "How to play")} onBack={close}>
      <p className="text-muted">
        {t(
          "เกมจำลองคลินิก NCD เพื่อฝึกตัดสินใจ ไม่ใช่คำแนะนำทางการแพทย์",
          "A clinic simulation for judgment practice — not medical advice.",
        )}
      </p>
      <ol className="mt-6 space-y-4">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="font-display text-2xl text-accent">{s.n}</span>
            <p className="pt-1 text-foreground">{t(s.th, s.en)}</p>
          </li>
        ))}
      </ol>
    </InfoShell>
  );
}

export function HandbookScreen() {
  const lang = useGame((s) => s.lang);
  const t = useT();
  const close = useGame((s) => s.closeOverlay);
  return (
    <InfoShell title={t("คู่มือ NCD", "NCD handbook")} onBack={close}>
      <p className="text-muted">
        {t(
          "โปรโตคอลย่อสำหรับเวรนี้ — กดเปิดได้ทุกเมื่อจากห้องรอ",
          "Short protocols for this shift. Open anytime from the waiting room.",
        )}
      </p>
      <div className="mt-6 grid gap-3">
        {DISEASE_ORDER.map((id) => {
          const d = DISEASES[id];
          return (
            <article
              key={id}
              className="rounded-lg bg-surface-2 px-4 py-3 shadow-[var(--shadow-border)]"
            >
              <h3 className="font-sans text-base font-medium tracking-normal">
                {loc(lang, d.label)}
              </h3>
              <p className="mt-1 text-sm text-muted">{loc(lang, d.hint)}</p>
            </article>
          );
        })}
      </div>
    </InfoShell>
  );
}

export function RecordsScreen() {
  const t = useT();
  const close = useGame((s) => s.closeOverlay);
  const playerName = useGame((s) => s.playerName);
  const day = useGame((s) => s.day);
  const reputation = useGame((s) => s.reputation);
  const careerScore = useGame((s) => s.careerScore);
  const patientsTreated = useGame((s) => s.patientsTreated);
  const perfectCases = useGame((s) => s.perfectCases);
  const bestShiftScore = useGame((s) => s.bestShiftScore);
  const rows = [
    { th: "แพทย์", en: "Doctor", v: playerName ?? "—" },
    { th: "วันที่อาชีพ", en: "Career day", v: String(day) },
    { th: "ชื่อเสียง", en: "Reputation", v: String(reputation) },
    { th: "คะแนนรวม", en: "Career score", v: String(careerScore) },
    { th: "คนไข้ที่รักษา", en: "Patients treated", v: String(patientsTreated) },
    { th: "เคสสมบูรณ์", en: "Clean cases", v: String(perfectCases) },
    { th: "เวรที่ดีที่สุด", en: "Best shift", v: String(bestShiftScore) },
  ];
  return (
    <InfoShell title={t("สถิติคลินิก", "Clinic records")} onBack={close}>
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map((r) => (
          <div
            key={r.en}
            className="rounded-lg bg-surface-2 px-4 py-3 shadow-[var(--shadow-border)]"
          >
            <dt className="text-sm text-muted">{t(r.th, r.en)}</dt>
            <dd className="mt-1 font-display text-3xl tabular">{r.v}</dd>
          </div>
        ))}
      </dl>
    </InfoShell>
  );
}

const SORT_OPTIONS: { id: LeaderboardSort; th: string; en: string }[] = [
  { id: "careerScore", th: "คะแนนรวม", en: "Career score" },
  { id: "bestShiftScore", th: "เวรที่ดีที่สุด", en: "Best shift" },
  { id: "perfectCases", th: "เคสสมบูรณ์", en: "Clean cases" },
  { id: "patientsTreated", th: "คนไข้ที่รักษา", en: "Patients treated" },
];

function rankBadge(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return String(rank);
}

export function LeaderboardScreen() {
  const t = useT();
  const close = useGame((s) => s.closeOverlay);
  const playerId = useGame((s) => s.playerId);
  const [sortBy, setSortBy] = useState<LeaderboardSort>("careerScore");

  // Recompute when sort changes; also when screen opens (players may have updated)
  const board = useMemo(() => getLeaderboard(sortBy), [sortBy]);

  const metricLabel = (id: LeaderboardSort) => {
    const o = SORT_OPTIONS.find((x) => x.id === id)!;
    return t(o.th, o.en);
  };

  const metricValue = (e: (typeof board)[number]) => {
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

  return (
    <InfoShell title={t("อันดับคลินิก", "Clinic leaderboard")} onBack={close}>
      <p className="text-muted">
        {t(
          "จัดอันดับจากสถิติของผู้เล่นทุกคนบนเครื่องนี้ — เรียงตามตัวชี้วัดที่เลือก",
          "Ranks every registered player on this device by the selected metric.",
        )}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {SORT_OPTIONS.map((o) => (
          <Button
            key={o.id}
            size="sm"
            variant={sortBy === o.id ? "primary" : "secondary"}
            onClick={() => setSortBy(o.id)}
          >
            {t(o.th, o.en)}
          </Button>
        ))}
      </div>

      {board.length === 0 ? (
        <p className="mt-8 text-muted">
          {t(
            "ยังไม่มีผู้เล่น — ลงทะเบียนชื่อแล้วเริ่มเวรเพื่อขึ้นอันดับ",
            "No players yet — register a name and play a shift to appear here.",
          )}
        </p>
      ) : (
        <ol className="mt-6 space-y-2">
          {board.map((e) => {
            const isYou = e.id === playerId;
            return (
              <li
                key={e.id}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 shadow-[var(--shadow-border)] ${
                  isYou ? "bg-accent/15 ring-1 ring-accent/40" : "bg-surface-2"
                }`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center font-display text-xl tabular ${
                    e.rank <= 3 ? "text-accent" : "text-muted"
                  }`}
                  aria-label={t(`อันดับ ${e.rank}`, `Rank ${e.rank}`)}
                >
                  {rankBadge(e.rank)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="truncate font-medium text-foreground">
                      {e.name}
                    </span>
                    {isYou ? (
                      <span className="text-xs text-accent">
                        {t("คุณ", "You")}
                      </span>
                    ) : null}
                    {e.careerComplete ? (
                      <span className="text-xs text-muted">
                        {t("จบอาชีพ", "Career done")}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    {t(
                      `วัน ${e.day} · ชื่อเสียง ${e.reputation} · เคสสมบูรณ์ ${e.perfectCases}`,
                      `Day ${e.day} · Rep ${e.reputation} · Clean ${e.perfectCases}`,
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-display text-2xl tabular text-foreground">
                    {metricValue(e)}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted">
                    {metricLabel(sortBy)}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </InfoShell>
  );
}

function InfoShell({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  const t = useT();
  return (
    <div className="min-h-dvh bg-background px-5 py-8">
      <div className="mx-auto max-w-2xl ward-enter">
        <Button variant="ghost" onClick={onBack} className="mb-6 px-0">
          {t("กลับ", "Back")}
        </Button>
        <h1 className="text-4xl md:text-5xl">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
