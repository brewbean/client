import React from 'react';

const PourPlayer = ({ stage, stages, stageRemainingTime, weight, timeString, gif: Gif }) => {
  return (
    <div className='bg-white text-gray-800 rounded shadow p-4 h-full flex flex-col justify-between'>
      <h3 className='self-start text-3xl font-medium tracking-wide'>{weight}g</h3>

      <div className='flex flex-col items-center'>
        <Gif className='h-48 w-48' />
        <h3 className='text-3xl font-semibold tracking-wide'>{timeString}</h3>
      </div>

      <div className='flex flex-col items-center'>
        <h4 className='text-2xl font-semibold'>{stage}</h4>
        <h5 className='text-lg'>continue for {stageRemainingTime} seconds</h5>
      </div>
      <div>
        <div className='flex justify-between'>
          {
            stages.map((s, i) => <p className={`${s === stage ? 'font-bold ' : ''}text-sm`} key={i}>{s}</p>)
          }
        </div>
        <div className="mt-4 h-1 bg-gray-200 rounded-full">
          <div className="w-1/5 h-1 bg-blue-500 rounded-full relative">
          </div>
        </div>
      </div>
    </div>
  )
}

export default PourPlayer;