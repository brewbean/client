import React from 'react';

import Rating from './Rating';
import Beans from './Beans';

import CreateBrew from './CreateBrew'
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';

const Card = ({img, date, beanType, beanWeight, waterWeight, beanGrind, waterTemp, comments, rating, setCardValues}) => {
    // let { date, beanType, beanWeight, waterWeight, beanGrind, waterTemp, comments, rating, setCardValues} = props;
    // setCardValues({beanType, beanWeight, beanGrind, waterWeight, waterTemp});
    let card = {img, date, beanType, beanWeight, waterWeight, beanGrind, waterTemp, comments, rating };
    return(
        <div className="group flex flex-col px-2 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-100" onClick={ () => {setCardValues(card)}}>  

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