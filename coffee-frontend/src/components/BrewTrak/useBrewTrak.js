import React, { useState } from 'react';

const useBrewTrak = () => {
    /*
        CreateCard States
            NOTE: Initial states are temporary random defaults.
    */
    const [date, setDate] = useState('12/2/20');
    const [beanWeight, setBeanWeight] = useState('30');
    const [beanGrind, setBeanGrind] = useState('5');
    const [waterWeight, setWaterWeight] = useState('450');
    const [waterTemp, setWaterTemp] = useState('200');
    const [comments, setComments] = useState('it was dank');
    const [rating, setRating] = useState('5');
    const [beanType, setBeanType] = useState('ethiopian');
    return (
        {
            data:{
                date,
                beanWeight,
                beanGrind,
                waterWeight,
                waterTemp,
                comments,
                rating,
                beanType
            },
            methods: {
                setDate: e => setDate(e.target.value),
                setBeanWeight: e => setBeanWeight(e.target.value),
                setBeanGrind: e => setBeanGrind(e.target.value),
                setWaterWeight: e => setWaterWeight(e.target.value),
                setWaterTemp: e => setWaterTemp(e.target.value),
                setComments: e => setComments(e.target.value),
                setRating: e => setRating(e.target.value),
                setBeanType: e => setBeanType(e.target.value)
            }
        }
    )
}

export default useBrewTrak;