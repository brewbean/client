import ServeTimeComponent from './ServeTime';

const StageInput = ({ weight, name, startTime, endTime, setStageValue, setStartTime, setEndTime, deleteStage, deleteDisabled }) => {
  return (
    <div className='text-gray-700'>
      <div className='mb-2'>
        <div className='flex items-center justify-between'>
          <label className="block text-sm font-medium leading-5">stage</label>
          {
            !deleteDisabled && (
              <button
                onClick={deleteStage}
                className='text-red-400 hover:text-red-500 focus:outline-none focus:text-red-600'
              >
                <svg className='h-4 w-4 stroke-current' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
            )
          }
        </div>
        <input type="text" name='name' value={name} onChange={setStageValue} className="text-center form-input block w-full text-sm sm:leading-5 mt-1 rounded-md shadow-sm" />
      </div>
      <div className='mb-2'>
        <label className="block text-sm font-medium leading-5">total weight by stage end  </label>
        <div className='relative'>
          <input type="number" min="0" name='weight' value={weight} onChange={setStageValue} className="text-center form-input block w-full text-sm sm:leading-5 mt-1 rounded-md shadow-sm" />
          <div className="absolute inset-y-0 right-0 pr-3 sm:pr-8 flex items-center pointer-events-none">
            <p className='text-gray-500 text-xs font-bold'>g</p>
          </div>
        </div>

      </div>
      <div className="flex justify-between items-end">
        <div className='flex items-end'>
          <div>
            <label className="block text-xs font-medium leading-5">min</label>
            <input name='min' onChange={setStartTime} value={startTime.min} type="number" min="0" max="59" className="text-center text-xs sm:px-2 form-input block w-full mt-1 rounded-md shadow-sm" />
          </div>
          <p className="mx-2">:</p>
          <div>
            <label className="block text-xs font-medium leading-5">sec</label>
            <input name='sec' onChange={setStartTime} value={startTime.sec} type="number" min="0" max="59" className="text-center text-xs sm:px-2 form-input block w-full mt-1 rounded-md shadow-sm" />
          </div>
        </div>
        <p className="mx-2 font-medium text-xs">to</p>
        <div className='flex items-end'>
          <div>
            <label className="block text-xs font-medium leading-5">min</label>
            <input name='min' onChange={setEndTime} value={endTime.min} type="number" min="0" max="59" className="text-center text-xs sm:px-2 form-input block w-full mt-1 rounded-md shadow-sm" />
          </div>
          <p className="mx-2">:</p>
          <div>
            <label className="block text-xs font-medium leading-5">sec</label>
            <input name='sec' onChange={setEndTime} value={endTime.sec} type="number" min="0" max="59" className="text-center text-xs sm:px-2 form-input block w-full mt-1 rounded-md shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StageInput;

export const ServeTime = ServeTimeComponent;