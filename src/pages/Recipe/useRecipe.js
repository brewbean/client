import { useState } from 'react'

const initStage = () => ({
  name: '',
  weight: 0,
  startTime: { min: 0, sec: 0 },
  endTime: { min: 0, sec: 0 },
})

export const useRecipe = () => {
  let [stages, setStages] = useState([initStage()])
  let [serveTime, setServe] = useState({ min: 0, sec: 0 })

  const addStage = () => {
    setStages([...stages, initStage()])
  }

  const setStageValue = (index) => ({ target }) => {
    setStages([
      ...stages.slice(0, index),
      {
        ...stages[index],
        [target.name]: target.value,
      },
      ...stages.slice(index + 1),
    ])
  }

  const setTime = (key, index) => ({ target }) => {
    setStages([
      ...stages.slice(0, index),
      {
        ...stages[index],
        [key]: {
          ...stages[index][key],
          [target.name]: target.value,
        },
      },
      ...stages.slice(index + 1),
    ])
  }

  const deleteStage = (index) => () => {
    setStages([...stages.slice(0, index), ...stages.slice(index + 1)])
  }

  const setServeTime = ({ target }) => {
    setServe({
      ...serveTime,
      [target.name]: target.value,
    })
  }

  return {
    data: {
      stages,
      serveTime,
    },
    handler: {
      addStage,
      setTime,
      deleteStage,
      setStageValue,
      setServeTime,
    },
  }
}
