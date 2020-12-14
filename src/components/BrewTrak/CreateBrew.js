import InputRow from 'components/InputRow'
import Dropdown from 'components/DropDown'
import TextArea from 'components/TextArea'

const CreateBrew = ({
  date,
  beanWeight,
  brewType,
  beanGrind,
  waterAmount,
  beanType,
  waterTemp,
  brewComments,
  rating,
  setDate,
  setBeanWeight,
  setBrewType,
  setBeanGrind,
  setWaterAmount,
  setBeanType,
  setWaterTemp,
  setBloomWaterAmount,
  setBloomTime,
  setRating,
  setBrewComments,
  onChangeGenerator,
  submitRecipe,
}) => {
  return (
    <div>
      <Dropdown
        value={brewType}
        onChange={onChangeGenerator("brewType")}
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
        value={beanWeight}
        onChange={onChangeGenerator("beanWeight")}
        placeholder='Enter coffee bean weight'
        label='coffee bean amount'
      />
      <Dropdown
        value={beanGrind}
        onChange={onChangeGenerator("beanGrind")}
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
        value={waterAmount}
        onChange={onChangeGenerator("waterAmount")}
        placeholder='Enter water weight'
        label='water amount'
      />
      <InputRow
        value={beanType}
        onChange={onChangeGenerator("beanType")}
        placeholder='Enter bean type'
        label='bean type'
      />
      <InputRow
        value={waterTemp}
        onChange={onChangeGenerator("waterTemp")}
        placeholder='Enter water temperature'
        label='water temperature'
      />
      <Dropdown
        value={rating}
        onChange={onChangeGenerator("rating")}
        label='Rating'
        options={['1', '2', '3', '4', '5']}
      />
      <TextArea
        value={brewComments}
        onChange={onChangeGenerator("brewComments")}
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
