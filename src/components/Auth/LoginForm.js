import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { useAlert } from 'context/AlertContext'

function LoginForm({ callback, signupCallback, forgotPWCallback }) {
  const { login } = useAuth()
  const { closeAlert, hasAlert } = useAlert()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const onChangeEmail = ({ target }) => {
    if (hasAlert) closeAlert()
    setEmail(target.value)
  }
  const onChangePassword = ({ target }) => {
    if (hasAlert) closeAlert()
    setPassword(target.value)
  }
  const submitLogin = async (e) => {
    e.preventDefault()
    await login(email, password, callback)
  }
  const goToCreateAccount = () => {
    if (signupCallback) {
      signupCallback()
    } else {
      history.push('/create-account')
    }
  }
  const goToForgotPassword = () => {
    if (forgotPWCallback) {
      forgotPWCallback()
    } else {
      history.push('/forgot-password')
    }
  }

  return (
    <form className='space-y-4' onSubmit={submitLogin}>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-5 text-gray-700'
        >
          Email address
        </label>
        <div className='mt-2 rounded-md shadow-sm'>
          <input
            value={email}
            onChange={onChangeEmail}
            id='email'
            type='email'
            autoComplete='email'
            required
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
        <div className='mt-2 rounded-md shadow-sm'>
          <input
            value={password}
            onChange={onChangePassword}
            id='password'
            autoComplete='current-password'
            type='password'
            required
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
          />
        </div>
      </div>
      <div>
        <span className='pt-2 block w-full rounded-md shadow-sm'>
          <button
            disabled={hasAlert}
            type='submit'
            className={`disabled:opacity-50 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ${
              !hasAlert ? 'hover:bg-blue-500' : 'cursor-not-allowed'
            }`}
          >
            Log in
          </button>
        </span>
      </div>
      <div className='my-3 flex items-center justify-between'>
        <button
          onClick={goToCreateAccount}
          className='text-sm leading-5 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150'
        >
          Create account
        </button>
        <button
          onClick={goToForgotPassword}
          className='text-sm leading-5 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150'
        >
          Forgot your password?
        </button>
      </div>
    </form>
  )
}

export default LoginForm
