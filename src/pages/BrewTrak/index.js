import React from 'react';
import Header from '../../components/Header';
import BrewTrak from '../../components/BrewTrak';
import { useQuery } from '@apollo/react-hooks';
import { GET_BARISTA } from '../../queries';



const BrewTrakPage = props => {


  // const data = useQuery(GET_BARISTA);
  
  // console.log("plswork", data);



  return (
    <div className='h-screen bg-white flex flex-col'>
      <Header />
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
          <BrewTrak/>
        </div>
      </div>
    </div>
  )
}

export default BrewTrakPage;