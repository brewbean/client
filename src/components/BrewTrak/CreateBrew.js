import { useState } from 'react'
import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import TextArea from 'components/TextArea'
import { useMutation } from 'urql'
import { INSERT_BREW_LOGS_ONE } from 'queries'
import { useAuth } from 'context/AuthContext'
import { useHistory } from 'react-router-dom'

const CreateBrew = () => {
  const history = useHistory()

  const [state, setState] = useState({
    brew_type: 'Pour Over',
    bean_weight: '',
    bean_grind: 'Extra Fine',
    water_amount: '',
    bean_id: '',
    water_temp: '',
    rating: '1',
    comment: '',
    is_private: true,
  })
  const [, insertBrewLog] = useMutation(INSERT_BREW_LOGS_ONE)
  const { barista } = useAuth()

  const submitBrewLog = async () => {
    const object = { ...state, barista_id: barista.id }
    await insertBrewLog({ object })
    history.push(`/brewtrak`)
  }

  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

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
        label='Brew Type'
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
        placeholder='Enter water amount'
        label='Water Amount'
      />
      <InputRow
        value={state.bean_id}
        onChange={onChangeGenerator('bean_id')}
        placeholder='Enter bean id'
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
      <TextArea
        value={state.comment}
        onChange={onChangeGenerator('comment')}
        placeholder='Enter comments here'
        label='Brewer Comments'
      />
      {/* Create Instructions  */}

      {/* Next button to stage */}
      <div className='flex-none bg-white rounded shadow p-4'>
        <button
          onClick={submitBrewLog}
          type='button'
          className='mt-2 w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
        >
          add brew log
        </button>
      </div>
    </div>
  )
}

export default CreateBrew
