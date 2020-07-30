import React, { useState } from 'react';


const CoffeeDetails = ({waterAmount, waterTemp, setWaterAmount, setWaterTemp}) => {

    return (
        <div>
            Water Amount: 
            <input value={waterAmount} onChange={setWaterAmount}/>
        </div>
    )
}

export default CoffeeDetails;