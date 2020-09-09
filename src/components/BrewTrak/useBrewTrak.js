import { useState } from 'react';
import { useMutation } from 'urql';
import { INSERT_RECIPE_ONE } from '../../queries';

export const useBrewTrak = () => {
    /*
        CreateCard States
            NOTE: Initial states are temporary random defaults.
    */
    const [date, setDate] = useState('12/2/20');
    const [beanWeight, setBeanWeight] = useState('');
    const [brewType, setBrewType] = useState('');
    const [beanGrind, setBeanGrind] = useState('5');
    const [waterAmount, setWaterAmount] = useState('');
    const [beanType, setBeanType] = useState('');
    const [waterTemp, setWaterTemp] = useState('');
    const [bloomWaterAmount, setBloomWaterAmount] = useState('');
    const [bloomTime, setBloomTime] = useState('');
    const [rating, setRating] = useState('1');
    const [brewComments, setBrewComments] = useState('');
    const [brewSelected, setBrewSelect] = useState(false);
    const [insertRecipeResult, insertRecipe] = useMutation(INSERT_RECIPE_ONE);


    // ratio state (how to implement best way) (Water Amount / beanWeight = ratio) 
    // but how to make both inputs respond when other is inputted?
    // if i want a ratio if 16 but type in 50g of coffee 
    const setCardValues = (card) => {
        console.log("Setting card value", card);
        setImg(card.img);
        setDate(card.date_added);
        setBeanWeight(card.bean_weight);
        setBrewType(card.brew_type);
        setBeanGrind(card.bean_grind);
        setWaterAmount(card.water_amount);
        setBeanType(card.name);
        setWaterTemp(card.water_temp);
        setBloomWaterAmount(card.bloom_water_amount);
        setBloomTime(card.bloom_time);
        setRating(card.rating);
        setBrewComments(card.comment);
        setBrewSelect(true);
    }

    const submitRecipe = async () => {
        const object = {
            "barista_id": 6, //temp-id
            "brew_type": brewType,
            "bean_weight": beanWeight,
            "bean_grind": beanGrind,
            "water_temp": waterTemp,
            "rating": rating,
            "comment": brewComments,
            "private": true, //temp-setting
            "water_amount": waterAmount
        }
        let result = await insertRecipe({object});
        console.log("Result", result);
    }

    return (
        {
            data:{
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
                rating
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
                setBrewComments: e => setBrewComments(e.target.value)
            }
        }
    )
}

export default useBrewTrak;