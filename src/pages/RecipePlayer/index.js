import PourPlayer from 'components/RecipePlayer'
import { useEffect, useState } from 'react'
import { timeString } from 'helper/timer'
import { ReactComponent as GifPlaceholder } from './undraw_coffee_break_j3of.svg'

const recipes = [
  {
    name: 'bloom',
    weight: 40,
    startTime: 0,
    endTime: 5,
  },
  {
    name: 'first pour',
    weight: 100,
    startTime: 5,
    endTime: 10,
  },
]

const serve = 15 // 2 min 30 sec

const stages = [...recipes.map((r) => r.name), 'serve']

const RecipePlayer = () => {
  const [stage, setStage] = useState('')
  const [weight, setWeight] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const coffeeWeight = 13

  const start = () => setIsActive(true)
  const stop = () => setIsActive(false)

  const reset = () => {
    stop()
    setSeconds(0)
  }

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)

      let findStage = recipes.find(
        (r) => seconds >= r.startTime && seconds < r.endTime
      )
      if (findStage === undefined) {
        let nextStage = recipes.find((r) => r.startTime > seconds)
        if (nextStage !== undefined) {
          setRemainingTime(nextStage.startTime - seconds)
        } else {
          setRemainingTime(serve - seconds)
        }
        setStage('wait')
      } else {
        setRemainingTime(findStage.endTime - seconds)
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
  }, [isActive, seconds])

  return (
    <PourPlayer
      start={start}
      reset={reset}
      isActive={isActive}
      weight={weight}
      percent={(seconds / serve) * 100}
      stage={stage}
      stages={stages}
      remainingTime={remainingTime}
      timeString={timeString(seconds)}
      coffeeWeight={coffeeWeight}
      gif={GifPlaceholder}
    />
  )
}

export default RecipePlayer
