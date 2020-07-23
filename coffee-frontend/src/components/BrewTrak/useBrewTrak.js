import React, { useState } from 'react';


const useBrewTrak = () => {

    const [waterAmount, setWaterAmount] = useState("30");
    const [waterTemp, setWaterTemp] = useState("");

    return (
        {
            data:{
                waterAmount,
                waterTemp
            },
            methods: {
                setWaterAmount: e => setWaterAmount(e.target.value),
                setWaterTemp: e => setWaterTemp(e.target.value)
            }

        }
    )
    
}

export default useBrewTrak;