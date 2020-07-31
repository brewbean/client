import React from 'react';
import Header from '../../components/Header';
import BrewTrak from '../../components/BrewTrak';

const BrewTrakPage = props => {

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      {/* <Header /> */}
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
          <BrewTrak/>
        </div>
      </div>
    </div>
  )
}

export default BrewTrakPage;