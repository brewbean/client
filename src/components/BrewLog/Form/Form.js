import { SectionMap } from 'components/Form/Layout'
import { combineClass } from 'helper/stringHelper'

const Form = ({ register, errors, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className='space-y-6 sm:space-y-5'>
      {/* Form Inputs */}
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
            className: combineClass('input', {
              'input--state-error': errors?.title,
            }),
            placeholder: 'e.g. 10/01/2021 Brew Log',
          },
          {
            label: 'Brewer Comments',
            error: errors?.comment,
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
            name: 'rating',
            type: 'select',
            options: [
              { value: 5, text: '5' },
              { value: 4, text: '4' },
              { value: 3, text: '3' },
              { value: 2, text: '2' },
              { value: 1, text: '1' },
              { value: 0, text: '0' },
            ],
            className: 'input',
            defaultValue: 5,
          },
        ]}
      />

      {/* Button row */}
      <div className='flex justify-end'>
        <button onClick={onCancel} className='btn btn--md btn--white'>
          Cancel
        </button>
        <button
          type='submit'
          disabled={Object.keys(errors).length > 0}
          className='disabled:opacity-50 disabled:pointer-events-none ml-3 btn btn--md btn--primary'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default Form
