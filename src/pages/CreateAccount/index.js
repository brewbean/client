import { Link } from 'react-router-dom'
import Alert from 'components/Alert'
import { CreateAccountForm } from 'components/Auth'
import { cover } from 'image'

const CreateAccount = () => (
  <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex'>
    <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
      <div className='mx-auto w-full max-w-sm lg:w-96'>
        <Link
          to='/'
          className='text-3xl leading-9 font-extrabold tracking-widest text-blue-500'
        >
          brew<span className='text-pink-400'>(</span>bean
          <span className='text-pink-400'>)</span>
        </Link>

        <div className='mt-4 space-y-2'>
          <h2 className='text-xl text-gray-900 font-bold'>
            Get started with your new account
          </h2>
          <h3 className='text-md text-gray-700'>
            Create and share coffee reviews, recipes, and much more ☕
          </h3>
        </div>

        <Alert containerStyle='mt-6' />

        <div className='mt-6'>
          <CreateAccountForm />
        </div>
      </div>
    </div>

    <div className='hidden lg:block relative w-0 flex-1'>
      <img
        className='absolute inset-0 h-full w-full object-cover'
        src={cover.alt}
        alt='espresso'
      />
    </div>
  </div>
)

export default CreateAccount
