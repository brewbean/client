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
            <div class="absolute bottom-0 leftp-1 w-full bg-white flex-1 mb-3">

                <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
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
            <nav class="mt-5 flex-1 px-2 bg-white">
                <a href="#" class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard - Tt
                </a>
                <a href="#" class="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Team
                </a>
                
            </nav>
            </div>
            <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" class="flex-shrink-0 w-full group block">
                <div class="flex items-center">
                <div>
                    <img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                </div>
                <div class="ml-3">
                    <p class="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
                    Tom Cook
                    </p>
                    <p class="text-xs leading-4 font-medium text-gray-500 group-hover:text-gray-700 transition ease-in-out duration-150">
                    View profile
                    </p>
                </div>
                </div>
            </a>
            </div>
        </div>
        </div>
    </div>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        </div>
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

