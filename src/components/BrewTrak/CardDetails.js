import React from 'react';

const CardDetails = ({img,date,beanWeight,brewType,beanGrind,waterAmount,beanType,waterTemp,bloomWaterAmount,bloomTime,rating,brewComments}) => {
    // let { logs } = props;
    console.log("IMG:",img);
    return(
        <>  

        {/* <div className="text-2xl font-semibold text-gray-900">Card Details</div> */}
        <div className="flex">
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
        </div>
        </>
    )
}

export default CardDetails;