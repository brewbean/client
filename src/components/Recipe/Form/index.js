import { useState } from 'react'
import { Section, SectionMap } from 'components/Form/Layout'

import { combineClass } from 'helper/stringHelper'
import { Create as CreatePlayerStages } from 'components/Player/Form'
import PlayerInfo from './PlayerInfo'
import { ExclamationCircleIcon } from '@heroicons/react/outline'

export default function Form({
  watch,
  register,
  control,
  errors,
  clearErrors,
  setValue,
  getValues,
  onSubmit,
  preload,
  onCancel,
  header,
  publicLocked,
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

  // select options always strings
  const watchIsPrivate = watch('is_private')
  const isPrivate =
    typeof watchIsPrivate === 'boolean'
      ? watchIsPrivate
      : watchIsPrivate === 'true'

  return (
    <form onSubmit={onSubmit} className='mt-2 sm:mt-0 space-y-6 sm:space-y-5'>
      {/* Header */}
      {header && (
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            {header.title}
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            {header.subtitle}
          </p>
        </div>
      )}
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
            },
            {
              label: 'About',
              isOptional: true,
              name: 'about',
              type: 'text',
              className: 'input',
              placeholder: 'e.g. Super amazing elixir!',
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
            },
            {
              name: 'bean_grind',
              type: 'select',
              defaultValue: 'medium-coarse',
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
              min: '0',
              error: errors.bean_weight,
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
              min: '0',
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
              min: '0',
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
              readOnly: publicLocked,
              label: 'Privacy',
              name: 'is_private',
              className: combineClass('input', {
                'pointer-events-none opacity-50': publicLocked,
              }),
              type: 'select',
              options: [
                { value: true, text: 'Private' },
                { value: false, text: 'Public' },
              ],
            },
          ]}
        >
          {!isPrivate && (
            <div className='mt-1 flex items-center text-yellow-600'>
              <ExclamationCircleIcon className='w-5 h-5' />
              <p className='ml-1 text-sm'>
                {publicLocked
                  ? 'Privacy is locked as public.'
                  : 'Note: once a recipe is set as public, it cannot be set back to private'}
              </p>
            </div>
          )}
        </SectionMap>
      </div>

      {/* Button row */}
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={onCancel}
          className='btn btn--md btn--white'
        >
          Cancel
        </button>
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
