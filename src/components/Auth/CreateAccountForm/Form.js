import { useState } from 'react'
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
  goToLoginPage,
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
            className='input'
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
            className='input'
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
            className='input'
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
            className={`disabled:opacity-50 w-full btn btn--primary btn--md ${
              hasAlert ? 'pointer-events-none' : ''
            }`.trimEnd()}
          >
            Create account
          </button>
        </span>
      </div>
      <div className='flex items-center justify-end'>
        <h3 className='text-sm italic text-gray-700'>
          Already have an account?{' '}
          <button
            onClick={goToLoginPage}
            className='focus:underline font-medium not-italic hover:text-indigo-500 text-indigo-600'
          >
            Log in
          </button>
        </h3>
      </div>
    </form>
  )
}
