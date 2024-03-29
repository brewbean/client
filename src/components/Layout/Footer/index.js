import { Link } from 'react-router-dom'

const links = [
  {
    text: 'About',
    to: '/about',
  },
  {
    text: 'Privacy',
    to: '/privacy',
  },
  {
    text: 'Terms',
    to: '/terms',
  },
  {
    text: 'Contact us',
    to: '/contact-us',
  },
]

export default function Footer() {
  return (
    <footer className='py-3 sm:py-5 sm:flex sm:justify-between mt-6 lg:mt-16 border-t'>
      <nav
        className='flex flex-col items-center space-y-1 sm:flex-row sm:space-y-0 sm:space-x-8'
        aria-label='Footer'
      >
        {links.map(({ text, to }) => (
          <Link
            key={to}
            to={to}
            className='text-sm font-medium text-gray-400 focus:outline-none hover:text-gray-700'
          >
            {text}
          </Link>
        ))}
      </nav>
      <div className='text-center text-gray-400 text-sm pt-2 sm:pt-0'>
        &copy; 2021 Brewbean, Inc. All rights reserved.
      </div>
    </footer>
  )
}
