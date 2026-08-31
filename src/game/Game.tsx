import { useEffect } from "react";
import {
  BriefingScreen,
  GameOverScreen,
  ShiftEndScreen,
  WaitingRoom,
} from "./ClinicFlow";
import { ConsultScreen, DebriefScreen } from "./ConsultFlow";
import {
  HandbookScreen,
  HowToScreen,
  LeaderboardScreen,
  RecordsScreen,
  TitleScreen,
} from "./TitleFlow";
import { useGame } from "./store";

export function Game() {
  const screen = useGame((s) => s.screen);
  const hydrate = useGame((s) => s.hydrate);
  const tick = useGame((s) => s.tick);
  const persist = useGame((s) => s.persist);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      tick(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tick]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") persist();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", persist);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", persist);
    };
  }, [persist]);

  switch (screen) {
    case "title":
      return <TitleScreen />;
    case "howTo":
      return <HowToScreen />;
    case "records":
      return <RecordsScreen />;
    case "leaderboard":
      return <LeaderboardScreen />;
    case "handbook":
      return <HandbookScreen />;
    case "briefing":
      return <BriefingScreen />;
    case "waiting":
      return <WaitingRoom />;
    case "consult":
      return <ConsultScreen />;
    case "debrief":
      return <DebriefScreen />;
    case "shiftEnd":
      return <ShiftEndScreen />;
    case "careerWin":
      return <ShiftEndScreen win />;
    case "gameOver":
      return <GameOverScreen />;
    default:
      return <TitleScreen />;
  }
}
