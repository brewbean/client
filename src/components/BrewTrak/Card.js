import React from 'react';

import Comment from './Comment';
import Rating from './Rating';
import Beans from './Beans';

import CoffeeDetails from './CoffeeDetails'
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';

const Card = (props) => {
    let { date, beanType, beanWeight, waterWeight, beanGrind, waterTemp, comments, rating} = props;
    return(
        <div className="group flex flex-col px-2 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-100">  

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