import { Link } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import PlaceholderAvatar from './PlaceholderAvatar';

const UserSection = ({ links }) => {
  const { isAuthenticated, barista } = useUser();

  return isAuthenticated ? (
    <>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {
            barista.avatar
              ? <img className="h-10 w-10 rounded-full" src={barista.avatar} alt="user avatar" />
              : <PlaceholderAvatar containerStyle='h-10 w-10' />
          }
        </div>
        <div className="ml-3">
          <div className="text-base font-medium leading-6 text-gray-800">{barista.displayName}</div>
          <div className="text-sm font-medium leading-5 text-gray-500">{barista.email}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-start space-y-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
        {links.map(({ to, text }) => <Link key={to} to={to} className="py-2 px-3 rounded-md text-left text-base font-medium text-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-100" role="menuitem">{text}</Link>)}
        <button onClick={() => console.log('signout')} className="py-2 px-3 rounded-md text-left text-base font-medium text-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-100" role="menuitem">sign out</button>
      </div>
    </>
  ) : (
      <>
        <Link to='/create-account' className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 focus:bg-blue-700">
          create account
        </Link>
        <Link to='/login' className="mt-2 py-2 w-full flex items-center justify-center text-base font-medium text-blue-600 focus:text-blue-500">
          log in
        </Link>
      </>
    );
}

export default UserSection;