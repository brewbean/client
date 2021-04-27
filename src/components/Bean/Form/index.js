import { Link } from 'react-router-dom'
import { Section, SectionMap } from 'components/Form/Layout'
import { combineClass } from 'helper/stringHelper'
import Altitude from './Altitude'

export default function Form({ register, errors, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className='mt-2 sm:mt-0 space-y-6 sm:space-y-5'>
      {/* Header */}
      <div>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Create Bean Entry
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Follow the form to add a coffee bean information
        </p>
      </div>
      {/* Form Inputs */}
      <div className='space-y-6 sm:space-y-5'>
        <SectionMap
          title='Basics'
          subtitle='General details about this coffee bean'
          register={register}
          data={[
            {
              rowClass: 'w-full sm:w-1/2 sm:pr-2',
              label: 'Coffee Name',
              name: 'name',
              error: errors.name,
              type: 'text',
              className: combineClass('input', {
                'input--state-error': errors.name,
              }),
              placeholder: 'e.g. House Blend',
            },
            {
              rowClass: 'w-full sm:w-1/2 sm:pr-2',
              label: 'Company name',
              name: 'company_name',
              error: errors.company_name,
              type: 'text',
              className: combineClass('input', {
                'input--state-error': errors.company_name,
              }),
              placeholder: 'e.g. Hot Bean Water Co.',
            },
            {
              rowClass: 'w-full sm:w-1/2 sm:pr-2',
              name: 'region',
              label: 'Region',
              error: errors.region,
              type: 'text',
              className: combineClass('input pr-14', {
                'input--state-error': errors.region,
              }),
              placeholder: 'e.g. Salento',
            },
            {
              label: 'Where to purchase',
              name: 'purchase_info',
              type: 'textarea',
              isOptional: true,
              className: 'input',
              placeholder: 'e.g. Find on brewbean marketplace...',
              rows: '3',
            },
          ]}
        />

        <SectionMap
          title='Flavor'
          subtitle='Tell us some details about how it tastes'
          register={register}
          data={[
            {
              rowClass: 'w-full sm:w-1/2 sm:pr-2',
              name: 'roast_type',
              type: 'select',
              defaultValue: 'light',
              label: 'Roast Level',
              className: 'input',
              options: [
                { value: 'light', text: 'Light' },
                { value: 'medium', text: 'Medium' },
                { value: 'dark', text: 'Dark' },
                { value: 'very dark', text: 'Very Dark' },
              ],
            },
            {
              rowClass: 'w-full sm:w-1/2 sm:pr-2',
              name: 'profile_note',
              label: 'Profile Notes',
              error: errors.profile_note,
              type: 'text',
              className: combineClass('input pr-14', {
                'input--state-error': errors.profile_note,
              }),
              placeholder: 'e.g. Chocolate, Tamarind, Cherry',
            },
            {
              label: 'About',
              isOptional: true,
              name: 'about',
              type: 'text',
              className: 'input',
              placeholder: 'e.g. This house blend tastes like...',
            },
          ]}
        />
        <SectionMap
          title='Details'
          subtitle='Add more fine-grained information'
          sectionClass='sm:col-span-1'
          register={register}
          data={[
            {
              name: 'process',
              type: 'text',
              label: 'Process',
              isOptional: true,
              className: 'input',
              placeholder: 'e.g. Washed',
            },
            {
              name: 'varietal',
              type: 'text',
              label: 'Variety / Cultivar',
              isOptional: true,
              className: 'input',
              placeholder: 'e.g. Arabica',
            },
            {
              name: 'price',
              type: 'number',
              step: '0.01',
              label: 'Price',
              isOptional: true,
              className: 'input pr-11',
              placeholder: 'e.g. 20',
              symbol: 'USD',
            },
          ]}
        />
      </div>

      <Section title='Elevation' sectionClass='sm:col-span-1'>
        <Altitude isOptional register={register} errors={errors} />
      </Section>

      {/* Button row */}
      <div className='flex justify-end'>
        <Link
          to='/bean'
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
