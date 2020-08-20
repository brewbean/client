import React from 'react';

const Card = ({img, date_added, brew_type, bean_type, bean_weight, water_amount, bean_grind, water_temp, comment, rating, setCardValues}) => {
    let card = {img, date_added, brew_type, bean_type, bean_weight, water_amount, bean_grind, water_temp, comment, rating };
    return(
        <div className="group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 " onClick={() => {setCardValues(card)}}>  
                {/* <div className="flex">{date}</div> */}
                <div className="flex">{date_added}</div>
                    <div className="flex">
                        <div className="flex-col">
                            <div className="flex pr-1">Type: {bean_type}</div>
                        </div>
                        <div className="flex-col">
                            <div className="flex px-1">{bean_weight}g</div>
                        </div>
                        <div className="flex-col">
                            <div className="flex px-1">{water_temp}F</div>
                        </div>
                    </div>
                <div className="flex">{rating}/5</div>
        </div>
    )
}

export default Card;