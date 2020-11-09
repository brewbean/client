const ServeTime = ({ serveTime, setServeTime }) => {
  return (
    <div className="border-t border-gray-200 pt-2 text-gray-700 flex justify-between items-center">
      <h3 className="block text-md font-semibold tracking-wide">serve time</h3>
      <div className='flex items-end'>
        <div>
          <label className="block text-xs font-medium leading-5">min</label>
          <input name='min' value={serveTime.min} onChange={setServeTime} type="number" min="0" max="59" className="text-center text-xs sm:px-2 form-input block w-full mt-1 rounded-md shadow-sm" />
        </div>
        <p className="mx-2">:</p>
        <div>
          <label className="block text-xs font-medium leading-5">sec</label>
          <input name='sec' value={serveTime.sec} onChange={setServeTime} type="number" min="0" max="59" className="text-center text-xs sm:px-2 form-input block w-full mt-1 rounded-md shadow-sm" />
        </div>
      </div>
    </div>
  )
}

export default ServeTime;