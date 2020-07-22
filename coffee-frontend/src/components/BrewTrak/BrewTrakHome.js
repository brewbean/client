import React from 'react';

import BrewTrakCard from './BrewTrakCard';

function BrewTrakHome() {
    return (
        <div>
            <h1>BrewTrak</h1>

            <p>March 27, 2020</p>

            <p>12:00 AM</p>

            <p>Coffee Bean: Ethopian Yrgachiffe</p>

            <p>Coffee Amount: 30g</p>

            <p>Water Amount: 405g </p>

            <p>Water Temperature: 200 F</p>
            
            <p>Brewer Notes:</p>
            <input type='textbox'></input>
            <BrewTrakCard/>

        </div>
    )
}

export default BrewTrakHome
