import React, { useState } from 'react';
import InputRow from '../InputRow/index';
import Dropdown from '../DropDown/index';
import TextArea from '../TextArea/index';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { INSERT_RECIPE_ONE } from '../../queries';


const CreateBrew = ({ date, beanWeight, brewType, beanGrind, waterAmount, beanType, waterTemp, brewComments, rating, setDate, setBeanWeight, setBrewType, setBeanGrind, setWaterAmount, setBeanType, setWaterTemp, setBloomWaterAmount, setBloomTime, setRating, setBrewComments }) => {
    const [insertRecipe, { data }] = useMutation(INSERT_RECIPE_ONE);
    const obj = {
            object: {
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
        }
    
    return (
        <div>
            <Dropdown value={brewType} onChange={setBrewType} options={["Pour Over", "Aeropress", "Siphon", "Moka Pot", "French Press"]} label="brew type" />
            <InputRow value={beanWeight} onChange={setBeanWeight} placeholder='Enter coffee bean weight' label='coffee bean amount' />
            <Dropdown value={beanGrind} onChange={setBeanGrind} options={["Extra Fine", "Fine", "Medium-fine", "Medium-coarse", "Coarse", "Extra coarse"]} label="bean grind" />
            {/* Serving Amount */}
            <InputRow value={waterAmount} onChange={setWaterAmount} placeholder='Enter water weight' label='water amount' />
            <InputRow value={beanType} onChange={setBeanType} placeholder='Enter bean type' label='bean type' />
            <InputRow value={waterTemp} onChange={setWaterTemp} placeholder='Enter water temperature' label='water temperature' />
            <Dropdown value={rating} onChange={setRating} label="Rating" options={["1", "2", "3", "4", "5"]} />
            <TextArea value={brewComments} onChange={setBrewComments} placeholder='Enter comments here' label='brewer comments' />
            {/* Create Instructions  */}
            


            {/* Next button to stage */}
            <div className='flex-none bg-white rounded shadow p-4'>
                <button onClick={() => insertRecipe({variables: obj})} type="button" className="mt-2 w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                    add recipe
            </button>
            </div>
        </div>
    )
}

export default CreateBrew;