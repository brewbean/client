import { Link } from 'react-router-dom';

const links = [
  {
    text: 'About',
    to: '/about'
  },
  {
    text: 'Privacy Policy',
    to: '/privacy-policy'
  },
  {
    text: 'Changelog',
    to: '/changelog'
  },
  {
    text: 'Contact Us',
    to: '/contact-us'
  },
];

export default function Footer() {
  return (
    <footer className='py-3 sm:py-5 bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:justify-between'>
          <nav className='flex flex-col items-center space-y-1 sm:flex-row sm:space-y-0 sm:space-x-8' aria-label='Footer'>
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
            &copy; 2020 Brewbean, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}