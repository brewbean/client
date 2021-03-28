import { Link } from 'react-router-dom'
import { SectionMap } from 'components/Form/Layout'
import { combineClass } from 'helper/stringHelper'

const Form = ({ register, errors, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className='max-w-4xl mx-auto mt-2 sm:mt-0 space-y-6 sm:space-y-5'
    >
      {/* Header */}
      <div>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Create Brew Log
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Follow the form to list out recipe steps. You may also add playable
          recipe steps to use the recipe player.
        </p>
      </div>

      {/* Form Inputs */}
      <div className='space-y-6 sm:space-y-5'>
        <SectionMap
          title='Brew Log'
          subtitle='Enter Brew Log Details'
          register={register}
          data={[
            {
              name: 'title',
              type: 'text',
              error: errors?.title,
              label: 'Brew Log Title',
              isOptional: false,
              className: combineClass('input', {
                'input--state-error': errors?.title,
              }),
              placeholder: 'e.g. 10/01/2021 Brew Log',
            },
            {
              label: 'Brewer Comments',
              error: errors?.comment,
              isOptional: true,
              name: 'comment',
              type: 'textarea',
              className: combineClass('input', {
                'input--state-error': errors?.comment,
              }),
              placeholder: 'e.g. The brew had a full body taste today...',
              rows: '3',
            },
            {
              label: 'Rating',
              symbol: 'stars',
              error: errors?.rating,
              name: 'rating',
              type: 'number',
              min: 0,
              max: 5,
              isOptional: false,
              className: combineClass('input pr-14', {
                'input--state-error': errors?.rating,
              }),
              placeholder: 'e.g. 5',
            },
          ]}
        />
      </div>

      {/* Button row */}
      <div className='flex justify-end'>
        <Link
          to='/brewlog'
          className='bg-white py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Cancel
        </Link>
        <button
          type='submit'
          disabled={Object.keys(errors).length > 0}
          className={`disabled:opacity-50 disabled:pointer-events-none ml-3 btn btn--md btn--primary`}
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default Form
