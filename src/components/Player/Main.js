import { timeString } from 'helper/timer'
import { Play, Pause, Refresh, Scale, Clock } from 'components/Icon'
import { ButtonLeftIcon } from 'components/Button'
import { gif } from 'image'

const Main = ({
  step,
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
}) => {
  const imgSrc =
    stage === 'serve'
      ? gif.serve
      : step === 1 && stage !== 'wait'
      ? gif.preinfusion
      : step === 2 && stage !== 'wait'
      ? gif.firstPour
      : step === 3 && stage !== 'wait'
      ? gif.secondPour
      : null
  return (
    <div className='lg:col-start-1 lg:col-span-3'>
      <div className='bg-white text-gray-800 rounded shadow p-4'>
        {!isActive && seconds === 0 ? (
          <div className='flex flex-col items-center space-y-5'>
            <h2 className='text-3xl font-extrabold text-gray-900 sm:block sm:text-4xl'>
              Recipe Details
            </h2>
            <div className='flex flex-col space-y-2'>
              <h4 className='inline-flex items-center text-md font-medium'>
                <span className='mr-2 rounded-md bg-yellow-400 p-2 text-white'>
                  <Scale />
                </span>
                Coffee weight {String.fromCharCode(8212)}
                <span className='ml-1 font-bold'>{coffeeWeight}g</span>
              </h4>
              <h4 className='inline-flex items-center text-md font-medium'>
                <span className='mr-2 rounded-md bg-blue-400 p-2 text-white'>
                  <Clock />
                </span>
                Total time {String.fromCharCode(8212)}
                <span className='ml-1 font-bold'>{timeString(totalTime)}</span>
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

            {imgSrc && (
              <div className='mt-4'>
                <img
                  src={imgSrc}
                  className='h-48 w-48 rounded shadow'
                  alt='brewing'
                />
              </div>
            )}

            <div className='mt-4 space-x-2'>
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
}

export default Main
