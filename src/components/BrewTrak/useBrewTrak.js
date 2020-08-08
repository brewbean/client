import React, { useState } from 'react';

export const useBrewTrak = () => {
    /*
        CreateCard States
            NOTE: Initial states are temporary random defaults.
    */
    const [img, setImg] = useState('');
    const [date, setDate] = useState('');
    const [beanWeight, setBeanWeight] = useState('');
    const [brewType, setBrewType] = useState('');
    const [beanGrind, setBeanGrind] = useState('');
    const [waterAmount, setWaterAmount] = useState('');
    const [beanType, setBeanType] = useState('');
    const [waterTemp, setWaterTemp] = useState('');
    const [bloomWaterAmount, setBloomWaterAmount] = useState('');
    const [bloomTime, setBloomTime] = useState('');
    const [rating, setRating] = useState('');
    const [brewComments, setBrewComments] = useState('');
    const [brewSelected, setBrewSelect] = useState(false);

    
    // ratio state (how to implement best way) (Water Amount / beanWeight = ratio) 
    // but how to make both inputs respond when other is inputted?
    // if i want a ratio if 16 but type in 50g of coffee 
    const setCardValues = (card) => {
        console.log("Setting card value", card);
        setImg(card.img);
        setDate(card.date);
        setBeanWeight(card.beanWeight);
        setBrewType(card.brewType);
        setBeanGrind(card.beanGrind);
        setWaterAmount(card.waterAmount);
        setBeanType(card.beanType);
        setWaterTemp(card.waterTemp);
        setBloomWaterAmount(card.bloomWaterAmount);
        setBloomTime(card.bloomTime);
        setRating(card.rating);
        setBrewComments(card.brewComments);
        setBrewSelect(true);
    }
    return (
        {
            data:{
                img,
                date,
                beanWeight,
                brewType,
                beanGrind,
                waterAmount,
                beanType,
                waterTemp,
                bloomWaterAmount,
                bloomTime,
                brewComments,
                rating,
                brewSelected
            },
            methods: {
                setDate: e => setDate(e.target.value),
                setBeanWeight: e => setBeanWeight(e.target.value),
                setBrewType: e => setBrewType(e.target.value),
                setBeanGrind: e => setBeanGrind(e.target.value),
                setWaterAmount: e => setWaterAmount(e.target.value),
                setBeanType: e => setBeanType(e.target.value),
                setWaterTemp: e => setWaterTemp(e.target.value),
                setBloomWaterAmount: e => setBloomWaterAmount(e.target.value),
                setBloomTime: e => setBloomTime(e.target.value),
                setRating: e => setRating(e.target.value),
                setBrewComments: e => setBrewComments(e.target.value),
                setCardValues
            }
        }
    )
}

export default useBrewTrak;