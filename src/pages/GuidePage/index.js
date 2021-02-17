import { Link } from 'react-router-dom'
import { Beans, PourOver, cover } from 'image'

export default function Guide() {
  return (
    <div className='space-y-8'>
      <div
        className='h-screen-3/4 bg-cover'
        style={{ backgroundImage: `url(${cover.landscape})` }}
      >
        <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col h-full justify-center'>
          <div className='text-start space-y-2 md:max-w-md xl:max-w-lg'>
            <h1 className='text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-gray-900'>
              Not sure where to start?
            </h1>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Start here
            </button>
          </div>
        </div>
      </div>

      <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid sm:grid-cols-3 gap-4'>
        <Link to='/beans' className='flex flex-col'>
          <img
            className='h-64 object-cover sm:rounded-lg'
            src={Beans}
            alt='beans'
          />
          <h2 className='mt-2 text-lg font-medium text-gray-900'>Beans</h2>
        </Link>
        <Link to='/recipes' className='flex flex-col'>
          <img
            className='h-64 object-cover sm:rounded-lg'
            src={PourOver}
            alt='pourover'
          />
          <h2 className='mt-2 text-lg font-medium text-gray-900'>Recipes</h2>
        </Link>
      </div>
    </div>
  )
}
