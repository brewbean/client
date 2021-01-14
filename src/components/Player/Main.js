import { ReactComponent as Gif } from './undraw_coffee_break_j3of.svg'
import { ReactComponent as Play } from './play-circle.svg'

const Main = ({
  start,
  coffeeWeight,
  isActive,
  seconds,
  stage,
  weight,
  remainingTime,
}) => (
  <div className='lg:col-start-1 lg:col-span-3 bg-white text-gray-800 rounded shadow p-4 flex flex-col justify-between'>
    {(isActive || seconds !== 0) && (
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-semibold'>{stage}</h2>
        {stage !== 'serve' && seconds !== 0 && (
          <h3 className='text-lg'>continue for {remainingTime} seconds</h3>
        )}
      </div>
    )}

    {!isActive && seconds === 0 && (
      <div className='flex justify-between items-center'>
        <h3 className='text-md font-medium tracking-wide'>coffee weight</h3>
        <h3 className='text-md font-medium tracking-wide'>{coffeeWeight}g</h3>
      </div>
    )}

    <div className='flex flex-col items-center'>
      {!isActive && seconds === 0 ? (
        <button
          className='text-blue-500 hover:text-green-400 focus:outline-none focus:text-green-500'
          onClick={start}
        >
          <Play className='h-48 w-48 stroke-current' />
        </button>
      ) : (
        <Gif className='h-48 w-48' />
      )}
    </div>

    <div className='flex flex-col items-center text-blue-700'>
      <h5 className='text-lg'>Target Weight</h5>
      <h5 className='text-xl font-semibold'>{weight} g</h5>
    </div>
  </div>
)

export default Main
