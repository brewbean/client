import { useEffect, useState } from 'react';
import { timeString } from '../../helper/timer'

const recipes = [{
  name: 'bloom',
  weight: 40,
  startTime: 0,
  endTime: 5,
},
{
  name: 'first pour',
  weight: 100,
  startTime: 5,
  endTime: 10
},]

const serve = 15; // 2 min 30 sec 

export const useTimer = () => {
  const [stage, setStage] = useState('');
  const [remainingTime, setRemainingTime] = useState(0)
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      let findStage = recipes.find(r => seconds >= r.startTime && seconds <= r.endTime);
      if (findStage === undefined) {
        let nextStage = recipes.find(r => r.startTime > seconds);
        if (nextStage !== undefined) {
          setRemainingTime(nextStage.startTime - seconds);
        } else {
          setRemainingTime(serve - seconds);
        }
        setStage('wait')
      } else {
        setRemainingTime(findStage.endTime - seconds)
        setStage(findStage.name)
      }

      if (seconds === serve) {
        stop();
        setStage('serve');
      }



    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return {
    isActive,
    stage,
    stages: [...recipes.map(r => r.name), 'serve'],
    remainingTime,
    start,
    stop,
    reset,
    seconds,
    secondsString: timeString(seconds),
    percent: (seconds / serve) * 100
  }
}