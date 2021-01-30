import { useState } from 'react'
import { useMutation } from 'urql'
import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import { UPDATE_RECIPES } from 'queries'
import { useAuth } from 'context/AuthContext'
import { useHistory } from 'react-router-dom'

const EditRecipeForm = ({ recipe, id }) => {
  const [state, setState] = useState(recipe)
  const [, updateRecipe] = useMutation(UPDATE_RECIPES)
  const { barista } = useAuth()
  const history = useHistory()
  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  const submitUpdateRecipe = async () => {
    console.log('State', state)
    const { bean, date_added, __typename, ...rest } = state
    await updateRecipe({
      id,
      object: {
        ...rest,
      },
    })
    history.push(`/recipe/${id}`)
  }

  if (barista)
    return (
      <div>
        <div className='font-bold'>Edit Review</div>
        <InputRow
          value={barista.display_name}
          readOnly={true}
          placeholder='Enter Barista'
          label='Barista'
        />
        <InputRow
          value={state.name}
          onChange={onChangeGenerator('name')}
          placeholder='Enter Recipe Name'
          label='Recipe Name'
        />
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
          label='Brew Type'
        />
        <InputRow
          value={state.about}
          onChange={onChangeGenerator('about')}
          placeholder='Enter About'
          label='About'
        />
        <InputRow
          value={state.comment}
          onChange={onChangeGenerator('comment')}
          placeholder='Enter Comment'
          label='Comment'
        />
        <InputRow
          value={state.bean_weight}
          onChange={onChangeGenerator('bean_weight')}
          placeholder='Enter coffee bean weight'
          label='Coffee Bean Amount'
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
          label='Bean Grind'
        />
        {/* Serving Amount */}
        <InputRow
          value={state.water_amount}
          onChange={onChangeGenerator('water_amount')}
          placeholder='Enter water weight'
          label='Water Amount'
        />
        <InputRow
          value={state.bean_id}
          onChange={onChangeGenerator('bean_id')}
          placeholder='Enter bean type'
          label='Bean ID'
        />
        <InputRow
          value={state.water_temp}
          onChange={onChangeGenerator('water_temp')}
          placeholder='Enter water temperature'
          label='Water Temperature'
        />
        <Dropdown
          value={state.rating}
          onChange={onChangeGenerator('rating')}
          label='Rating'
          options={['1', '2', '3', '4', '5']}
        />
        <Dropdown
          value={state.is_private}
          onChange={onChangeGenerator('is_private')}
          label='Private'
          options={['true', 'false']}
        />
        <button
          type='button'
          onClick={submitUpdateRecipe}
          className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
        >
          edit review
        </button>
      </div>
    )
  return null
}

export default EditRecipeForm
