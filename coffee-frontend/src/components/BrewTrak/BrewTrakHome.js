import React, { useState } from 'react';
import BrewTrakCard from './BrewTrakCard';
import { useUser } from '../../context/userContext'
import './BrewTrak.css';

const BrewTrakHome = () => {
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

export default BrewTrakHome;

