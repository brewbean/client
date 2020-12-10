import { useState } from 'react';
import { Link } from 'react-router-dom';

import CoffeeCover from './hero_beans.jpg';
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
    <>
      <div className='h-screen-3/4 bg-cover px-8 py-6 flex flex-col items-center justify-center' style={{ backgroundImage: `url(${CoffeeCover})` }}>


        <div>
          <h1 className='text-5xl tracking-tight font-extralight text-white'>Discover the world of coffee</h1>
          <h2 className='text-xl mt-3 font-semibold text-white'>Explore and share coffee recipes, reviews, and more</h2>
        </div>



        <form onSubmit={onSubmit} className="mt-10 flex rounded-md shadow-lg w-full sm:w-2/3 lg:w-1/2 xl:w-1/3">
          <input type="text" value={search} onChange={onChange} className="focus:ring-blue-500 focus:border-blue-500 border-none block w-full rounded-none rounded-l-md sm:text-sm" placeholder="Colombian" />

          <button type='submit' className="-ml-px relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </form>

      </div>



      <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-4 grid sm:grid-cols-3 gap-4'>

        <Link to='/beans' className='flex flex-col'>
          <img className="h-64 object-cover sm:rounded-lg" src={Beans} alt="beans" />
          <h2 className='mt-2 text-gray-700 text-md font-medium'>Bean Reviews</h2>
        </Link>

        <Link to='/recipes' className='flex flex-col'>
          <img className="h-64 object-cover sm:rounded-lg" src={PourOver} alt="pour over" />
          <h2 className='mt-2 text-gray-700 text-md font-medium'>Recipes</h2>
        </Link>

        <Link to='/pour-app' className='flex flex-col'>
          <img className="h-64 object-cover sm:rounded-lg" src={Scale} alt="scale" />
          <h2 className='mt-2 text-gray-700 text-md font-medium'>Recipe Player</h2>
        </Link>

      </div>
    </>
  )
}