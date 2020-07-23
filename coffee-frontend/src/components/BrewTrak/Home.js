import React, { useState } from 'react';

import Card from './Card';
import CreateCard from './CreateCard';
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';

const Home = () => {
    const [cards, addCards] = useState([1, 1])
    const { data, methods } = useBrewTrak();
    return (
        <div>
            <h1>BrewTrak</h1><button onClick={() => {addCards(cards => [...cards, 1])}} >+</button>
            {cards.map(() =>
                <Card/>
            )};
            <CreateCard {...data} {...methods}/>
        </div>
    )
}

export default Home;

