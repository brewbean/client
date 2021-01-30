import { useState } from 'react'
import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import TextArea from 'components/TextArea'
import { UPDATE_BREW_LOGS } from 'queries'
import { useMutation } from 'urql'
import { useHistory } from 'react-router-dom'

const EditBrewForm = ({ brewLogs, id }) => {
  const [, updateBrewLog] = useMutation(UPDATE_BREW_LOGS)
  const [state, setState] = useState(brewLogs)
  const history = useHistory()

  const submitUpdateBrewLog = async () => {
    const { bean, date_added, __typename, ...rest } = state
    await updateBrewLog({
      id,
      object: {
        ...rest,
      },
    })
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
        placeholder='Enter water weight'
        label='Water Amount'
      />
      {/* <InputRow
        value={state.beanType}
        onChange={onChangeGenerator('beanType')}
        placeholder='Enter bean type'
        label='Bean Type'
      /> */}
      <InputRow
        value={state.bean_name_free}
        onChange={onChangeGenerator('bean_name_free')}
        placeholder='Enter bean name'
        label='bean_name_free'
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
        value={state.comment}
        onChange={onChangeGenerator('comment')}
        placeholder='Enter comments here'
        label='Brewer Comments'
      />
      {/* Create Instructions  */}
      {/* Next button to stage */}
      <div className='flex-none bg-white rounded shadow p-4'>
        <button
          onClick={submitUpdateBrewLog}
          type='button'
          className='mt-2 w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
        >
          edit brew log
        </button>
      </div>
    </div>
  )
}

export default EditBrewForm
