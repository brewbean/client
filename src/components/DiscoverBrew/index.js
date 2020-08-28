import React from 'react';
import DiscoverCard from './DiscoverCard';
import {sampleDetails} from './sampleDetails';
import { useDiscoverBean } from './useDiscoverBean';

import { GET_ALL_BEANS } from '../../queries';
import { useQuery } from '@apollo/react-hooks';
const DiscoverBrew  = () => {
    // let beanDetail = {name:"KENYA KAMWANGI", company_name:"Stereoscope", roast_type: "light", region: "Kirinyaga", profile_note: ["Red Grapefruit", "Cranberry"]}
    let beanDetail = sampleDetails;
    const { methods } = useDiscoverBean();
    const { loading, error, data } = useQuery(GET_ALL_BEANS)
    console.log("Bean Detail Data", data);
    console.log("Beandetail", beanDetail);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
        <div className="bg-gray-800 pb-32">
            <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl leading-9 font-bold text-white">
                Discover
                </h1>
            </div>
            </header>
        </div>

        <main className="-mt-32">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* <!-- Replace with your content --> */}
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data && data.bean.map((x,i) =>
                        <DiscoverCard  key={i} {...x} { ...methods}/>
                    )}
                </ul>
            {/* <!-- /End replace --> */}
            </div>
        </main>
        </div>
    )
}
export default DiscoverBrew;
