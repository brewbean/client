import React, { useState } from 'react';

// import useBrewTrak from './useBrewTrak';

const CreateCard = ({date, beanWeight, beanGrind, waterWeight, waterTemp, comments, rating, beanType,
    setDate, setBeanWeight, setBeanGrind, setWaterWeight, setWaterTemp, setComments, setRating, setBeanType}) => {
    // const {data, methods} = useBrewTrak();
    // const [date, setDate] = useState('12/2/20');
    // const [beanWeight, setBeanWeight] = useState('30');
    // const [beanGrind, setBeanGrind] = useState('5');
    // const [waterWeight, setWaterWeight] = useState('450');
    // const [waterTemp, setWaterTemp] = useState('200');
    // const [comments, setComments] = useState('it was dank');
    // const [rating, setRating] = useState('5');
    // const [beanType, setBeanType] = useState('ethiopian');

    return(
        <div class='card'>  
            <div class='flexbox-horizontal'>
            <h1>CREATE CARD</h1>
            Date: <input value={date} onChange={setDate}/>
            Coffee Bean Weight: <input value={beanWeight} onChange={setBeanWeight}/>
            Coffee Bean Grind: <input value={beanGrind} onChange={setBeanGrind}/>
            Water Amount: <input value={waterWeight} onChange={setWaterWeight}/>
            Water Temperature: <input value={waterTemp} onChange={setWaterTemp}/>
            Comment: <input value={comments} onChange={setComments}/>
            Rating: <input value={rating} onChange={setRating}/>
            Beans: <input value={beanType} onChange={setBeanType}/>
            </div> 

        </div>
    )
}

export default CreateCard;