import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { loc } from "./content";
import { useGame } from "./store";
import type { Loc } from "./types";

export function useT() {
  const lang = useGame((s) => s.lang);
  return (th: string, en: string) => (lang === "th" ? th : en);
}

export function Tx({ th, en }: Loc) {
  const lang = useGame((s) => s.lang);
  return <>{loc(lang, { th, en })}</>;
}

export function Portrait({
  index,
  alt,
  className,
}: {
  index: number;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={`/portraits/p${index}.jpg`}
      alt={alt}
      className={cn(
        "object-cover outline outline-1 -outline-offset-1 outline-foreground/10",
        className,
      )}
      draggable={false}
    />
  );
}

export function PulseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-accent", className)}
      aria-hidden="true"
    >
      <path
        d="M3 16h6l2.5-7 4 14 3-8H29"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Paper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-paper text-paper-foreground shadow-[var(--shadow-paper)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Chip({
  on,
  onClick,
  children,
  tone = "paper",
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: "paper" | "dark";
}) {
  const paper = tone === "paper";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-lg px-3 text-left text-sm leading-snug transition-opacity",
        paper &&
          (on
            ? "bg-paper-foreground text-paper"
            : "bg-background/5 text-paper-foreground shadow-[inset_0_0_0_1px_rgb(28_36_33/0.12)]"),
        !paper &&
          (on
            ? "bg-accent text-accent-foreground"
            : "bg-surface-2 text-foreground shadow-[var(--shadow-border)]"),
      )}
    >
      {children}
    </button>
  );
}

export function LangToggle() {
  const lang = useGame((s) => s.lang);
  const setLang = useGame((s) => s.setLang);
  return (
    <div className="flex rounded-lg bg-surface-2 p-1 shadow-[var(--shadow-border)]">
      <button
        type="button"
        className={cn(
          "min-h-10 rounded-md px-3 text-sm",
          lang === "th" ? "bg-accent text-accent-foreground" : "text-muted",
        )}
        onClick={() => setLang("th")}
      >
        ไทย
      </button>
      <button
        type="button"
        className={cn(
          "min-h-10 rounded-md px-3 text-sm",
          lang === "en" ? "bg-accent text-accent-foreground" : "text-muted",
        )}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}

export function formatMinutes(n: number) {
  const m = Math.max(0, n);
  const whole = Math.floor(m);
  const sec = Math.floor((m - whole) * 60);
  return `${whole}:${sec.toString().padStart(2, "0")}`;
}
