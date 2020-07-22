import React, { useState } from 'react';

import BrewTrakCard from './BrewTrakCard';

import './BrewTrak.css';

const BrewTrakHome = () => {
    const [cards, addCards] = useState([1, 1])
    return (
        <div>
            <h1>BrewTrak</h1><button onClick={() => {addCards(cards => [...cards, 1])}} >+</button>
            <BrewTrakCard/>
            {cards.map(() =>
                <BrewTrakCard/>
            )};
        </div>
    )
}

export default BrewTrakHome;

