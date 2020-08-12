import React from 'react';
import Header from '../../components/Header';
import BrewTrak from '../../components/BrewTrak';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_BARISTA, INSERT_RECIPE_ONE } from '../../queries';



const BrewTrakPage = props => {
  console.log()
  // const data = useQuery(GET_BARISTA);
  
  // console.log("plswork", data);
  const [insertRecipe, { data }] = useMutation(INSERT_RECIPE_ONE);
  const object = {
    "barista_id": 6,
    "brew_type": "pourover",
    "bean_weight": 40,
    "bean_grind":"fine",
    "water_temp": 200,
    "rating":4,
    "comment":"It was dank part 2",
    "private": true,
    "serving_amount": 550
    
  }
  // console.log(insertRecipe({ variables: { 
  //   object
  // }}));
  // console.log(data);
  // addTodo({ variables: { type: input.value } });

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