
import React from 'react';
import Star from '../BrewTrak/star.png';

import { GET_SINGLE_BEAN } from '../../queries';
import { useQuery } from 'urql';
import { useHistory, useRouteMatch } from 'react-router-dom';

import BeanReview from './BeanReview';
import CreateReview from './CreateReview';
const DiscoverDetails = (props) => {
    const history = useHistory();
    let match = useRouteMatch();

    const id = props.match.params.id
    const [result, reexecuteQuery] = useQuery({
        query: GET_SINGLE_BEAN,
        variables: { id }
      });
    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    const { company_name, name, about, profile_note, img, price, rating } = data.bean_by_pk;
    return(
        <div>
        <div className="bg-gray-800 pb-32">
            <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button className="text-3xl leading-9 font-bold text-white" onClick={() => history.push('/discover/bean')}>
                Back
                </button>
            </div>
            </header>
        </div>
        <main className="-mt-32">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* <!-- Replace with your content --> */}
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                <div className="px-4 py-4 rounded-lg h-auto">
                    <div>
                        <img className="w-64 h-64 flex-shrink-0 mx-auto bg-black" src={img} alt=""/>
                        <div className='text-2xl text-gray-400'>{company_name}</div>
                        <div className='text-3xl leading-9 font-bold'>{name}</div>
                        <div className='flex items-center text-2xl leading-9'>
                            <img className="w-5 h-5 mr-1" src={Star} alt='Star'/>:{rating}/5
                        </div>
                        <div className='text-2xl font-bold'>${price}</div>
                        <div className='font-bold'>Profile Notes</div>
                        {
                            profile_note.map((x, i) => 
                            <div key={i}>
                                {x}
                            </div>
                       )}
                        <div className='font-bold'>About this Coffee</div>
                        <div>{about ? about : "No description available"}</div>
                        <button
                            type="button" 
                            className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                            buy bean
                        </button>
                        <button
                            type="button" 
                            onClick={() => {history.push(`/review/${id}/new`)}}
                            className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                            submit review
                        </button>
                        <BeanReview/>
                        <CreateReview/>

                    </div>
                </div>
            </div>
            {/* <!-- /End replace --> */}
            </div>
        </main>
        </div>
    )
}

export default DiscoverDetails;