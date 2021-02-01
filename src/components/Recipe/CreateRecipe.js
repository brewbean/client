import { useState } from 'react'
import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import TextArea from 'components/TextArea'
import { useMutation } from 'urql'
import { INSERT_RECIPES_ONE } from 'queries'
import { useAuth } from 'context/AuthContext'
import { useHistory } from 'react-router-dom'

const CreateRecipe = (props) => {
  const history = useHistory()
  const { barista } = useAuth()
  const [state, setState] = useState({
    rating: '5.0',
    comment: '',
    brew_type: 'Pour Over',
    bean_weight: '',
    bean_grind: 'Extra Fine',
    water_amount: '',
    bean_id: '',
    water_temp: '',
    is_private: false,
    about: '',
    name: '',
    instructions: '',
  })
  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)

  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  const submitRecipe = async () => {
    await insertRecipe({
      object: { ...state, barista_id: barista.id },
    })
    history.push(`/recipe`)
  }

  return (
    <div>
      <div className='font-bold'>Create Recipe</div>
      <InputRow
        value={barista?.display_name}
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
      <TextArea
        value={state.instructions}
        onChange={onChangeGenerator('instructions')}
        placeholder='Enter instructions here'
        label='Brewer Instructions'
      />
      <Dropdown
        value={state.is_private}
        onChange={onChangeGenerator('is_private')}
        label='Private'
        options={['true', 'false']}
      />
      <button
        type='button'
        onClick={submitRecipe}
        className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
      >
        submit Recipe
      </button>
    </div>
  )
}

export default CreateRecipe
