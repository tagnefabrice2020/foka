import { useContext } from "react";
import { ScoreContext } from "../context/TimerContext";

export const useScoreContext = () => {
  const {
      showScore,
      setShowScore
  } = useContext(ScoreContext);
  if (
    !showScore &&
    !setShowScore 
  ) {
    throw new Error("useScoreContext must be inside the ScoreProvider!");
  }
     return {
       showScore,
       setShowScore
     };
};

