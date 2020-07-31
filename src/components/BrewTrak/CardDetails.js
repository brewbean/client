import React from 'react';

const CardDetails = (props, {date, beanType, beanWeight, beanGrind, waterWeight, waterTemp, comments, rating}) => {
    let { logs } = props;
    return(
        <>  

        <div className="text-2xl font-semibold text-gray-900">Card Details</div>
        <div className="flex">
            <div className="flex-column px-10 mx-5 border-4 border-dashed border-gray-200 rounded-lg h-96">
                <img className="w-40 h-40" src={logs[0].img}/>
            </div>
          <div className = "flex-column">
               <div>{logs[0].beanType}</div>
               <div>{logs[0].beanWeight}</div>
               <div>{logs[0].waterWeight}</div>
               <div>{logs[0].beanGrind}</div>
               <div>{logs[0].waterTemp}</div>
               <div>{logs[0].comments}</div>
               <div>{logs[0].rating}</div>
          </div>
        </div>
        </>
    )
}

export default CardDetails;