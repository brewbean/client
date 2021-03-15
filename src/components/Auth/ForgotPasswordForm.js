import axios from 'axios'
import { useState } from 'react'
import { ButtonLoading } from 'components/Utility'
import { Check, X, ArrowNarrowLeft } from 'components/Icon'
import { AUTH_API } from 'config'

function ForgotPasswordForm({ callback, errorCallback, loginCallback }) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState({
    success: false,
    error: false,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post(AUTH_API + '/password/forgot', { email })
      setIsCompleted({ success: true, error: false })
      setIsLoading(false)
      if (callback) callback()
    } catch ({ response }) {
      setIsLoading(false)
      if (response.status === 400) {
        setIsCompleted({ success: false, error: true })
        if (errorCallback) errorCallback()
      } else {
        setIsCompleted({ success: true, error: false })
        if (callback) callback()
      }
    }
  }

  return !isCompleted.success && !isCompleted.error ? (
    <form onSubmit={onSubmit}>
      <label
        htmlFor='email'
        className='block text-sm font-medium leading-5 text-gray-700'
      >
        Email address
      </label>
      <div className='mt-2 rounded-md shadow-sm'>
        <input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          id='email'
          type='email'
          disabled={isLoading}
          autoComplete='email'
          required
          className='input'
        />
      </div>
      <div className='mt-5 sm:mt-6'>
        <button
          disabled={email === ''}
          type='submit'
          className={`disabled:opacity-50 w-full btn btn--primary btn--md ${
            email === '' ? 'pointer-events-none' : ''
          }`.trimEnd()}
        >
          {isLoading ? (
            <>
              <ButtonLoading />
              Processing
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  ) : isCompleted.success ? (
    <>
      <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
        <Check className='h-6 w-6 text-green-600' />
      </div>
      <div className='mt-3 text-center sm:mt-5 space-y-2'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Reset sent!
        </h3>
        <p className='text-sm text-gray-500'>
          Check your email to finish password reset
        </p>
      </div>
      <div className='mt-5 sm:mt-6'>
        <button
          onClick={loginCallback}
          className='inline-flex items-center font-medium text-indigo-600 hover:text-indigo-400 focus:outline-none text-base sm:text-sm'
        >
          <ArrowNarrowLeft />
          <span className='ml-2'>Log in</span>
        </button>
      </div>
    </>
  ) : (
    <>
      <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
        <X className='h-6 w-6 text-red-600' />
      </div>
      <div className='mt-3 text-center sm:mt-5 space-y-2'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Error sending your reset
        </h3>
        <p className='text-sm text-gray-500'>
          Try again later to get your password reset email
        </p>
      </div>
      <div className='mt-5 sm:mt-6'>
        <button
          onClick={loginCallback}
          className='inline-flex items-center font-medium text-indigo-600 hover:text-indigo-400 focus:outline-none text-base sm:text-sm'
        >
          <ArrowNarrowLeft />
          <span className='ml-2'>Log in</span>
        </button>
      </div>
    </>
  )
}

export default ForgotPasswordForm
