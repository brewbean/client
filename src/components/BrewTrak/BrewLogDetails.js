import CoffeeCup from './Icons/coffee-cup.png'
import WaterDrop from './Icons/water-drop.jpg'
import Star from './Icons/star.png'
import Thermometer from './Icons/thermometer.jpg'
import SpeechBubble from './Icons/speech-bubble.png'
import { useRouteMatch, Link } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import { GET_SINGLE_BREW_LOG, DELETE_BREW_LOGS } from 'queries'
import SelectBrew from './SelectBrew'
import CoffeeNotSelected from './Icons/no-coffee-selected.jpg'

const BrewLogDetails = ({ brewLogId, brewSelected, setBrewSelected }) => {
  const { url } = useRouteMatch()
  const [, deleteBrewLog] = useMutation(DELETE_BREW_LOGS)

  const deleteBrewLogPressed = async () => {
    await deleteBrewLog({ id: brewLogId })
    setBrewSelected(false)
  }

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id: brewLogId },
  })

  if (fetching) return <p>Loading...</p>
  if (error || !data.brew_logs_by_pk) return <SelectBrew />
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
  } = data.brew_logs_by_pk

  return (
    <>
      {!brewSelected ? (
        <SelectBrew />
      ) : (
        <div className='flex'>
          <div className='flex-column px-10 mx-5 rounded-lg h-96'>
            <img
              className='w-40 h-40 pt-2'
              src={bean ? bean?.img : CoffeeNotSelected}
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
              <img
                className='w-5 h-5 mr-1'
                src={Thermometer}
                alt='Thermometer'
              />
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
              onClick={deleteBrewLogPressed}
              type='button'
              className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
            >
              delete log
            </button>
            <Link
              to={`${url}/${id}/edit`}
              className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
            >
              edit log
            </Link>
            {/* TODO - Guest cannot be allowed to make a review. Hide button for guest & route must be authenticated */}
          </div>
        </div>
      )}
    </>
  )
}

export default BrewLogDetails
