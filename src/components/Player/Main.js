import { timeString } from 'helper/timer'
import { ReactComponent as Gif } from './undraw_coffee_break_j3of.svg'
import { Play, Pause, Refresh } from 'components/Icon'
import { ButtonLeftIcon } from 'components/Button'

const Main = ({
  isFinished,
  stop,
  reset,
  start,
  coffeeWeight,
  isActive,
  seconds,
  stage,
  weight,
  remainingTime,
  totalTime,
}) => (
  <div className='lg:col-start-1 lg:col-span-3 bg-white text-gray-800 rounded shadow p-4'>
    {!isActive && seconds === 0 ? (
      <div className='flex flex-col items-center'>
        <h2 className='text-xl font-bold tracking-wide'>Recipe Details</h2>

        <h4 className='text-md font-medium'>Coffee weight: {coffeeWeight}g</h4>
        <h4 className='text-md font-medium'>
          Total time: {timeString(totalTime)}
        </h4>
        <ButtonLeftIcon icon={Play} onClick={start} size='med'>
          Play
        </ButtonLeftIcon>
      </div>
    ) : (
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-semibold'>{stage}</h2>
        {stage !== 'serve' && seconds !== 0 && (
          <h3 className='text-lg'>continue for {remainingTime} seconds</h3>
        )}

        {!isFinished && (
          <div className='flex flex-col items-center text-blue-700'>
            <h5 className='text-lg'>Target Weight</h5>
            <h5 className='text-xl font-semibold'>{weight} g</h5>
          </div>
        )}
        <Gif className='h-48 w-48' />
        <div className='space-x-2'>
          {isActive && (
            <ButtonLeftIcon
              icon={Pause}
              color='yellow'
              onClick={stop}
              size='med'
            >
              Pause
            </ButtonLeftIcon>
          )}
          {!isActive && !isFinished && (
            <ButtonLeftIcon icon={Play} onClick={start} size='med'>
              Resume
            </ButtonLeftIcon>
          )}
          {!isActive && (
            <ButtonLeftIcon
              icon={Refresh}
              color='red'
              onClick={reset}
              size='med'
            >
              Reset
            </ButtonLeftIcon>
          )}
        </div>
      </div>
    )}
  </div>
)

export default Main
