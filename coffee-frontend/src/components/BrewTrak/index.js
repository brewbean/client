import React, { useState } from 'react';

import Card from './Card';
import CreateCard from './CreateCard';
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';

const Home = () => {
    const foo = useUser();
    const [cards, addCards] = useState([1, 1]);
    console.log("USER:", foo)
    return (
        <div>
        <h1>BrewTrak</h1><button onClick={() => { addCards(cards => [...cards, 1]) }} >+</button>
        <BrewTrakCard />
        {cards.map((c, i) =>
            <BrewTrakCard key={i} />
        )};
        </div>
    )
}

export default Home;

