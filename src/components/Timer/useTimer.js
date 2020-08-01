import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  }

  const timeString = (seconds) => {
    let min = '';
    let sec = '';
    if (seconds >= 60) {
      let minInt = Math.floor(seconds / 60)
      min = minInt + '';
      seconds -= minInt * 60;
    }
    if (seconds < 10) {
      sec = `0${seconds}`;
    } else {
      sec = seconds + '';
    }
    return `${min}:${sec}`;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return {
    start,
    stop,
    reset,
    seconds,
    secondsString: timeString(seconds),
  }
}