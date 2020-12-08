import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='py-3 sm:py-5 bg-white border-t border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:justify-between'>
          <nav className='flex flex-col items-center space-y-1 sm:flex-row sm:space-y-0 sm:space-x-8' aria-label='Footer'>
            <Link to='/' className='text-sm font-medium text-gray-400 focus:outline-none hover:text-gray-700'>About</Link>
            <Link to='/' className='text-sm font-medium text-gray-400 focus:outline-none hover:text-gray-700'>Privacy Policy</Link>
            <Link to='/' className='text-sm font-medium text-gray-400 focus:outline-none hover:text-gray-700'>Changelog</Link>
            <Link to='/' className='text-sm font-medium text-gray-400 focus:outline-none hover:text-gray-700'>Contact Us</Link>
          </nav>
          <div className='text-center text-gray-400 text-sm pt-2 sm:pt-0'>
            &copy; 2020 Brewbean, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}