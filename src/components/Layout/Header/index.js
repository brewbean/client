import { useState, useEffect, useRef } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Transition } from '@headlessui/react'
import { useUser } from 'context/UserContext';
import UserSection from './UserSection';

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

const settingLinks = [
  {
    text: 'profile',
    to: '/pour-app',
  },
  {
    text: 'settings',
    to: '/hi/3/name/what',
  },
];

const PlaceholderAvatar = () => (
  <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-blue-100">
    <svg className="h-full w-full text-blue-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </span>
);

const Header = () => {
  const { path } = useRouteMatch();
  const [isOpen, setToggle] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { barista } = useUser();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // closes mobile menu/dropdown whenever a link is clicked
    setToggle(false);
    setDropdownOpen(false);
  }, [path]);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="flex-none bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to='/' className="ml-2 font-extrabold tracking-widest text-blue-500">brew<span className='text-pink-400'>(</span>bean<span className='text-pink-400'>)</span></Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex">
              {
                links.map((link, i) => <Link key={link.to} to={link.to} className={`navlink ${path === link.to ? 'navlink--state-active' : 'navlink--state-inactive'} ${i > 0 ? 'ml-8' : ''}`.trimEnd()}>{link.text}</Link>)
              }
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true">
                  {
                    barista.avatar
                      ? <img className="h-8 w-8 rounded-full" src={barista.avatar} alt="user avatar" />
                      : <PlaceholderAvatar />
                  }
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
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg" ref={dropdownRef}>
                  <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    {settingLinks.map(({ to, text }) => <Link key={to} to={to} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">{text}</Link>)}
                    <button onClick={() => console.log('signout')} className="w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">sign out</button>
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
          {links.map((link, i) => <Link key={link.to} to={link.to} className={`menu__link ${path === link.to ? 'menu__link--state-active' : 'menu__link--state-inactive'} ${i > 0 ? 'mt-1' : ''}`.trimEnd()}>{link.text}</Link>)}
        </div>
        <div className="p-4 border-t border-gray-200">
          <UserSection links={settingLinks} />
        </div>
      </div>
    </nav>

  )
}

export default Header;