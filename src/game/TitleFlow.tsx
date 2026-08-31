import { Button } from "@/components/ui/button";
import { BookOpen, ClipboardList, Play } from "lucide-react";
import { DISEASES, DISEASE_ORDER, loc } from "./content";
import { useGame } from "./store";
import { LangToggle, PulseMark, Tx, useT } from "./ui";

export function TitleScreen() {
  const t = useT();
  const hasSave = useGame((s) => s.hasSave);
  const day = useGame((s) => s.day);
  const reputation = useGame((s) => s.reputation);
  const newCareer = useGame((s) => s.newCareer);
  const continueCareer = useGame((s) => s.continueCareer);
  const openOverlay = useGame((s) => s.openOverlay);

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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
  const day = useGame((s) => s.day);
  const reputation = useGame((s) => s.reputation);
  const careerScore = useGame((s) => s.careerScore);
  const patientsTreated = useGame((s) => s.patientsTreated);
  const perfectCases = useGame((s) => s.perfectCases);
  const bestShiftScore = useGame((s) => s.bestShiftScore);
  const rows = [
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
