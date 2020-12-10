import { useState } from 'react';
import { Link } from 'react-router-dom';

import CoffeeCover from './hero_espresso.jpg';
import Beans from './beans.jpg';
import PourOver from './pour_over.jpg';
import Scale from './scale.jpg';

export default function Home() {
  const [search, setSearch] = useState('');

  const onChange = ({ target }) => setSearch(target.value);

  const onSubmit = e => {
    e.preventDefault();
    console.log('search sent');
    setSearch('');
  }

  return (
    <div className='space-y-8'>
      <div className='h-screen-3/4 bg-cover' style={{ backgroundImage: `url(${CoffeeCover})` }}>
        <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col h-full justify-center'>

          <div className='text-start space-y-2 md:max-w-md xl:max-w-lg'>
            <h1 className='text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-gray-900'>Discover the world of coffee</h1>
            <h2 className='sm:text-lg md:text-xl text-gray-900'>Explore and share coffee recipes, reviews, and more</h2>
          </div>

          <form onSubmit={onSubmit} className="mt-6 flex rounded-md shadow-lg w-full sm:w-2/3 lg:w-2/5">
            <input type="text" value={search} onChange={onChange} className="focus:ring-blue-500 focus:border-blue-500 border-none block w-full rounded-none rounded-l-md sm:text-sm" placeholder="Colombian" />

            <button type='submit' className="-ml-px inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid sm:grid-cols-3 gap-4'>

        <Link to='/beans' className='flex flex-col'>
          <img className="h-64 object-cover sm:rounded-lg" src={Beans} alt="beans" />
          <h2 className='mt-2 text-lg font-medium text-gray-900'>Bean Reviews</h2>
        </Link>

        <Link to='/recipes' className='flex flex-col'>
          <img className="h-64 object-cover sm:rounded-lg" src={PourOver} alt="pour over" />
          <h2 className='mt-2 text-lg font-medium text-gray-900'>Recipes</h2>
        </Link>

        <Link to='/pour-app' className='flex flex-col'>
          <img className="h-64 object-cover sm:rounded-lg" src={Scale} alt="scale" />
          <h2 className='mt-2 text-lg font-medium text-gray-900'>Recipe Player</h2>
        </Link>

      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to do coffee.
            </h2>
          </div>
          <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">

                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="mt-5">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Competitive rates
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Consequuntur omnis dicta cumque, inventore atque ab dolores aspernatur tempora ab doloremque.
                </dd>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">

                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div className="mt-5">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  No hidden fees
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Corporis quisquam nostrum nulla veniam recusandae temporibus aperiam officia incidunt at distinctio ratione.
                </dd>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="mt-5">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Instant transfers
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Omnis, illo delectus? Libero, possimus nulla nemo tenetur adipisci repellat dolore eligendi velit doloribus mollitia.
                </dd>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="mt-5">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Reminder emails
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Veniam necessitatibus reiciendis fugit explicabo dolorem nihil et omnis assumenda odit? Quisquam unde accusantium.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

    </div>
  )
}