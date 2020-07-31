import React from 'react';

const CardDetails = () => {

    return(
        <>  

        <div className="text-2xl font-semibold text-gray-900">Card Details</div>
        <div className="flex">
            <div className="flex-column px-10 mx-5 border-4 border-dashed border-gray-200 rounded-lg h-96">Img Here</div>
          <div className = "flex-column">
               <div>Ethiopian</div>
               <div>40g</div>
               <div>560mL</div>
               <div>Medium Coarse</div>
               <div>200 C</div>
               <div>This coffee was dank. Favorite brew.</div>
          </div>
        </div>
        </>
    )
}

export default CardDetails;