import React, { useState } from 'react';

import Card from './Card';
import CreateCard from './CreateCard';
import CardDetails from './CardDetails';
import './BrewTrak.css';

import useBrewTrak from './useBrewTrak';
import {useUser} from '../../context/userContext'

import Logs from './sampleLog';
const Home = () => {
    const { data, methods } = useBrewTrak();
    
    return (
    <div class="h-screen flex overflow-hidden bg-white">
    {/* <!-- Off-canvas menu for mobile --> */}
        <div class="md:hidden">
            <div class="fixed inset-0 flex z-10">
                <div class="relative flex-1 flex flex-col ">
                    <div class="absolute bottom-0 left-0 p-1 w-full bg-blue-100 rounded-t-lg border-t border-gray-250 flex-1 mb-3">
                        <div class="flex-1 pt-2 pb-4 overflow-y-auto">
                            <div class="px-2">
                                <div className="flex items-center mx-4 py-2 text-md leading-5 font-bold text-gray-900">LOGS</div>
                                <div className="flex flex-row">
                                    {Logs.map((l,i) => 
                                        <div className="py-2 mx-4">
                                            <Card key={i} {...l} {...methods}/>
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
        <div class="hidden md:flex md:flex-shrink-0">
            <div class="flex flex-col w-64">
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
                <div class="flex flex-col h-0 flex-1 rounded-lg border-r border-gray-250 bg-blue-100">
                    <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center px-2 py-2 text-md leading-5 font-bold text-gray-900">LOGS</div>
                        <div>
                        {Logs.map((l,i) => 
                            <div className="py-2 px-2">
                                <Card key={i} {...l} {...methods}/>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
            <div class="pt-2 pb-6 md:py-6">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 rounded-lg">
                <CardDetails {...data}/>
                </div>
            </div>
        </main>
    </div>
    </div>
    )
}

export default Home;

