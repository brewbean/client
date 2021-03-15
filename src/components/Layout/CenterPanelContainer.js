import { Link } from 'react-router-dom'

const CenterPanelContainer = ({ disableLogo, children }) => (
  <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
    <div className='absolute top-0 mt-10'>
      <Link
        to='/'
        className={`text-2xl font-extrabold tracking-wide text-gray-700 ${
          disableLogo ? 'pointer-events-none' : ''
        }`.trimEnd()}
      >
        brew(<span className='text-indigo-500'>bean</span>)
      </Link>
    </div>
    <div className='p-4 sm:px-6'>
      <div className='bg-white shadow sm:rounded-lg max-w-sm'>{children}</div>
    </div>
  </div>
)

export default CenterPanelContainer
