import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Card from './Card';
import CardDetails from './CardDetails';
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';
import { GET_ALL_RECIPE } from '../../queries';
import { useQuery } from 'urql';

const BrewTrak = () => {
    const { data, methods } = useBrewTrak();
    const history = useHistory();
    const match = useRouteMatch();
    const [result, reexecuteQuery] = useQuery({
        query: GET_ALL_RECIPE,
      });
      const { data: logs, fetching, error } = result;
      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;
    
    return (
        
    <div className="h-screen flex overflow-hidden bg-white">
    {/* <!-- Off-canvas menu for mobile --> */}
        <div className="md:hidden">
            <div className="fixed inset-0 flex z-10">
                <div className="relative flex-1 flex flex-col ">
                    <div className="absolute bottom-0 left-0 p-1 w-full bg-blue-100 rounded-t-lg border-t border-gray-250 flex-1 mb-3">
                        <div className="flex-1 pt-2 pb-4 overflow-y-auto">
                            <div className="px-2">
                                <div className="flex items-center mx-4 py-2 text-md leading-5 font-bold text-gray-900">LOGS</div>
                                    <button
                                        onClick={() => history.push(`${match.url}/new`)}
                                        type="button" 
                                        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                        add brew
                                    </button>

                                <div className="flex flex-row">
                                    {logs.recipe.map((l,i) => 
                                        <div key={i} className="py-2 mx-4">
                                            <Card {...l} {...methods}/>
                                        </div>
                                    )}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
                <div className="flex flex-col h-0 flex-1 rounded-lg border-r border-gray-250 bg-blue-100">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center px-2 py-2 text-md leading-5 font-bold text-gray-900">LOGS</div>
                            <button
                                    onClick={() => history.push(`${match.url}/new`)}
                                    type="button" 
                                    className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                    add brew
                            </button>
                        <div>
                        {logs.recipe.map((l,i) => 
                            <div key={i} className="py-2 px-2">
                                <Card {...l} {...methods}/>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 rounded-lg">
                <CardDetails {...data}/>
                </div>
            </div>
        </main>
    </div>
    </div>
    )
}

export default BrewTrak;

