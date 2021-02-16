import { useMutation } from 'urql'
import { useReducer } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAlert, alertType } from 'context/AlertContext'
import { UPDATE_RECIPE_WITH_STAGES } from 'queries'
import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import TextArea from 'components/TextArea'
import StageForm from 'components/StageForm'
import StageRow from 'pages/Recipe/CreateRecipe/StageRow'
import { checkSchema, convertEmptyStringToNull } from 'helper/sanitize'

const recipeType = {
  about: { isNullable: true },
  device: { isNullable: true },
  bean_name_free: { isNullable: true },
  brew_type: { isNullable: false },
  bean_weight: { isNullable: false },
  bean_grind: { isNullable: false },
  water_amount: { isNullable: false },
  water_temp: { isNullable: false },
  is_private: { isNullable: false },
  name: { isNullable: false },
  instructions: { isNullable: false },
}

/**
 * 'stages'
 * - omit 'id' so that update mutation can create new id's
 * - omit '__typename' due to metadata
 */
const setInitState = ({ stages, ...recipe }) => ({
  form: recipe,
  stages:
    stages.length > 1
      ? stages.map(({ id, __typename, ...stage }) => stage)
      : null,
  isVisible: false,
  hasIssues: false,
})

function reducer(state, [type, payload]) {
  switch (type) {
    case 'setForm':
      return {
        ...state,
        form: {
          ...state.form,
          [payload.key]: payload.value,
        },
      }
    case 'openForm':
      return { ...state, isVisible: true }
    case 'closeForm':
      return { ...state, isVisible: false }
    case 'saveStages':
      return { ...state, stages: payload }
    case 'deleteStages':
      return { ...state, stages: null }
    case 'setHasIssues':
      return { ...state, hasIssues: payload }
    default:
      return state
  }
}

