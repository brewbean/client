import React, { useState } from 'react';

import Card from './Card';
import CreateCard from './CreateCard';
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';
import {useUser} from '../../context/userContext'
const Home = () => {
    const foo = useUser();
    const [cards, addCards] = useState([1, 1]);
    console.log("USER:", foo)
    return (
        <div>
        <h1>BrewTrak</h1><button onClick={() => { addCards(cards => [...cards, 1]) }} >+</button>
        <Card />
        {cards.map((c, i) =>
            <Card key={i} />
        )};
        </div>
    )
}

export default Home;

