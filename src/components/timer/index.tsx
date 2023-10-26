import React, { useContext, useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Typography } from "@mui/material";
import { TimerContext } from "../../context/TimerContext";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";

type QuestionLengthType = {
  questionLength: number;
};

const Timer = ({ questionLength }: QuestionLengthType) => {
  const { isPaused, setPause, setDuration, duration } =
    useContext(TimerContext);

  useEffect(() => {
    let testDuration = 1.5 * questionLength;
    console.log(testDuration);
    setDuration(testDuration * 60 * 1000);
  }, []);

  useEffect(() => {
    const clearTimer = setInterval(() => {
      if (duration > 0 && !isPaused) {
        setDuration(duration - 1000);
      }
    }, 1000);
    return () => clearInterval(clearTimer);
  }, [duration, isPaused]);

  const formatTime = (milliseconds: any) => {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);

    let seconds = totalSeconds % 60;
    let minutes = totalMinutes % 60;
    let hours = totalHours % 60;

    console.log(
      `${hours} : ${("0" + minutes).slice(-2)} : ${("0" + seconds).slice(-2)}`
    );

    return `${hours} : ${("0" + minutes).slice(-2)} : ${("0" + seconds).slice(
      -2
    )}`;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", columnGap: "6px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          columnGap: "4px",
        }}
      >
        <TimelapseOutlinedIcon sx={{ fontSize: "1.25rem" }} />{" "}
        <Typography>{formatTime(duration)}</Typography>
      </div>
      {!isPaused ? (
        <PauseIcon
          sx={{ fontSize: "1.25rem", cursor: "pointer" }}
          onClick={() => setPause(true)}
        />
      ) : (
        <PlayArrowIcon
          sx={{ fontSize: "1.25rem", cursor: "pointer" }}
          onClick={() => setPause(false)}
        />
      )}
    </Box>
  );
};

export default Timer;
