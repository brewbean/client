import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section, SectionMap } from 'components/Form/Layout'

import { combineClass } from 'helper/stringHelper'
import { Create as CreatePlayerStages } from 'components/Player/Form'
import PlayerInfo from './PlayerInfo'

export default function Form({
  register,
  control,
  errors,
  clearErrors,
  setValue,
  getValues,
  onSubmit,
  preload,
  defaultValue,
}) {
  const [formMounted, setFormMounted] = useState(
    preload?.formMounted ? preload.formMounted : false
  )
  const [isHidden, setIsHidden] = useState(
    preload?.isHidden ? preload.isHidden : false
  )
  const [stages, setStages] = useState(preload?.stages ? preload.stages : null)
  const [serveTime, setServeTime] = useState(
    preload?.serveTime ? preload.serveTime : null
  )

  const deleteForm = () => {
    setFormMounted(false)
    setStages(null)
  }
  const cancelForm = () => {
    setValue('stages', stages)
    setValue('serve', serveTime)
    setIsHidden(true)
  }

  const saveForm = () => {
    const form = getValues()
    setStages(form.stages)
    setServeTime(form.serve)
    setIsHidden(true)
  }

  const onEdit = () => {
    setIsHidden(false)
  }

  return (
    <form
      onSubmit={onSubmit}
      className='max-w-4xl mx-auto mt-2 sm:mt-0 space-y-6 sm:space-y-5'
    >
      {/* Header */}
      <div>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Create Recipe
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Follow the form to list out recipe steps. You may also add playable
          recipe steps to use the recipe player.
        </p>
      </div>
      {/* Form Inputs */}
      <div className='space-y-6 sm:space-y-5'>
        <SectionMap
          title='Basics'
          subtitle='Tell us some details about your recipe'
          register={register}
          data={[
            {
              label: 'Recipe Name',
              error: errors.name,
              name: 'name',
              type: 'text',
              className: combineClass('input', {
                'input--state-error': errors.name,
              }),
              placeholder: 'e.g. My favorite pour over recipe',
              defaultValue: defaultValue?.name,
            },
            {
              label: 'About',
              isOptional: true,
              name: 'about',
              type: 'text',
              className: 'input',
              placeholder: 'e.g. Super amazing elixir!',
              defaultValue: defaultValue?.about,
            },
          ]}
        />

        <SectionMap
          title='Bean'
          subtitle='Add details about your coffee bean'
          register={register}
          data={[
            {
              name: 'bean_name_free',
              type: 'text',
              label: 'Bean Name',
              isOptional: true,
              className: 'input',
              placeholder: 'e.g. Kurasu House Blend Dark',
              defaultValue: defaultValue?.bean_name_free,
            },
            {
              name: 'bean_grind',
              type: 'select',
              defaultValue: defaultValue?.bean_grind
                ? defaultValue?.bean_grind
                : 'medium-coarse',
              label: 'Bean Grind',
              className: 'input',
              options: [
                { value: 'extra-fine', text: 'Extra-fine' },
                { value: 'fine', text: 'Fine' },
                { value: 'medium-fine', text: 'Medium-fine' },
                { value: 'medium-coarse', text: 'Medium-coarse' },
                { value: 'coarse', text: 'Coarse' },
                { value: 'extra-coarse', text: 'Extra-coarse' },
              ],
            },
            {
              name: 'bean_weight',
              type: 'number',
              label: 'Bean Weight',
              className: combineClass('input pr-14', {
                'input--state-error': errors.bean_weight,
              }),
              placeholder: 'e.g. 12',
              symbol: 'grams',
              error: errors.bean_weight,
              defaultValue: defaultValue?.bean_weight,
            },
          ]}
        />

        <SectionMap
          title='Tools'
          subtitle='What device should we be using?'
          register={register}
          data={[
            {
              label: 'Brewing Style',
              name: 'brew_type',
              className: 'input',
              defaultValue: 'pour over',
              type: 'select',
              options: [{ value: 'pour over', text: 'Pour over' }],
            },
            {
              label: 'Brewing device',
              isOptional: true,
              name: 'device',
              type: 'text',
              className: 'input',
              placeholder: 'e.g. Hario V60',
              defaultValue: defaultValue?.device,
            },
          ]}
        />

        <SectionMap
          title='Brewing'
          subtitle='How do we create your elixir?'
          register={register}
          data={[
            {
              label: 'Serving Amount',
              symbol: 'grams',
              error: errors.water_amount,
              name: 'water_amount',
              type: 'number',
              className: combineClass('input pr-14', {
                'input--state-error': errors.water_amount,
              }),
              placeholder: 'e.g. 200',
              defaultValue: defaultValue?.water_amount,
            },
            {
              label: 'Water Temperature',
              symbol: '\u00b0C',
              error: errors.water_temp,
              name: 'water_temp',
              type: 'number',
              className: combineClass('input pr-8', {
                'input--state-error': errors.water_temp,
              }),
              placeholder: 'e.g. 100',
              defaultValue: defaultValue?.water_temp,
            },
            {
              label: 'Brewer Instructions',
              error: errors.instructions,
              name: 'instructions',
              type: 'textarea',
              className: combineClass('input', {
                'input--state-error': errors.instructions,
              }),
              placeholder: 'e.g. Step 1: wet the filter...',
              rows: '3',
              defaultValue: defaultValue?.instructions,
            },
          ]}
        />

        <Section title='Recipe Player' subtitle='Create an interactive recipe'>
          {formMounted ? (
            <CreatePlayerStages
              {...{
                errors,
                register,
                control,
                clearErrors,
                saveForm,
                cancelForm,
                deleteForm,
                isHidden,
                canCancel: stages !== null,
              }}
            />
          ) : (
            <div className='flex justify-between'>
              <button
                onClick={() => setFormMounted(true)}
                type='button'
                className='btn btn--md btn--secondary'
              >
                Add recipe steps
              </button>
              <p className='text-xs text-gray-500 italic'>optional</p>
            </div>
          )}
          {isHidden && (
            <PlayerInfo {...{ stages, serveTime, onEdit, errors }} />
          )}
        </Section>

        <SectionMap
          title='Privacy'
          subtitle="Set your recipe's visibility"
          register={register}
          data={[
            {
              label: 'Privacy',
              name: 'is_private',
              className: 'input',
              type: 'select',
              defaultValue: false,
              options: [
                { value: false, text: 'Public' },
                { value: true, text: 'Private' },
              ],
            },
          ]}
        />
      </div>

      {/* Button row */}
      <div className='flex justify-end'>
        <Link
          to='/recipe'
          className='bg-white py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Cancel
        </Link>
        <button
          type='submit'
          disabled={
            (formMounted && !isHidden) || Object.keys(errors).length > 0
          }
          className={`disabled:opacity-50 disabled:pointer-events-none ml-3 btn btn--md btn--primary`}
        >
          Save
        </button>
      </div>
    </form>
  )
}
