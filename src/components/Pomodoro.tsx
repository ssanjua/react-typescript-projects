import { useState, useEffect } from "react";
import AlarmSound from "../assets/beep.mp3";
import "../styles/Pomodoro.css";
import { DisplayState } from "../helpers/pomodoroHelper";
import TimeSetter from "./pomodoro/TimeSetter";
import Display from "./pomodoro/Display";


const Pomodoro = () => {


  const defaultBreakTime = 5 * 60;
  const defaultSessionTime = 25 * 60;
  const min = 60;
  const max = 60 * 60;
  const interval = 60;

  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  useEffect(() => {
    let timerID: number;
    if (!displayState.timerRunning) return;

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      setTimeout(() => {
        const audio = document.getElementById("beep") as HTMLAudioElement;
        audio.currentTime = 0;
        audio.play().catch((err) => console.log(err));
        setDisplayState((prev) => ({
          ...prev,
          timeType: prev.timeType === "Session" ? "Break" : "Session",
          time: prev.timeType === "Session" ? breakTime : sessionTime,
        }));
      }, 1000); // Espera 1 segundo antes de cambiar el estado
    }
  }, [displayState, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  };

  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  };

  const decrementDisplay = () => {
    setDisplayState((prev) => {
      if (prev.time > 0) {
        return { ...prev, time: prev.time - 1 };
      } else {
        return prev;
      }
    });
  };

  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <div className="clock">
      <h2>THIS IS A CLOCK FOR</h2>
      <h1>PRODUCTIVE ONES</h1>
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h4 id="session-label">Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio id="beep" src={AlarmSound} />
    </div>
  );
}


export default Pomodoro;