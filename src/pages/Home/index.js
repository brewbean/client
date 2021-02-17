// import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Beans, PourOver, Scale, cover } from 'image'

export default function Home() {
  return (
    <div className='space-y-8'>
      <div
        className='h-screen-3/4 bg-cover'
        style={{ backgroundImage: `url(${cover.landscape})` }}
      >
        <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col h-full justify-center'>
          <div className='text-start space-y-2 md:max-w-md xl:max-w-lg'>
            <h1 className='text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-gray-900'>
              Discover the world of coffee
            </h1>
            <h2 className='sm:text-lg md:text-xl text-gray-900'>
              Explore and share coffee recipes, reviews, and more.
            </h2>
            <h2 className='sm:text-lg md:text-xl text-gray-90 font-bold'>
              New to brewing?
            </h2>
          </div>
          <div className='mt-5 sm:flex sm:justify-center lg:justify-start'>
            <div className='rounded-md shadow'>
              <div className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 md:py-4 md:text-lg md:px-10'>
                Start here
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid sm:grid-cols-3 gap-4'>
        {/* These can be changed to a component */}
        <Link
          to='/'
          className='flex flex-col group unavailable hover:unavailable-filter'
        >
          <img
            className='h-64 object-cover sm:rounded-lg '
            src={Beans} /*TODO: - Update to new cloudinary url*/
            alt='beans'
          />
          <span className='text-lg font-medium text-white-900 unavailable-text group-hover:unavailable-text-filter'>
            COMING SOON
          </span>
          <h2 className='mt-2 text-lg font-medium text-gray-900'>
            Discover Beans
          </h2>
        </Link>
        <Link to='/recipe' className='flex flex-col text-center'>
          <img
            className='h-64 object-cover sm:rounded-lg'
            src={PourOver} /*TODO: - Update to new cloudinary url*/
            alt='pour over'
          />
          <h2 className='mt-2 text-lg font-medium text-gray-900'>Recipes</h2>
        </Link>

        <Link
          to='/'
          className='flex flex-col group unavailable hover:unavailable-filter'
        >
          <img
            className='h-64 object-cover sm:rounded-lg'
            src={Scale} /*TODO: - Update to new cloudinary url*/
            alt='scale'
          />
          <span className='text-lg font-medium text-white-900 unavailable-text group-hover:unavailable-text-filter'>
            COMING SOON
          </span>
          <h2 className='mt-2 text-lg font-medium text-gray-900'>Brew Logs</h2>
        </Link>
      </div>

      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border-t'>
        <div className='lg:grid lg:grid-cols-3 lg:gap-x-8'>
          <div className='lg:col-span-1'>
            <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              A better way to do coffee.
            </h2>
          </div>
          <dl className='mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2'>
            <div>
              <div className='flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='mt-5'>
                <dt className='text-lg leading-6 font-medium text-gray-900'>
                  Roasters from everywhere
                </dt>
                <dd className='mt-2 text-base text-gray-500'>
                  Discover hidden gems in roasters and beans that would be hard
                  to find in your local stores.
                </dd>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='mt-5'>
                <dt className='text-lg leading-6 font-medium text-gray-900'>
                  Community approved
                </dt>
                <dd className='mt-2 text-base text-gray-500'>
                  Get the collective opinion of people everywhere on recipes or
                  beans to try.
                </dd>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='mt-5'>
                <dt className='text-lg leading-6 font-medium text-gray-900'>
                  Interactive recipes
                </dt>
                <dd className='mt-2 text-base text-gray-500'>
                  With our recipe player, you can easily try any recipe you or
                  the community created.
                </dd>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='mt-5'>
                <dt className='text-lg leading-6 font-medium text-gray-900'>
                  Creative coffee
                </dt>
                <dd className='mt-2 text-base text-gray-500'>
                  Keep track of great ideas by saving interesting recipes you've
                  created or come across.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
