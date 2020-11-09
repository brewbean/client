import { ReactComponent as Play } from './play-circle.svg';

const PourPlayer = ({ start, isActive, stageWeight, percent, stage, stages, remainingTime, weight, timeString, gif: Gif }) => {
  return (
    <div className='bg-white text-gray-800 rounded shadow p-4 h-full flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <h3 className='text-md font-medium tracking-wide'>coffee weight</h3>
        <h3 className='text-md font-medium tracking-wide'>{weight}g</h3>
      </div>

      <div className='flex flex-col items-center'>
        {
          !isActive && timeString === ':00'
            ? (
              <button className='text-blue-500 hover:text-green-400 focus:outline-none focus:text-green-500' onClick={start}> 
                <Play className='h-48 w-48 stroke-current' />
              </button>
            )
            : <Gif className='h-48 w-48' />
        }
        <h3 className='text-xl font-semibold tracking-wide'>{timeString}</h3>
      </div>

      <div className='flex flex-col items-center text-blue-700'>
        <h5 className='text-lg'>water in system</h5>
        <h5 className='text-xl font-semibold'>{stageWeight} g</h5>
      </div>

      <div className='flex flex-col items-center'>
        <h4 className='text-xl font-semibold'>{stage}</h4>
        {stage !== 'serve' && timeString !== ':00' &&
          <h5 className='text-lg'>continue for {remainingTime} seconds</h5>
        }
      </div>
      <div>
        <div className='flex justify-between'>
          {
            stages.map((s, i) => <p className={`${s === stage ? 'font-bold ' : ''}text-sm`} key={i}>{s}</p>)
          }
        </div>
        <div className="mt-4 h-1 bg-gray-200 rounded-full">
          <div style={{ width: `${percent}%` }} className="h-1 bg-blue-500 rounded-full relative">
          </div>
        </div>
      </div>
    </div>
  )
}

export default PourPlayer;