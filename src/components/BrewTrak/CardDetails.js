import React from 'react';
import { ReactComponent as CoffeePlaceHolder } from './coffee-mug.svg';

const CardDetails = ({img,date,beanWeight,brewType,beanGrind,waterAmount,beanType,waterTemp,bloomWaterAmount,bloomTime,rating,brewComments,brewSelected}) => {
    return(
        <>  
          <div className="flex flex-col items-center">
            {!brewSelected ? 
                <>
                    <div className='text-2xl font-semibold'>Select a brew to view it's details!</div>
                    <CoffeePlaceHolder className='h-24 w-24 m-4'/>
                </>
             :
             <>
                <div className="flex-column px-10 mx-5 rounded-lg h-96">
                    <img className="w-40 h-40" src={img}/>
                </div>
                    <div className = "flex-column">
                        <div>brewType: {brewType}</div>
                        <div>beanType: {beanType}</div>
                        <div>beanWeight: {beanWeight}</div>
                        <div>waterAmount: {waterAmount}</div>
                        <div>beanGrind: {beanGrind}</div>
                        <div>waterTemp: {waterTemp}</div>
                        <div>brewcomments: {brewComments}</div>
                    <div>rating: {rating}</div>
                </div>
              </>}
            </div>
        </>
    )
}

export default CardDetails;