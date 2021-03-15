import { useFieldArray } from 'react-hook-form'
import Row from './Row'
import { Plus } from 'components/Icon'
import ServeRow from './ServeRow'

const Create = ({
  errors,
  register,
  control,
  clearErrors,
  saveForm,
  cancelForm,
  deleteForm,
  isHidden,
  canCancel,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stages',
  })

  return (
    <div className={isHidden ? 'hidden' : 'block'}>
      <div className='space-y-4 sm:space-y-2 divide-y sm:divide-y-0 divide-gray-200'>
        {fields.map((row, index) => (
          <Row
            key={row.id} // required to use 'id' property by react-hook-form
            name='stages'
            disabledInputs={index === 0 && { start: true }}
            onRemove={index > 0 ? () => remove(index) : undefined}
            {...{ ...row, errors, register, clearErrors, index }}
          />
        ))}
      </div>
      <ServeRow {...{ register, errors }} />
      <div className='flex justify-between mt-6'>
        <button
          type='button'
          onClick={() =>
            append({ action: 'pour', start: 0, end: 0, weight: 0 })
          }
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <Plus className='-ml-1 mr-2 h-5 w-5' />
          Add step
        </button>
        <div>
          {fields.length === 1 && canCancel && (
            <button
              type='button'
              onClick={deleteForm}
              className='inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Delete all steps
            </button>
          )}
          <button
            type='button'
            onClick={canCancel ? cancelForm : deleteForm}
            className='inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Cancel
          </button>

          <button
            onClick={saveForm}
            type='button'
            className='inline-flex items-center px-4 py-2 border border-transparent text-indigo-700 text-sm font-medium rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Create
