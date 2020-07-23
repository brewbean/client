import React, { useState } from 'react';

import Card from './Card';

import './BrewTrak.css';

const Home = () => {
    const [cards, addCards] = useState([1, 1])
    return (
        <div>
            <h1></h1><button onClick={() => {addCards(cards => [...cards, 1])}} >+</button>
            <Card/>
            {cards.map(() =>
                <Card/>
            )};
        </div>
    )
}

export default Home;

