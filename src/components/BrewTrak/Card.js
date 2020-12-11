const Card = ({id, bean, date_added, brew_type, bean_weight, water_amount, bean_grind, water_temp, comment, rating, setCardValues}) => {
    let img  = bean.img
    let name = bean.name;
    let card = { id, img, date_added, brew_type, name, bean_weight, water_amount, bean_grind, water_temp, comment, rating };
    return(
        <div className="group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 " onClick={() => {setCardValues(card)}}>  
                {/* <div className="flex">{date}</div> */}
                <div className="flex">{date_added}</div>
                    <div className="flex">
                        <div className="flex-col">
                            <div className="flex pr-1">Type: {name}</div>
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