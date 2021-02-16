import { SelectAction, TimeInput, WeightInput } from './Input'
import { XCircle } from 'components/Icon'

const Row = ({
  number,
  isFirst,
  stage,
  setStage,
  min,
  minWeight,
  onRemove,
}) => {
  const onChange = ({ target }) => {
    const { name, type, value } = target
    let newValue = type === 'number' && value !== '' ? parseInt(value) : value

    setStage(
      stage.action === 'serve' && name === 'start'
        ? {
            ...stage,
            start: newValue,
            end: newValue,
          }
        : {
            ...stage,
            [name]: newValue,
          }
    )
  }

  return (
    <>
      <div className='flex flex-wrap space-x-4 space-y-2 items-end'>
        <h1 className='w-full mt-2 sm:mt-0 sm:w-auto mb-2 mr-2 text-gray-700 font-bold'>
          {number}
        </h1>

        <SelectAction
          label='Action'
          name='action'
          value={stage.action}
          disabled={isFirst}
          onChange={onChange}
        />
        <TimeInput
          label='Start Time'
          name='start'
          min={min}
          value={stage.start}
          disabled={isFirst}
          onChange={onChange}
        />
        <TimeInput
          label='End Time'
          name='end'
          min={stage.start}
          value={stage.end}
          disabled={stage.action === 'serve'}
          onChange={onChange}
        />
        <WeightInput
          label='Weight'
          name='weight'
          min={minWeight}
          value={stage.weight}
          disabled={stage.action === 'serve'}
          onChange={onChange}
        />
        {!isFirst && (
          <div className='pb-2'>
            <button
              onClick={onRemove}
              className='text-red-600 hover:text-red-700 focus:outline-none rounded-full focus:ring-2 focus:ring-red-500 focus:ring-opacity-75'
            >
              <XCircle className='h-5 w-5' />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Row
