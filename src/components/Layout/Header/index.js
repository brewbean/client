import { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import Alert from 'components/Alert'
import UserSection from './UserSection'
import UserSectionMobile from './UserSectionMobile'

const links = [
  {
    text: 'pour over app',
    to: '/brewtrak',
  },
  {
    text: 'discover brews',
    to: '/recipe',
  },
  {
    text: 'buy beans',
    to: '/bean',
  },
  {
    text: 'recipe player',
    to: '/recipe-player',
  },
]

const settingLinks = [
  {
    text: 'Profile',
    to: '/profile',
  },
]

const Header = () => {
  const { path } = useRouteMatch()
  const [isOpen, setToggle] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    // closes mobile menu/dropdown whenever a link is clicked
    setToggle(false)
    setDropdownOpen(false)
  }, [path])

  return (
    <nav className='flex-none bg-white sticky top-0 shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link
                to='/'
                className='text-lg font-extrabold tracking-widest text-blue-500'
              >
                brew<span className='text-pink-400'>(</span>bean
                <span className='text-pink-400'>)</span>
              </Link>
            </div>
            <div className='hidden sm:-my-px sm:ml-6 sm:flex'>
              {links.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`navlink ${
                    path === link.to
                      ? 'navlink--state-active'
                      : 'navlink--state-inactive'
                  } ${i > 0 ? 'ml-8' : ''}`.trimEnd()}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <UserSection
            links={settingLinks}
            isDropdownOpen={isDropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />

          <div className='-mr-2 flex items-center sm:hidden'>
            <button
              onClick={() => setToggle(!isOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
            >
              <svg
                className={`${!isOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Change to block to see dropdown and hidden to hide - MOBILE */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className='flex flex-col pt-2 pb-3'>
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`menu__link ${
                path === link.to
                  ? 'menu__link--state-active'
                  : 'menu__link--state-inactive'
              } ${i > 0 ? 'mt-1' : ''}`.trimEnd()}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className='p-4 border-t border-gray-200'>
          <UserSectionMobile links={settingLinks} />
        </div>
      </div>

      <div className='top-0 relative'>
        <Alert
          disableKey='header'
          containerStyle='px-2 lg:px-0 max-w-5xl absolute inset-0 mx-auto mt-2 space-y-2'
        />
      </div>
    </nav>
  )
}

export default Header
