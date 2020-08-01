import React from 'react'
import { useTimer } from './useTimer';
import { useHistory } from 'react-router-dom';

const Timer = props => {
  const history = useHistory();
  const { secondsString, start, stop, reset } = useTimer();

  return (
    <div className='flex flex-col items-center py-10'>
      {secondsString}
      <button className='rounded bg-blue-300 px-4 py-2 mt-2' onClick={start}>start</button>
      <button className='rounded bg-blue-300 px-4 py-2 mt-2' onClick={stop}>stop</button>
      <button className='rounded bg-blue-300 px-4 py-2 mt-2' onClick={reset}>reset</button>
      <button className='rounded bg-blue-300 px-4 py-2 mt-2' onClick={() => history.push('/test')}>change page</button>
    </div>
  )
}

export default Timer;