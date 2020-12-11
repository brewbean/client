import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'context/AlertContext'
import FormAlert from 'components/FormAlert'
import { Eye, EyeOff } from 'components/Icon'

const showAlerts = ({ type, text }) => (
  <FormAlert key={text} type={type} text={text} />
)

export default function Form({
  submitSignup,
  alerts,
  email,
  displayName,
  password,
  onChange,
}) {
  const { hasAlert } = useAlert() // global app alerts not password form alerts
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)

  return (
    <form className='space-y-2' onSubmit={submitSignup}>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-5 text-gray-700'
        >
          Email address
        </label>
        <div className='mt-2 rounded-md shadow-sm'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            id='email'
            autoComplete='email'
            required
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
          />
        </div>
      </div>
      <div>
        <label
          htmlFor='display-name'
          className='block text-sm font-medium leading-5 text-gray-700'
        >
          Display name
        </label>
        <div className='mt-2 rounded-md shadow-sm'>
          <input
            type='text'
            name='displayName'
            value={displayName}
            onChange={onChange}
            id='display-name'
            required
            minLength='3'
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
          />
        </div>
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium leading-5 text-gray-700'
        >
          Password
        </label>
        <div className='mt-2 relative rounded-md shadow-sm'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={password}
            onChange={onChange}
            id='password'
            autoComplete='new-password'
            required
            minLength='8'
            pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
          />
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
            <button
              type='button'
              onClick={toggleShowPassword}
              className='text-gray-500 hover:text-gray-800 focus:outline-none'
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5' />
              ) : (
                <Eye className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>
        {alerts.length > 0 && (
          <div className='mt-2 space-y-1'>{alerts.map(showAlerts)}</div>
        )}
      </div>
      <div>
        <span className='pt-2 block w-full rounded-md shadow-sm'>
          <button
            disabled={hasAlert}
            type='submit'
            className={`disabled:opacity-50 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ${
              !hasAlert ? 'hover:bg-blue-500' : 'cursor-not-allowed'
            }`.trimEnd()}
          >
            Create account
          </button>
        </span>
      </div>
      <div className='my-3 flex items-center justify-end'>
        <h3 className='text-sm italic text-gray-700'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='focus:underline font-medium not-italic hover:text-blue-500 text-blue-600'
          >
            Log in
          </Link>
        </h3>
      </div>
    </form>
  )
}
