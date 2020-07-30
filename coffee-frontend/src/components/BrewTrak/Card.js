import React from 'react';

import Comment from './Comment';
import Rating from './Rating';
import Beans from './Beans';

import CoffeeDetails from './CoffeeDetails'
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';

const Card = () => {
    const {data, methods} = useBrewTrak();

    return(
        <div className='card'>  
            <div className='flexbox-horizontal'>

                <div className='date'>Date Time: {Date()}</div>
                <div>James Coffee Bean Input Component</div>
                <div>James Coffee Grind Input Component</div>
                <div><CoffeeDetails {...data} {...methods}/></div>
                <div>James Water Temperature Input Component</div>
            </div> 

                <Comment />
                <Rating/>
                <Beans/>
        </div>
    )
}

export default Card;