function Edit({ recipe, id }) {
  const history = useHistory()

  const { addAlert, clearAlerts, hasAlerts } = useAlert()
  const [{ form, stages, isVisible, hasIssues }, dispatch] = useReducer(
    reducer,
    setInitState(recipe)
  )

  /**
   * $id: Int!
   * $recipe: recipe_set_input
   * $stages: [stage_insert_input!]!
   */
  const [, updateRecipe] = useMutation(UPDATE_RECIPE_WITH_STAGES)

  const onChangeGenerator = (attr) => ({ target }) => {
    const { value, type } = target
    if (hasIssues) {
      dispatch(['setHasIssues', false])
    }
    if (hasAlerts) {
      clearAlerts()
    }
    dispatch([
      'setForm',
      {
        key: attr,
        value: type === 'number' && value !== '' ? parseInt(value) : value,
      },
    ])
  }

  const submitRecipe = async (e) => {
    e.preventDefault()
    const normalized = convertEmptyStringToNull(form)
    const { value, errors } = checkSchema(recipeType, normalized)
    if (errors) {
      dispatch(['setHasIssues', true])
    } else {
      // use 'value' instead of 'form' because all empty strings are converted to nulls (SAFER)
      // removed 'barista_id' because I grab it from JWT 'x-hasura-barista-id' in Hasura

      const { error } = await updateRecipe({
        id,
        recipe: value,
        stages: stages ? stages.map((s) => ({ ...s, recipe_id: id })) : [], // change 'null' to empty array to add no new stages; old stages get deleted regardless
      })

      if (error) {
        addAlert({
          type: alertType.ERROR,
          header: error.message,
          close: true,
        })
      } else {
        history.push(`/recipe/${id}`, { edited: true })
      }
    }
  }

  const closeForm = () => dispatch(['closeForm'])
  const save = (stages) => {
    dispatch(['saveStages', stages])
    closeForm()
  }
  const onDelete = () => {
    dispatch(['deleteStages'])
    closeForm()
  }

  const saveDisabled = hasAlerts || hasIssues || isVisible

  return (
    <div className='max-w-4xl mx-auto mt-2 sm:mt-0'>
      <form onSubmit={submitRecipe} className='space-y-6 sm:space-y-5'>
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
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
            <div>
              <h4 className='text-md text-gray-900'>Basics</h4>
              <p className='mt-1 max-w-xs text-sm text-gray-500'>
                Tell us some details about your recipe
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
              <InputRow
                id='recipe-name'
                value={form.name}
                onChange={onChangeGenerator('name')}
                placeholder='e.g. My favorite pour over recipe'
                label='Recipe Name'
                required
              />
              <InputRow
                id='recipe-about'
                value={form.about}
                onChange={onChangeGenerator('about')}
                placeholder='e.g. Super amazing elixir!'
                label='About'
              />
            </div>
          </div>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
            <div>
              <h4 className='text-md text-gray-900'>Bean</h4>
              <p className='mt-1 max-w-xs text-sm text-gray-500'>
                Add details about your coffee bean
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
              <InputRow
                id='bean-name'
                value={form.bean_name_free}
                onChange={onChangeGenerator('bean_name_free')}
                placeholder='e.g. Kurasu House Blend Dark'
                label='Bean Name'
              />
              <InputRow
                id='bean-weight'
                type='number'
                symbol='grams'
                symbolPadding='pr-14'
                min={1}
                value={form.bean_weight}
                onChange={onChangeGenerator('bean_weight')}
                placeholder='e.g. 12'
                label='Coffee Bean Amount'
                required
              />
              <Dropdown
                id='bean-grind'
                value={form.bean_grind}
                onChange={onChangeGenerator('bean_grind')}
                options={[
                  { key: 'Extra-fine', value: 'Extra-fine' },
                  { key: 'Fine', value: 'Fine' },
                  { key: 'Medium-fine', value: 'Medium-fine' },
                  { key: 'Medium-coarse', value: 'Medium-coarse' },
                  { key: 'Coarse', value: 'Coarse' },
                  { key: 'Extra-coarse', value: 'Extra-coarse' },
                ]}
                label='Bean Grind'
                required
              />
            </div>
          </div>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
            <div>
              <h4 className='text-md text-gray-900'>Tools</h4>
              <p className='mt-1 max-w-xs text-sm text-gray-500'>
                What device should we be using?
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
              <InputRow
                id='device'
                value={form.device}
                onChange={onChangeGenerator('device')}
                placeholder='e.g. Hario V60'
                label='Brewing device'
              />
            </div>
          </div>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
            <div>
              <h4 className='text-md text-gray-900'>Brewing</h4>
              <p className='mt-1 max-w-xs text-sm text-gray-500'>
                How do we create your elixir?
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
              <InputRow
                id='serving-amount'
                type='number'
                value={form.water_amount}
                onChange={onChangeGenerator('water_amount')}
                placeholder='e.g. 200'
                min={1}
                symbol='grams'
                symbolPadding='pr-14'
                label='Serving Amount'
                required
              />
              <InputRow
                id='water-temp'
                value={form.water_temp}
                type='number'
                min={1}
                onChange={onChangeGenerator('water_temp')}
                placeholder='e.g. 100'
                symbol={'\u00b0C'}
                symbolPadding='pr-8'
                label='Water Temperature'
                required
              />
              <TextArea
                id='instructions'
                value={form.instructions}
                onChange={onChangeGenerator('instructions')}
                placeholder={'e.g. Step 1: wet the filter...'}
                label='Brewer Instructions'
                required
              />
            </div>
          </div>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
            <div>
              <h4 className='text-md text-gray-900'>Recipe Player</h4>
              <p className='mt-1 max-w-xs text-sm text-gray-500'>
                Create an interactive recipe
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
              {isVisible ? (
                <StageForm
                  isEditPage
                  editStages={stages}
                  save={save}
                  onCancel={closeForm}
                  onDelete={onDelete}
                />
              ) : stages ? (
                <StageRow
                  stages={stages}
                  onEdit={() => dispatch(['openForm'])}
                />
              ) : (
                <div className='flex justify-between'>
                  <button
                    onClick={() => dispatch(['openForm'])}
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Add recipe steps
                  </button>
                  <p className='text-xs text-gray-500 italic'>optional</p>
                </div>
              )}
            </div>
          </div>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
            <div>
              <h4 className='text-md text-gray-900'>Privacy</h4>
              <p className='mt-1 max-w-xs text-sm text-gray-500'>
                Set your recipe's visibility
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
              <Dropdown
                id='privacy'
                noLabel
                value={form.is_private}
                onChange={onChangeGenerator('is_private')}
                label='Privacy'
                required
                options={[
                  { key: 'Private', value: true },
                  { key: 'Public', value: false },
                ]}
              />
            </div>
          </div>
        </div>
        {/* Error row */}
        {hasIssues && (
          <div className='flex justify-end mt-2'>
            <p className='text-sm font-medium text-red-600'>
              Inputs cannot be empty string
            </p>
          </div>
        )}
        {/* Button row */}
        <div className='flex justify-end'>
          <Link
            to='/recipe'
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Cancel
          </Link>
          <button
            disabled={saveDisabled}
            type='submit'
            className={`disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              !saveDisabled ? 'hover:bg-blue-700' : 'cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit
