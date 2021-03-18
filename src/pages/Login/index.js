import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'components/Alert'
import { LoginForm, ForgotPasswordForm } from 'components/Auth'
import { cover } from 'image'

function Login() {
  const [showLogin, setShowLogin] = useState(true)
  const [showLogo, setShowLogo] = useState(true)
  const [headerText, setHeaderText] = useState(null)

  const showForgotPW = () => {
    setShowLogin(false)
    setHeaderText('Enter your email to reset your password')
  }

  const loginCallback = () => {
    setShowLogin(true)
    setShowLogo(true)
  }

  const completeForgotPW = () => {
    setHeaderText(null)
    setShowLogo(false)
  }

  const onErrorForgotPW = () => {
    setHeaderText(null)
    setShowLogo(false)
  }

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96 space-y-6'>
          {showLogo && (
            <Link
              to='/'
              className='text-3xl font-extrabold tracking-wide text-gray-700'
            >
              brew(<span className='text-indigo-500'>bean</span>)
            </Link>
          )}

          <Alert />

          {headerText && (
            <h3 className='text-lg text-gray-600 font-semibold'>
              {headerText}
            </h3>
          )}

          {showLogin ? (
            <LoginForm forgotPWCallback={showForgotPW} />
          ) : (
            <ForgotPasswordForm
              errorCallback={onErrorForgotPW}
              callback={completeForgotPW}
              loginCallback={loginCallback}
            />
          )}
        </div>
      </div>

      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={cover.portrait}
          alt='espresso'
        />
      </div>
    </div>
  )
}

export default Login
