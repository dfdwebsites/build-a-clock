import React, { useState, useEffect, useRef } from 'react';

function App() {
  const audioRef = useRef();

  //length in minutes
  const [breakLength, setBreakLength] = useState(0);
  const [sessionLength, setSessionLength] = useState(25);

  const [timeLeftInSecs, setTimeLeftInSecs] = useState(sessionLength * 60);

  const [alarmType, setAlarmType] = useState('session');

  // const [minsLeft, setMinsLeft] = useState(0);
  // const [secsLeft, setSecsLeft] = useState(0);

  const [timerStarted, setTimerStarted] = useState(false);

  const [timerInternal, setTimerInternal] = useState(null);

  useEffect(() => {
    setBreakLength(5);
  }, []);

  useEffect(() => {
    if (alarmType === 'session') {
      setTimeLeftInSecs(sessionLength * 60);
    } else {
      setTimeLeftInSecs(breakLength * 60);
    }
  }, [alarmType, breakLength, sessionLength]);

  useEffect(() => {
    if (timeLeftInSecs === 0 && alarmType === 'session') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      clearInterval(timerInternal);
      setTimerInternal(null);
      setAlarmType('break');
      setTimerInternal(setInterval(getTimer, 1000));
    } else if (timeLeftInSecs === 0 && alarmType === 'break') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      clearInterval(timerInternal);
      setTimerInternal(null);
      setAlarmType('session');
      setTimerInternal(setInterval(getTimer, 1000));
    }

    // const min = Math.floor(timeLeftInSecs / 60);
    // const secs = timeLeftInSecs % 60;
    // setMinsLeft(min);
    // setSecsLeft(secs);
  }, [alarmType, timeLeftInSecs, timerInternal]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTimer = () => {
    // if (alarmType === 'session') {
    //   let currentTime = timeLeftInSecs;
    //   let nextTime = currentTime - 1;

    //   if (nextTime === 0) {
    //     audioRef.current.play();
    //     setAlarmType('break');
    //   } else {
    setTimeLeftInSecs((prev) => prev - 1);
    audioRef.current.pause();
    //   // }
    // } else if (alarmType === 'break') {
    //   let currentTime = timeLeftInSecs;
    //   let nextTime = currentTime - 1;

    //   if (nextTime === 0) {
    // audioRef.current.play();
    // setAlarmType('Timer Finished');
    //   } else {
    //     setTimeLeftInSecs((prev) => prev - 1);
    //   }
    // }
  };

  const startHandler = () => {
    if (timerStarted) {
      setTimerStarted(false);
      clearInterval(timerInternal);
      setTimerInternal(null);
    } else {
      setTimerStarted(true);
      setTimerInternal(setInterval(getTimer, 1000));
    }
  };

  const getDecrement = (prev) => {
    if (prev - 1 <= 0) {
      return prev;
    } else {
      return prev - 1;
    }
  };
  const getIncrement = (prev) => {
    if (prev + 1 > 60) {
      return prev;
    } else {
      return prev + 1;
    }
  };

  const resetTimer = () => {
    setAlarmType('session');
    clearInterval(timerInternal);
    setTimerInternal(null);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeftInSecs(25 * 60);
    setTimerStarted(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };
  const clockFormat = () => {
    let min = Math.floor(timeLeftInSecs / 60);
    let secs = timeLeftInSecs - min * 60;
    min = min < 10 ? '0' + min : min;
    secs = secs < 10 ? '0' + secs : secs;
    return min + ':' + secs;
    //  minsLeft < 10 ? 0minsLeft : minsLeft :
    // secsLeft < 10 ? `0${secsLeft}` : secsLeft
  };

  return (
    <>
      <div>
        <div>
          <button
            id="break-decrement"
            onClick={() => setBreakLength(getDecrement(breakLength))}
            disabled={timerStarted}
          >
            -
          </button>
          <span id="break-label">
            Break Length
            <span id="break-length">{breakLength}</span>
          </span>
          <button
            id="break-increment"
            onClick={() => setBreakLength(getIncrement(breakLength))}
            disabled={timerStarted}
          >
            +
          </button>
        </div>
        <div>
          <button
            id="session-decrement"
            onClick={() => setSessionLength(getDecrement(sessionLength))}
            disabled={timerStarted}
          >
            -
          </button>

          <span id="session-label">
            Session Length<span id="session-length">{sessionLength}</span>
          </span>
          <button
            id="session-increment"
            onClick={() => setSessionLength(getIncrement(sessionLength))}
            disabled={timerStarted}
          >
            +
          </button>
        </div>
      </div>
      <div id="timer-label">
        {alarmType.charAt(0).toUpperCase() + alarmType.slice(1)}

        <div id="time-left">{clockFormat()} </div>
        {/* {minsLeft < 10 ? `0${minsLeft}` : minsLeft} :
          {secsLeft < 10 ? `0${secsLeft}` : secsLeft} */}

        <button id="start_stop" onClick={startHandler}>
          {timerStarted ? 'pause' : 'start'}
        </button>
        <button id="reset" onClick={resetTimer}>
          reset
        </button>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </>
  );
}

export default App;
