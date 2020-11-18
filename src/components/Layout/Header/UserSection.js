import { Link } from 'react-router-dom';
import { useUser } from 'context/UserContext';

const UserSection = ({ links }) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? (
    <>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src="https://ca.slack-edge.com/TSCG4PBLN-USDKSPWF3-cdc2a3b92383-512" alt="" />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium leading-6 text-gray-800">james park</div>
          <div className="text-sm font-medium leading-5 text-gray-500">jamespark@example.com</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-start space-y-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
        {links.map(({to, text}) => <Link key={to} to={to} className="py-2 px-3 rounded-md text-left text-base font-medium text-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-100" role="menuitem">{text}</Link>)}
        <button onClick={() => console.log('signout')} className="py-2 px-3 rounded-md text-left text-base font-medium text-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-100" role="menuitem">sign out</button>
      </div>
    </>
  ) : (
      <>
        <Link to='/signup' className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 focus:bg-blue-700">
          Sign up
        </Link>
        <p className="mt-4 text-center text-base font-medium text-gray-600">
          Existing customer? <Link to='/login' className="text-blue-600 focus:text-blue-500">Sign in</Link>
        </p>
      </>
    );
}

export default UserSection;