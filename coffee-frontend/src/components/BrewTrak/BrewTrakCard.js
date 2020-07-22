import React from 'react';

import BrewTrakRating from './BrewTrakRating';
import BrewTrakBeans from './BrewTrakBeans';

const BrewTrakCard = () => {
    return(
        <div>   
            <div>Date Time: {Date()}</div>
            <div>James Input Component</div>
            <div>James Input Component</div>
            <div>James Input Component</div>

            <div>James Brewer Note Component</div>
            <BrewTrakRating/>
            <BrewTrakBeans/>
        </div>
    )
}

export default BrewTrakCard;