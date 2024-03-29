import { useEffect, useState } from 'react'
import Main from './Main'
import Timeline from './Timeline'

const Player = ({ stages, coffeeWeight }) => {
  const [stage, setStage] = useState('')
  const [weight, setWeight] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [stageIds, setStageIds] = useState(new Set(stages.map((s) => s.id)))
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const serve = stages.find((s) => s.action === 'serve').start

  const start = () => setIsActive(true)
  const stop = () => setIsActive(false)

  const reset = () => {
    stop()
    setSeconds(0)
    setStageIds(new Set(stages.map((s) => s.id)))
  }

  const isFinished = seconds === serve

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)

      let findStage = stages.find((r) => seconds >= r.start && seconds < r.end)
      if (stageIds.has(findStage?.id)) {
        const newSet = new Set(stageIds)
        newSet.delete(findStage.id)
        setStageIds(newSet)
      }
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
        setStage(findStage.action)
        setWeight(findStage.weight)
      }

      if (isFinished) {
        stop()
        setStage('serve')
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds, serve, stages, isFinished, stageIds])

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
      <Main
        step={stages.length - stageIds.size}
        isFinished={isFinished}
        start={start}
        stop={stop}
        reset={reset}
        coffeeWeight={coffeeWeight}
        isActive={isActive}
        seconds={seconds}
        stage={stage}
        weight={weight}
        remainingTime={remainingTime}
        totalTime={stages.find((s) => s.action === 'serve').end}
      />
      <Timeline stages={stages} seconds={seconds} />
    </div>
  )
}

export default Player
