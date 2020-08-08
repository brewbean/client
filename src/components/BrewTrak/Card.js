import React from 'react';

import Rating from './Rating';
import Beans from './Beans';

import CreateBrew from './CreateBrew'
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';

const Card = ({img, date, brewType, beanType, beanWeight, waterAmount, beanGrind, waterTemp, brewComments, rating, setCardValues}) => {
    let card = {img, date, brewType, beanType, beanWeight, waterAmount, beanGrind, waterTemp, brewComments, rating };
    return(
        <div className="group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 " onClick={() => {setCardValues(card)}}>  
                <div className="flex">{date}</div>
                    <div className="flex">
                        <div className="flex-col">
                            <div className="flex pr-1">{beanType}</div>
                        </div>
                        <div className="flex-col">
                            <div className="flex px-1">{beanWeight}</div>
                        </div>
                        <div className="flex-col">
                            <div className="flex px-1">{waterTemp}</div>
                        </div>
                    </div>
                <div className="flex">{rating}</div>
        </div>
    )
}

export default Card;