import React from 'react';
import Header from '../../components/Header';
import PourPlayer from '../../components/PourPlayer';
import { ReactComponent as GifPlaceholder } from './undraw_coffee_break_j3of.svg';

const PourGuidePage = props => {
  const weight = 13;
  const timeString = ':40'
  const stage = 'first pour'
  const stageRemainingTime = 60
  const stages = ['bloom', 'first pour', 'second pour', 'serve']

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <Header />
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
          <PourPlayer 
            stage={stage}
            stages={stages}
            stageRemainingTime={stageRemainingTime}
            weight={weight}
            timeString={timeString}
            gif={GifPlaceholder}
          />
        </div>
      </div>
    </div>
  )
}

export default PourGuidePage;