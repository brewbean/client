import { ReactComponent as CoffeePlaceHolder } from './coffee-mug.svg'
import CoffeeCup from './coffee-cup.png'
import WaterDrop from './water-drop.jpg'
import Star from './star.png'
import Thermometer from './thermometer.jpg'
import SpeechBubble from './speech-bubble.png'
const CardDetails = ({
  img,
  date,
  beanWeight,
  brewType,
  beanGrind,
  waterAmount,
  beanType,
  waterTemp,
  bloomWaterAmount,
  bloomTime,
  rating,
  brewComments,
  brewSelected,
}) => {
  return (
    <>
      <div className='flex'>
        {!brewSelected ? (
          <div className='flex flex-col items-center'>
            <div className='text-2xl font-semibold'>
              Select a brew to view it's details!
            </div>
            <CoffeePlaceHolder className='h-24 w-24 m-4' />
          </div>
        ) : (
          <>
            <div className='flex-column px-10 mx-5 rounded-lg h-96'>
              <img
                className='w-40 h-40 pt-2'
                src={img}
                alt='No coffee available!'
              />
            </div>
            <div className='flex-column'>
              <div className='text-2xl font-medium'>{beanType}</div>
              <div>{date}</div>
              <div className='flex flex-row'>
                <img className='w-5 h-5 mr-1' src={CoffeeCup} alt='CoffeeCup' />
                :{brewType}
              </div>
              <div className='flex flex-row'>
                <img className='w-5 h-5 mr-1' src={CoffeeCup} alt='CoffeeCup' />
                :{beanWeight}
              </div>
              <div className='flex flex-row'>
                <img className='w-5 h-5 mr-1' src={WaterDrop} alt='WaterDrop' />
                :{waterAmount}
              </div>
              <div className='flex flex-row'>
                <img className='w-5 h-5 mr-1' src={CoffeeCup} alt='CoffeeCup' />
                :{beanGrind}
              </div>
              <div className='flex flex-row'>
                <img
                  className='w-5 h-5 mr-1'
                  src={Thermometer}
                  alt='Thermometer'
                />
                :{waterTemp}
              </div>
              <div className='flex flex-row'>
                <img
                  className='w-5 h-5 mr-1'
                  src={SpeechBubble}
                  alt='SpeechBubble'
                />
                :{brewComments}
              </div>
              <div className='flex flex-row'>
                <img className='w-5 h-5 mr-1' src={Star} alt='Star' />:{rating}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CardDetails
