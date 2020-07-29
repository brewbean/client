import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import BrewTrakCard from './BrewTrakCard';

import './BrewTrak.css';

const BrewTrakHome = () => {
    const [cards, addCards] = useState([1, 1]);
    const user = useContext(UserContext);
    return (
        <div>
            {user.user}
            <h1>BrewTrak</h1><button onClick={() => { addCards(cards => [...cards, 1]) }} >+</button>
            <BrewTrakCard />
            {cards.map(() =>
                <BrewTrakCard />
            )};
        </div>
    )
}

export default BrewTrakHome;

