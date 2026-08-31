import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, BookOpen, Clock3 } from "lucide-react";
import { getCase, minutesForDay } from "./engine";
import { loc } from "./content";
import { useGame } from "./store";
import { formatMinutes, LangToggle, Portrait, PulseMark, useT } from "./ui";

export function Hud({ onHandbook }: { onHandbook?: () => void }) {
  const t = useT();
  const day = useGame((s) => s.day);
  const reputation = useGame((s) => s.reputation);
  const shift = useGame((s) => s.shift);
  const low = (shift?.minutesLeft ?? 0) < 8;
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <PulseMark className="size-5" />
          <span className="font-display text-xl leading-none">WARD</span>
        </div>
        <span className="text-sm text-muted">
          {t(`วันที่ ${day}`, `Day ${day}`)}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-3 text-sm">
          {shift ? (
            <span
              className={cn(
                "flex items-center gap-1.5 tabular",
                low ? "text-danger" : "text-foreground",
              )}
            >
              <Clock3 className="size-4" />
              {formatMinutes(shift.minutesLeft)}
            </span>
          ) : null}
          <span className="tabular text-muted">
            {t("ชื่อเสียง", "Rep")}{" "}
            <span className="text-foreground">{reputation}</span>
          </span>
          {shift ? (
            <span className="tabular text-muted">
              {t("คะแนน", "Score")}{" "}
              <span className="text-foreground">{shift.score}</span>
            </span>
          ) : null}
          {onHandbook ? (
            <button
              type="button"
              onClick={onHandbook}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-muted hover:text-foreground"
            >
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">{t("คู่มือ", "Handbook")}</span>
            </button>
          ) : null}
          <LangToggle />
        </div>
      </div>
    </header>
  );
}

export function BriefingScreen() {
  const t = useT();
  const day = useGame((s) => s.day);
  const reputation = useGame((s) => s.reputation);
  const difficulty = useGame((s) => s.difficulty);
  const setDifficulty = useGame((s) => s.setDifficulty);
  const startShift = useGame((s) => s.startShift);
  const toTitle = useGame((s) => s.toTitle);
  const n = day <= 8 ? [3, 4, 4, 5, 5, 6, 6, 6][day - 1] : 6;
  const diffLabel =
    difficulty === 1
      ? t("ง่าย", "Easy")
      : difficulty === 2
        ? t("ปานกลาง", "Medium")
        : t("ยาก", "Hard");
  return (
    <div className="min-h-dvh bg-background">
      <Hud />
      <main className="mx-auto max-w-xl px-5 py-12 ward-enter">
        <p className="text-sm tracking-[0.18em] text-muted uppercase">
          {t("เวรเย็น", "Evening shift")}
        </p>
        <h1 className="mt-2 text-5xl">{t(`วันที่ ${day}`, `Day ${day}`)}</h1>
        <p className="mt-4 text-muted">
          {t(
            `${n} คนไข้ · ${minutesForDay(day)} นาทีคลินิก · ชื่อเสียง ${reputation} · ${diffLabel}`,
            `${n} patients · ${minutesForDay(day)} clinic minutes · reputation ${reputation} · ${diffLabel}`,
          )}
        </p>

        <div className="mt-6">
          <p className="mb-2 text-sm text-muted">
            {t("ระดับความยาก (เคส + ตัวเลือกวินิจฉัย)", "Difficulty (cases + diagnosis options)")}
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { d: 1 as const, th: "ง่าย", en: "Easy" },
                { d: 2 as const, th: "ปานกลาง", en: "Medium" },
                { d: 3 as const, th: "ยาก", en: "Hard" },
              ] as const
            ).map((x) => (
              <Button
                key={x.d}
                size="sm"
                variant={difficulty === x.d ? "primary" : "secondary"}
                onClick={() => setDifficulty(x.d)}
              >
                {t(x.th, x.en)}
              </Button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            {difficulty === 1
              ? t(
                  "เคสง่าย · ตัวเลือกวินิจฉัยน้อย",
                  "Easier cases · fewer diagnosis choices",
                )
              : difficulty === 2
                ? t(
                    "เคสปานกลาง · ตัวเลือกวินิจฉัยปานกลาง",
                    "Mixed cases · moderate diagnosis choices",
                  )
                : t(
                    "เคสยากครบ · ตัวเลือกวินิจฉัยทั้งหมด",
                    "Hardest cases · full diagnosis list",
                  )}
          </p>
        </div>

        <ul className="mt-8 space-y-3 text-foreground">
          <li>{t("เรียกคนไข้ตามความเร่งด่วน", "Call patients by urgency.")}</li>
          <li>{t("แล็บกินเวลา — สั่งเท่าที่เปลี่ยนแผน", "Labs cost time. Order only what changes the plan.")}</li>
          <li>{t("NCD ต้องการยาและคำปรึกษาชีวิต", "NCDs need medicines and lifestyle counseling.")}</li>
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={startShift}>
            {t("เปิดคลินิก", "Open clinic")}
          </Button>
          <Button variant="ghost" onClick={toTitle}>
            {t("กลับหน้าหลัก", "Title")}
          </Button>
        </div>
      </main>
    </div>
  );
}

