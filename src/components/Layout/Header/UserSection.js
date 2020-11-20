import { useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import PlaceholderAvatar from './PlaceholderAvatar';

const UserSection = ({ links, setDropdownOpen, isDropdownOpen }) => {
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const { isAuthenticated, isPending, needRefresh, barista } = useUser();

  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && avatarRef.current.contains(event.target)) {
        setDropdownOpen(!isDropdownOpen);
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, avatarRef, isDropdownOpen, setDropdownOpen]);

  // pending pulsing image
  if (isPending || needRefresh) return (
    <div className="hidden sm:animate-pulse sm:ml-6 sm:flex sm:items-center">
      <div className="w-20 h-3 rounded bg-blue-300"></div>
      <div className="ml-3 rounded-full bg-blue-300 h-8 w-8"></div>
    </div>
  );

  return isAuthenticated ? (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <div>
        <p className="text-sm tracking-wider font-medium text-gray-800">{barista.displayName}</p>
      </div>
      <div className="ml-3 relative">
        <div>
          <button ref={avatarRef} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true">
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
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" ref={dropdownRef}>
            <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              {links.map(({ to, text }) => <Link key={to} to={to} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">{text}</Link>)}
              <button onClick={() => console.log('signout')} className="w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">log out</button>
            </div>
          </div>
        </Transition>

      </div>
    </div>
  ) : (
      <div className='hidden sm:flex sm:items-center'>
        <Link to='/login' className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          log in
        </Link>
        <Link to='/create-account' className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          create account
        </Link>
      </div>
    );
}

export default UserSection;