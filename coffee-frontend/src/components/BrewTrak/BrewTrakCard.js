import React from 'react';

import BrewTrakComment from './BrewTrakComment';
import BrewTrakRating from './BrewTrakRating';
import BrewTrakBeans from './BrewTrakBeans';

import './BrewTrak.css';


const BrewTrakCard = () => {
    return(
        <div class='card'>  
            <div class='flexbox-horizontal'>

                <div class='date'>Date Time: {Date()}</div>
                <div>James Coffee Bean Input Component</div>
                <div>James Coffee Grind Input Component</div>
                <div>James Water Amount Input Component</div>
                <div>James Water Temperature Input Component</div>
            </div> 

                <BrewTrakComment />
                <BrewTrakRating/>
                <BrewTrakBeans/>
        </div>
    )
}

export default BrewTrakCard;