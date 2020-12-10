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
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
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
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
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
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
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