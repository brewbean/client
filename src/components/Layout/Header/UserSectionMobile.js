import { Link } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { PlaceHolder } from 'components/Icon'

const UserSectionMobile = ({ links }) => {
  const { isAuthenticated, barista, logout } = useAuth()

  return isAuthenticated ? (
    <>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          {barista.avatar ? (
            <img
              className='h-10 w-10 rounded-full'
              src={barista.avatar}
              alt='user avatar'
            />
          ) : (
            <PlaceHolder className='h-10 w-10' />
          )}
        </div>
        <div className='ml-3'>
          <div className='text-base tracking-wider font-medium leading-6 text-gray-800'>
            {barista.display_name}
          </div>
          <div className='text-sm font-medium leading-5 text-gray-500'>
            {barista.email}
          </div>
        </div>
      </div>
      <div
        className='mt-3 flex flex-col justify-start space-y-1'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='user-menu'
      >
        {links.map(({ to, text }) => (
          <Link
            key={to}
            to={to}
            className='py-1 px-3 rounded-md text-left text-base font-medium text-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-100'
            role='menuitem'
          >
            {text}
          </Link>
        ))}
        <button
          onClick={logout}
          className='py-1 px-3 rounded-md text-left text-base font-medium text-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-100'
          role='menuitem'
        >
          Log out
        </button>
      </div>
    </>
  ) : (
    <>
      <Link to='/create-account' className='w-full btn btn--primary btn--lg'>
        Create account
      </Link>
      <Link
        to='/login'
        className='mt-2 py-2 w-full flex items-center justify-center text-base font-medium text-indigo-600 focus:text-indigo-500'
      >
        Log in
      </Link>
    </>
  )
}

export default UserSectionMobile
