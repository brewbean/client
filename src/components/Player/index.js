import { useEffect, useState } from 'react'
import { timeString } from 'helper/timer'
import { ReactComponent as Play } from './play-circle.svg'

const Player = ({ stages, coffeeWeight, gif: Gif }) => {
  const [stage, setStage] = useState('')
  const [weight, setWeight] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const serve = stages.find((s) => s.name === 'serve').start

  const start = () => setIsActive(true)
  const stop = () => setIsActive(false)

  // const reset = () => {
  //   stop()
  //   setSeconds(0)
  // }

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)

      let findStage = stages.find((r) => seconds >= r.start && seconds < r.end)
      if (findStage === undefined) {
        let nextStage = stages.find((r) => r.start > seconds)
        if (nextStage !== undefined) {
          setRemainingTime(nextStage.start - seconds)
        } else {
          setRemainingTime(serve - seconds)
        }
        setStage('wait')
      } else {
        setRemainingTime(findStage.end - seconds)
        setStage(findStage.name)
        setWeight(findStage.weight)
      }

      if (seconds === serve) {
        stop()
        setStage('serve')
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds, serve, stages])

  const mmssTimeString = timeString(seconds)

  return (
    <div className='bg-white text-gray-800 rounded shadow p-4 h-full flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <h3 className='text-md font-medium tracking-wide'>coffee weight</h3>
        <h3 className='text-md font-medium tracking-wide'>{coffeeWeight}g</h3>
      </div>

      <div className='flex flex-col items-center'>
        {!isActive && mmssTimeString === ':00' ? (
          <button
            className='text-blue-500 hover:text-green-400 focus:outline-none focus:text-green-500'
            onClick={start}
          >
            <Play className='h-48 w-48 stroke-current' />
          </button>
        ) : (
          <Gif className='h-48 w-48' />
        )}
        <h3 className='text-xl font-semibold tracking-wide'>
          {mmssTimeString}
        </h3>
      </div>

      <div className='flex flex-col items-center text-blue-700'>
        <h5 className='text-lg'>water in system</h5>
        <h5 className='text-xl font-semibold'>{weight} g</h5>
      </div>

      <div className='flex flex-col items-center'>
        <h4 className='text-xl font-semibold'>{stage}</h4>
        {stage !== 'serve' && mmssTimeString !== ':00' && (
          <h5 className='text-lg'>continue for {remainingTime} seconds</h5>
        )}
      </div>
      <div>
        <div className='flex justify-between'>
          {stages.map(({ name, id }) => (
            <p
              className={(
                (name === stage ? 'font-bold' : '') + ' text-sm'
              ).trimStart()}
              key={id}
            >
              {name}
            </p>
          ))}
        </div>
        <div className='mt-4 h-1 bg-pink-200 rounded-full'>
          <div
            style={{ width: `${(seconds * 100) / serve}%` }}
            className='h-1 bg-pink-500 rounded-full relative'
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Player
