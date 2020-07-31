import React, { useState } from 'react';
import Header from '../../components/Header';
import PourStageEditor from '../../components/PourStageEditor';

const RecipePage = props => {
  let [stages, setStages] = useState([''])
  return (
    <div className='max-h-screen h-screen white flex flex-col'>
      <Header />
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8 flex flex-col justify-between'>
          <PourStageEditor stages={stages} />
          <div className='bg-white rounded shadow p-4'>
            <button onClick={() => setStages([...stages, ''])} type="button" className="px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
              add stage
            </button>
            <button type="button" className="w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipePage;