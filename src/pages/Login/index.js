import { Link } from 'react-router-dom'
import coffeeCover from './espresso_cover.jpg'
import Alert from 'components/Alert'
import { LoginForm } from 'components/Auth'

const Login = () => (
  <>
    <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
      <div className='mx-auto w-full max-w-sm lg:w-96'>
        <Link
          to='/'
          className='text-3xl leading-9 font-extrabold tracking-widest text-blue-500'
        >
          brew<span className='text-pink-400'>(</span>bean
          <span className='text-pink-400'>)</span>
        </Link>

        <Alert containerStyle='mt-8' />

        <div className='mt-8'>
          <LoginForm />
        </div>
      </div>
    </div>

    <div className='hidden lg:block relative w-0 flex-1'>
      <img
        className='absolute inset-0 h-full w-full object-cover'
        src={coffeeCover}
        alt='espresso'
      />
    </div>
  </>
)

export default Login
