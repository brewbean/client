import { timeString } from 'helper/timer'
import { ReactComponent as Gif } from './undraw_coffee_break_j3of.svg'
import { Play, Pause, Refresh, Scale, Clock } from 'components/Icon'
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
  <div className='lg:col-start-1 lg:col-span-3'>
    <div className='bg-white text-gray-800 rounded shadow p-4'>
      {!isActive && seconds === 0 ? (
        <div className='flex flex-col items-center space-y-3'>
          <h2 className='text-3xl font-extrabold text-gray-900 sm:block sm:text-4xl'>
            Recipe Details
          </h2>
          <div className='flex flex-col space-y-2'>
            <h4 className='inline-flex items-center text-md font-medium'>
              <span className='mr-2 rounded-md bg-yellow-400 p-2 text-white'>
                <Scale />
              </span>
              Coffee weight: {coffeeWeight}g
            </h4>
            <h4 className='inline-flex items-center text-md font-medium'>
              <span className='mr-2 rounded-md bg-blue-400 p-2 text-white'>
                <Clock />
              </span>
              Total time: {timeString(totalTime)}
            </h4>
          </div>
          <ButtonLeftIcon
            className='w-full lg:w-1/2 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2'
            icon={Play}
            onClick={start}
            size='med'
          >
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
  </div>
)

export default Main
