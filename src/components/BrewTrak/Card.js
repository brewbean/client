import React from 'react';

import Comment from './Comment';
import Rating from './Rating';
import Beans from './Beans';

import CoffeeDetails from './CoffeeDetails'
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';

const Card = () => {

    return(
        <div className="group flex flex-col px-2 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-100">  

                <div className="flex">07/22/20</div>
                <div className="flex">
                    <div className="flex-col">
                        <div className="flex pr-1">40g</div>
                    </div>
                    <div className="flex-col">
                        <div className="flex px-1">560mL</div>
                    </div>
                    <div className="flex-col">
                        <div className="flex px-1">200 C</div>
                    </div>

                </div>
                <div className="flex">5.0/5.0</div>
        </div>
    )
}

export default Card;