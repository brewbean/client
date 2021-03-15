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
        <div className='mt-2 rounded-md shadow-sm'>
          <input
            value={password}
            onChange={onChangePassword}
            id='password'
            autoComplete='current-password'
            type='password'
            required
            className='input'
          />
        </div>
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
            Log in
          </button>
        </span>
      </div>
      <div className='my-3 flex items-center justify-between'>
        <button
          onClick={goToCreateAccount}
          className='text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
        >
          Create account
        </button>
        <button
          onClick={goToForgotPassword}
          className='text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
        >
          Forgot your password?
        </button>
      </div>
    </form>
  )
}

export default LoginForm
