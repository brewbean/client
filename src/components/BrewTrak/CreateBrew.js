import { useState } from 'react'
import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import TextArea from 'components/TextArea'
import { useMutation } from 'urql'
import { INSERT_RECIPE_ONE } from '../../queries'

const CreateBrew = () => {
  const [state, setState] = useState({
    brewType: 'Pour Over',
    beanWeight: '',
    beanGrind: 'Extra Fine',
    waterAmount: '',
    beanType: '',
    waterTemp: '',
    rating: '1',
    brewComments: ''
  })
  const [, insertRecipe] = useMutation(INSERT_RECIPE_ONE)

  const submitRecipe = async () => {
    const object = {
      barista_id: 6, //TODO: - Update with barista_id
      brew_type: state.brewType,
      bean_weight: state.beanWeight,
      bean_grind: state.beanGrind,
      water_temp: state.waterTemp,
      rating: state.rating,
      comment: state.brewComments,
      private: true, //TODO: - temp-setting
      water_amount: state.waterAmount
    }
    await insertRecipe({ object })
  }

  const onChangeGenerator = attr => e => {
    setState({
      ...state,
      [attr]: e.target.value
    })
  }

  return (
    <div>
      <Dropdown
        value={state.brewType}
        onChange={onChangeGenerator('brewType')}
        options={[
          'Pour Over',
          'Aeropress',
          'Siphon',
          'Moka Pot',
          'French Press'
        ]}
        label='brew type'
      />
      <InputRow
        value={state.beanWeight}
        onChange={onChangeGenerator('beanWeight')}
        placeholder='Enter coffee bean weight'
        label='coffee bean amount'
      />
      <Dropdown
        value={state.beanGrind}
        onChange={onChangeGenerator('beanGrind')}
        options={[
          'Extra Fine',
          'Fine',
          'Medium-fine',
          'Medium-coarse',
          'Coarse',
          'Extra coarse'
        ]}
        label='bean grind'
      />
      {/* Serving Amount */}
      <InputRow
        value={state.waterAmount}
        onChange={onChangeGenerator('waterAmount')}
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
        value={state.waterTemp}
        onChange={onChangeGenerator('waterTemp')}
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
        value={state.brewComments}
        onChange={onChangeGenerator('brewComments')}
        placeholder='Enter comments here'
        label='brewer comments'
      />
      {/* Create Instructions  */}

      {/* Next button to stage */}
      <div className='flex-none bg-white rounded shadow p-4'>
        <button
          onClick={submitRecipe}
          type='button'
          className='mt-2 w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
        >
          add recipe
        </button>
      </div>
    </div>
  )
}

export default CreateBrew
