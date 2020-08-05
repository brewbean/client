import React from 'react';
import Header from '../../components/Header';
import PourPlayer from '../../components/PourPlayer';
import { ReactComponent as GifPlaceholder } from './undraw_coffee_break_j3of.svg';
import { useTimer } from '../../components/Timer/useTimer';

const PourGuidePage = () => {
  const { percent, isActive, stage, stages, remainingTime, start, seconds, secondsString } = useTimer();
  const weight = 13;

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <Header />
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
          {!isActive && seconds === 0 && <button className='p-4 bg-gray-200 text-white' onClick={start}>start</button>}
          <PourPlayer
            percent={percent}
            stage={stage}
            stages={stages}
            stageRemainingTime={remainingTime}
            weight={weight}
            timeString={secondsString}
            gif={GifPlaceholder}
          />
        </div>
      </div>
    </div>
  )
}

export default PourGuidePage;