import { useState } from 'react'
import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import TextArea from 'components/TextArea'
import { UPDATE_RECIPE } from 'queries'
import { useMutation } from 'urql'

const EditBrewForm = ({ recipe, id }) => {
  const [, updateRecipe] = useMutation(UPDATE_RECIPE)
  const [state, setState] = useState(recipe)

  const submitUpdateRecipe = async () => {
    const { bean, date_added, __typename, ...rest } = state
    await updateRecipe({
      id,
      object: {
        ...rest,
        // bean_id: 4, // TODO: - Get bean_id from bean_name
      },
    })
  }

  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  // const onChangeBeanName = e => {
  //   setState({
  //     ...state,
  //     bean: {
  //       ...state.bean,
  //       name: e.target.value
  //     }
  //   })
  // }

  return (
    <div>
      <Dropdown
        value={state.brew_type}
        onChange={onChangeGenerator('brew_type')}
        options={[
          'Pour Over',
          'Aeropress',
          'Siphon',
          'Moka Pot',
          'French Press',
        ]}
        label='brew type'
      />
      <InputRow
        value={state.bean_weight}
        onChange={onChangeGenerator('bean_weight')}
        placeholder='Enter coffee bean weight'
        label='coffee bean amount'
      />
      <Dropdown
        value={state.bean_grind}
        onChange={onChangeGenerator('bean_grind')}
        options={[
          'Extra Fine',
          'Fine',
          'Medium-fine',
          'Medium-coarse',
          'Coarse',
          'Extra coarse',
        ]}
        label='bean grind'
      />
      {/* Serving Amount */}
      <InputRow
        value={state.water_amount}
        onChange={onChangeGenerator('water_amount')}
        placeholder='Enter water weight'
        label='water amount'
      />
      <InputRow
        value={state.beanType}
        onChange={onChangeGenerator('beanType')}
        placeholder='Enter bean type'
        label='bean type'
      />
      <InputRow
        value={state.water_temp}
        onChange={onChangeGenerator('water_temp')}
        placeholder='Enter water temperature'
        label='water temperature'
      />
      <Dropdown
        value={state.rating}
        onChange={onChangeGenerator('rating')}
        label='Rating'
        options={['1', '2', '3', '4', '5']}
      />
      <TextArea
        value={state.comment}
        onChange={onChangeGenerator('comment')}
        placeholder='Enter comments here'
        label='brewer comments'
      />
      {/* Create Instructions  */}
      {/* Next button to stage */}
      <div className='flex-none bg-white rounded shadow p-4'>
        <button
          onClick={submitUpdateRecipe}
          type='button'
          className='mt-2 w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
        >
          edit recipe
        </button>
      </div>
    </div>
  )
}

export default EditBrewForm