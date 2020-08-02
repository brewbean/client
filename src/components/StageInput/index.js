import React from 'react';

const StageInput = props => (
  <div>
    <div className='mb-2'>
      <div className='flex items-center justify-between'>
        <label className="block text-sm font-medium leading-5 text-gray-700">stage</label>
        <button className='text-red-400 hover:text-red-500 focus:outline-none focus:text-red-600'>
          <svg className='h-4 w-4 stroke-current' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </div>
      <input type="text" className="form-input block w-full sm:text-sm sm:leading-5 mt-1 rounded-md shadow-sm" placeholder="add stage..." />
    </div>
    <div className="flex justify-between items-end">
      <div className='flex items-end'>
        <div>
          <label className="block text-xs font-medium leading-5 text-gray-700">min</label>
          <input type="text" className="text-xs form-input block w-full mt-1 rounded-md shadow-sm" />
        </div>
        <p className="mx-2">:</p>
        <div>
          <label className="block text-xs font-medium leading-5 text-gray-700">sec</label>
          <input type="text" className="text-xs form-input block w-full mt-1 rounded-md shadow-sm" />
        </div>
      </div>
      <p className="mx-2 font-medium text-xs">to</p>
      <div className='flex items-end'>
        <div>
          <label className="block text-xs font-medium leading-5 text-gray-700">min</label>
          <input type="text" className="text-xs form-input block w-full mt-1 rounded-md shadow-sm" />
        </div>
        <p className="mx-2">:</p>
        <div>
          <label className="block text-xs font-medium leading-5 text-gray-700">sec</label>
          <input type="text" className="text-xs form-input block w-full mt-1 rounded-md shadow-sm" />
        </div>
      </div>
    </div>
  </div>
)

export default StageInput;