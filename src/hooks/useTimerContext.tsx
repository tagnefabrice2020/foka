import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export const useTimerContext = () => {
  const { isPaused, setPause, duration, setDuration } =
    useContext(TimerContext);
  if (!isPaused && !setPause && !duration && !setDuration) {
    throw new Error("useTimerContext must be inside the TimerProvider!");
  }
  return {
    isPaused,
    setPause,
    duration,
    setDuration
  };
};
