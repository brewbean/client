import { Plus } from 'components/Icon'
import { useState } from 'react'
import Row from './Row'

function StageForm({ editStages, save, onCancel, onDelete }) {
  const [isValid, setIsValid] = useState(null)
  const [stages, setStages] = useState(
    editStages !== null
      ? editStages
      : [
          {
            action: 'pour',
            start: 0,
            end: 0,
            weight: 0,
          },
        ]
  )

  const generateSetStage = (index) => (stage) => {
    if (!isValid) setIsValid(null)
    setStages([...stages.slice(0, index), stage, ...stages.slice(index + 1)])
  }

  const generateRemove = (index) => () => {
    if (!isValid) setIsValid(null)
    setStages([...stages.slice(0, index), ...stages.slice(index + 1)])
  }

  const addStage = () => {
    const lastStage = stages[stages.length - 1]
    if (!isValid) setIsValid(null)
    setStages([
      ...stages,
      {
        action: 'pour',
        start: lastStage.end,
        end: lastStage.end,
        weight: lastStage.weight,
      },
    ])
  }

  const checkStagesOK = (stages) =>
    stages.reduce((acc, curr, i) => {
      let prevStage = stages[i - 1]
      if (stages.length - 1 === i) {
        return (
          acc &&
          curr.action === 'serve' &&
          curr.start === curr.end &&
          curr.weight === prevStage.weight &&
          prevStage.weight <= curr.weight &&
          prevStage.end <= curr.start
        )
      }
      if (i === 0) {
        return (
          acc && curr.action === 'pour' && curr.end !== 0 && curr.weight !== 0
        )
      }
      return (
        acc && prevStage.weight <= curr.weight && prevStage.end <= curr.start
      )
    }, true)

  const submitStages = () => {
    const isValid = checkStagesOK(stages)
    setIsValid(isValid)
    if (isValid) {
      save(stages)
    }
  }

  return (
    <div>
      <div className='flex flex-col'>
        <div className='border-b border-gray-200 sm:border-none pb-6 sm:pb-0 mb-4'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Create a playable recipe
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Write your pour over recipe steps here
          </p>
        </div>
        <div className=' space-y-4 sm:space-y-2 divide-y sm:divide-y-0 divide-gray-200'>
          {stages.map((stage, i) => (
            <Row
              key={i}
              isFirst={i === 0}
              min={i === 0 ? 0 : stages[i - 1].start}
              minWeight={i === 0 ? 0 : stages[i - 1].weight}
              number={i + 1}
              stage={stage}
              setStage={generateSetStage(i)}
              onRemove={generateRemove(i)}
            />
          ))}
        </div>
        <div className='mt-4 self-center'>
          <button
            type='button'
            onClick={addStage}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            <Plus className='-ml-1 mr-2 h-5 w-5' />
            Add step
          </button>
        </div>
      </div>
      {isValid !== null && !isValid && (
        <div className='flex justify-start mt-2'>
          <p className='text-sm font-medium text-red-600'>
            Invalid recipe steps
          </p>
        </div>
      )}
      <div className='flex justify-start mt-2'>
        <button
          onClick={submitStages}
          type='button'
          className='inline-flex items-center px-4 py-2 border border-transparent text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Save
        </button>
        <button
          type='button'
          onClick={stages.length > 1 ? onCancel : onDelete}
          className='inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          {stages.length > 1 ? 'Cancel' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default StageForm
