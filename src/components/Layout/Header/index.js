import { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Transition } from '@headlessui/react'
import { useUser } from 'context/UserContext';

const links = [
  {
    text: 'pour over app',
    to: '/brewtrak',
  },
  {
    text: 'discover brews',
    to: '/discover/brew',
  },
  {
    text: 'buy beans',
    to: '/discover/bean',
  },
  {
    text: 'recipe player',
    to: '/pour-app',
  },
];

const Header = () => {
  const { path } = useRouteMatch();
  const { isAuthenticated } = useUser();

  const [isOpen, setToggle] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="flex-none bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="ml-2 font-extrabold tracking-widest text-blue-500">brew<span className='text-pink-400'>(</span>bean<span className='text-pink-400'>)</span></h1>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex">
              {
                links.map((link, i) => <Link to={link.to} className={`navlink ${path === link.to ? 'navlink--state-active' : 'navlink--state-inactive'} ${i > 0 ? 'ml-8' : ''}`.trimEnd()}>{link.text}</Link>)
              }
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true">
                  <img className="h-8 w-8 rounded-full" src="https://ca.slack-edge.com/TSCG4PBLN-USDKSPWF3-cdc2a3b92383-512" alt="" />
                </button>
              </div>

              <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <Link to='/' className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Your Profile</Link>
                    <Link to='/' className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Settings</Link>
                    <Link to='/' className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Sign out</Link>
                  </div>
                </div>
              </Transition>

            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={() => setToggle(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
              <svg className={`${!isOpen ? 'block' : 'hidden'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Change to block to see dropdown and hidden to hide - MOBILE */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="flex flex-col pt-2 pb-3">
          <button className="text-left pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition duration-150 ease-in-out">pour over app</button>
          <button className="text-left mt-1 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">discover brews</button>
          <button className="text-left mt-1 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">academy</button>
          <button className="text-left mt-1 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">buy beans</button>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src="https://ca.slack-edge.com/TSCG4PBLN-USDKSPWF3-cdc2a3b92383-512" alt="" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-6 text-gray-800">james park</div>
              <div className="text-sm font-medium leading-5 text-gray-500">jamespark@example.com</div>
            </div>
          </div>
          <div className="mt-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">your profile</button>
            <button className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">settings</button>
            <button className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">sign out</button>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Header;