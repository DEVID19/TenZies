/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Watch = ({ gameRunning, gameWon }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;
    if (gameRunning && !gameWon) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (gameWon) {
      clearInterval(timer);
    } else {
      setTime(0); // Reset timer on a new game
    }

    return () => clearInterval(timer);
  }, [gameRunning, gameWon]);

  // Format the time in minutes and seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className={`${
        gameWon ? "animate-beep" : ""
      } fixed top-[20px] left-1/2 transform -translate-x-1/2 bg-red-400 text-white font-bold rounded-full w-[100px] h-[100px] flex items-center justify-center shadow-lg border-4 border-[#5035FF]`}
    >
      <div>{formatTime(time)}</div>
    </div>
  );
};

export default Watch;
