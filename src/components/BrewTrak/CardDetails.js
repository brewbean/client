import { ReactComponent as CoffeePlaceHolder } from './coffee-mug.svg'
import CoffeeCup from './coffee-cup.png'
import WaterDrop from './water-drop.jpg'
import Star from './star.png'
import Thermometer from './thermometer.jpg'
import SpeechBubble from './speech-bubble.png'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import { GET_SINGLE_BREW_LOG, DELETE_RECIPE } from 'queries'

// TODO - Shorten the props
// TODO - useQuery and use id, check cache in network to see if it's re-querie
//{ img, date, beanWeight, brewType, beanGrind, waterAmount, beanType, waterTemp, bloomWaterAmount, bloomTime, rating, brewComments, brewSelected, id }
const CardDetails = ({ brewLogId }) => {
  const history = useHistory()
  let match = useRouteMatch()
  const [, deleteRecipe] = useMutation(DELETE_RECIPE)

  const deleteRecipePressed = async () => {
    await deleteRecipe({ id: brewLogId })
  }

  const [singleBrewLog] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id: brewLogId },
  })

  const { data, fetching, error } = singleBrewLog
  if (fetching) return <p>Loading...</p>
  if (error)
    return (
      <div className='flex flex-col items-center'>
        <div className='text-2xl font-semibold'>
          Select a brew to view it's details!
        </div>
        <CoffeePlaceHolder className='h-24 w-24 m-4' />
      </div>
    )
  const {
    id,
    bean,
    brew_type,
    bean_weight,
    bean_grind,
    water_amount,
    water_temp,
    rating,
    comment,
    date_added,
  } = data.recipe_by_pk

  return (
    <>
      <div className='flex'>
        <div className='flex-column px-10 mx-5 rounded-lg h-96'>
          <img
            className='w-40 h-40 pt-2'
            src={bean?.img}
            alt='No coffee available!'
          />
        </div>
        <div className='flex-column'>
          <div className='text-2xl font-medium'>{bean?.name}</div>
          <div>{date_added}</div>
          <div className='flex flex-row'>
            <img className='w-5 h-5 mr-1' src={CoffeeCup} alt='CoffeeCup' />:
            {brew_type}
          </div>
          <div className='flex flex-row'>
            <img className='w-5 h-5 mr-1' src={CoffeeCup} alt='CoffeeCup' />:
            {bean_weight}
          </div>
          <div className='flex flex-row'>
            <img className='w-5 h-5 mr-1' src={WaterDrop} alt='WaterDrop' />:
            {water_amount}
          </div>
          <div className='flex flex-row'>
            <img className='w-5 h-5 mr-1' src={CoffeeCup} alt='CoffeeCup' />:
            {bean_grind}
          </div>
          <div className='flex flex-row'>
            <img className='w-5 h-5 mr-1' src={Thermometer} alt='Thermometer' />
            :{water_temp}
          </div>
          <div className='flex flex-row'>
            <img
              className='w-5 h-5 mr-1'
              src={SpeechBubble}
              alt='SpeechBubble'
            />
            :{comment}
          </div>
          <div className='flex flex-row'>
            <img className='w-5 h-5 mr-1' src={Star} alt='Star' />:{rating}
          </div>
          <div className='flex flex-row'>ID: {id}</div>
          <button
            onClick={deleteRecipePressed}
            type='button'
            className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
          >
            delete log
          </button>
          <button
            onClick={() => history.push(`${match.url}/${id}/edit`)}
            className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
          >
            edit log
          </button>
          {/* TODO - Guest cannot be allowed to make a review. Hide button for guest & route must be authenticated */}
        </div>
      </div>
    </>
  )
}

export default CardDetails
