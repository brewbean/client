import React from 'react';

const BrewTrakRating = () => {
    return(
        <div>   
            <div>Rating: 
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option selected value="5">5</option>
                </select>
            </div>
        </div>
    )
}

export default BrewTrakRating;