export function WaitingRoom() {
  const lang = useGame((s) => s.lang);
  const t = useT();
  const shift = useGame((s) => s.shift);
  const openPatient = useGame((s) => s.openPatient);
  const closeClinic = useGame((s) => s.closeClinic);
  const openOverlay = useGame((s) => s.openOverlay);
  const [confirmClose, setConfirmClose] = useState(false);
  if (!shift) return null;
  const waiting = shift.patients.filter((p) => !p.seen && !p.missed);
  const done = shift.patients.filter((p) => p.seen);

  return (
    <div className="min-h-dvh bg-background">
      <Hud onHandbook={() => openOverlay("handbook")} />
      <main className="mx-auto max-w-3xl px-4 py-6 md:py-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl">{t("ห้องรอ", "Waiting room")}</h1>
            <p className="mt-1 text-sm text-muted">
              {t(
                `${waiting.length} คนรอ · เลือกตาม urgency`,
                `${waiting.length} waiting · pick by urgency`,
              )}
            </p>
          </div>
          <Button
            variant={confirmClose ? "danger" : "ghost"}
            onClick={() => {
              if (waiting.length > 0 && !confirmClose) {
                setConfirmClose(true);
                return;
              }
              closeClinic();
            }}
          >
            {confirmClose
              ? t("ยืนยันปิด — คนไข้ยังรอ", "Confirm close — patients waiting")
              : t("ปิดคลินิก", "Close clinic")}
          </Button>
        </div>

        <div className="space-y-3">
          {waiting.map((p, i) => {
            const c = getCase(p.caseId);
            const urgent = c.urgency === 3;
            return (
              <button
                key={p.instanceId}
                type="button"
                onClick={() => openPatient(p.instanceId)}
                className={cn(
                  "ward-enter flex w-full items-stretch gap-0 overflow-hidden rounded-xl bg-surface text-left shadow-[var(--shadow-border)]",
                  urgent && "ring-1 ring-danger/50",
                )}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Portrait
                  index={c.portrait}
                  alt=""
                  className="h-28 w-24 shrink-0 sm:h-32 sm:w-28"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{loc(lang, c.name)}</span>
                    <span className="text-sm text-muted">
                      {c.age}
                      {t(
                        c.sex === "m" ? " ปี ชาย" : " ปี หญิง",
                        c.sex === "m" ? " y M" : " y F",
                      )}
                    </span>
                    <UrgencyBadge n={c.urgency} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {loc(lang, c.complaint)}
                  </p>
                  <p className="mt-2 text-xs tabular text-subtle">
                    {t("รอ", "Wait")} {formatMinutes(p.wait)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {waiting.length === 0 ? (
          <p className="mt-8 text-muted">{t("ห้องรอว่าง", "The waiting room is empty.")}</p>
        ) : null}

        {done.length > 0 ? (
          <p className="mt-8 text-sm text-subtle">
            {t(`ตรวจแล้ว ${done.length} คน`, `${done.length} seen`)}
          </p>
        ) : null}
      </main>
    </div>
  );
}

function UrgencyBadge({ n }: { n: 1 | 2 | 3 }) {
  const t = useT();
  const label =
    n === 3
      ? t("เร่งด่วน", "Urgent")
      : n === 2
        ? t("ปานกลาง", "Moderate")
        : t("ปกติ", "Routine");
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs",
        n === 3 && "bg-danger/15 text-danger",
        n === 2 && "bg-warn/15 text-warn",
        n === 1 && "bg-foreground/8 text-muted",
      )}
    >
      {n === 3 ? <AlertTriangle className="mr-1 inline size-3" /> : null}
      {label}
    </span>
  );
}

export function ShiftEndScreen({ win = false }: { win?: boolean }) {
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

  return (
    <div className="min-h-dvh bg-background">
      <Hud />
      <main className="mx-auto max-w-xl px-5 py-12 ward-enter">
        <p className="text-sm tracking-[0.18em] text-muted uppercase">
          {win ? t("จบ 8 เวร", "Eight shifts") : t("ปิดคลินิก", "Clinic closed")}
        </p>
        <h1 className="mt-2 text-5xl">
          {win
            ? t("หัวหน้าคลินิก", "Attending")
            : t(`สรุปวันที่ ${day}`, `Day ${day} report`)}
        </h1>
        {win ? (
          <p className="mt-4 text-muted">
            {t(
              "คุณพาคลินิก NCD ผ่านแปดเวร เล่นต่อได้ไม่จำกัด",
              "You took the NCD clinic through eight shifts. Endless days are open.",
            )}
          </p>
        ) : null}

        <dl className="mt-8 grid grid-cols-2 gap-3">
          <Stat k={t("คะแนนเวร", "Shift score")} v={shift.score} />
          <Stat
            k={t("ชื่อเสียง", "Reputation")}
            v={`${reputation} (${lastRepDelta >= 0 ? "+" : ""}${lastRepDelta})`}
          />
          <Stat k={t("ตรวจแล้ว", "Seen")} v={seen} />
          <Stat k={t("พลาดคิว", "Unseen")} v={missed} />
          <Stat k={t("เคสสมบูรณ์", "Clean")} v={perfect} />
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={nextDay}>
            {t("เวรถัดไป", "Next shift")}
          </Button>
          <Button variant="secondary" onClick={toTitle}>
            {t("หน้าหลัก", "Title")}
          </Button>
        </div>
      </main>
    </div>
  );
}

export function GameOverScreen() {
  const t = useT();
  const careerScore = useGame((s) => s.careerScore);
  const patientsTreated = useGame((s) => s.patientsTreated);
  const newCareer = useGame((s) => s.newCareer);
  const toTitle = useGame((s) => s.toTitle);
  return (
    <div className="min-h-dvh bg-background">
      <Hud />
      <main className="mx-auto max-w-xl px-5 py-12 ward-enter">
        <h1 className="text-5xl">{t("คลินิกปิด", "Clinic closed")}</h1>
        <p className="mt-4 text-muted">
          {t(
            "ชื่อเสียงหมด ชุมชนไม่ไว้ใจเวรนี้แล้ว",
            "Reputation hit zero. The community will not trust this shift.",
          )}
        </p>
        <p className="mt-6 tabular text-foreground">
          {t("คะแนนอาชีพ", "Career score")} {careerScore} · {t("คนไข้", "patients")}{" "}
          {patientsTreated}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={newCareer}>
            {t("เริ่มใหม่", "Start over")}
          </Button>
          <Button variant="ghost" onClick={toTitle}>
            {t("หน้าหลัก", "Title")}
          </Button>
        </div>
      </main>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
      <div className="text-sm text-muted">{k}</div>
      <div className="mt-1 font-display text-3xl tabular">{v}</div>
    </div>
  );
}
