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
    // console.log(methods);
    return (

    <div class="h-screen flex overflow-hidden bg-gray-100">
    {/* <!-- Off-canvas menu for mobile --> */}
    <div class="md:hidden">
        <div class="fixed inset-0 flex z-40">

        {/* <!--
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        --> */}
        <div class="relative flex-1 flex flex-col ">
            <div class="absolute bottom-0 left-0 p-1 w-full bg-white flex-1 mb-3">

                <div class="flex-1 pt-5 pb-4 overflow-y-auto">
                    <div class="mt-5 px-2">
                        <div className="flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900">
                        LOGS
                        </div>
                        <>
                            {Logs.map((l,i) => 
                                <div className="py-1">
                                    <Card key={i} {...l} {...methods}/>
                                </div>
                            )}
                        </>
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
        <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* <div class="flex items-center flex-shrink-0 px-4">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg" alt="Workflow"/>
            </div> */}
            
            <div className="flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900">
                LOGS
            </div>
            <div>
            {Logs.map((l,i) => 
                <div className="py-1">
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
            {/* <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div> */}
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* <!-- Replace with your content --> */}
            <CardDetails {...data}/>
            {/* <div class="py-4">
                <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
            </div> */}
            {/* <!-- /End replace --> */}
            </div>
        </div>
        </main>
    </div>
    </div>
    )
}

export default Home;

