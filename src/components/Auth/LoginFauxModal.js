import Alert from 'components/Alert'
import LoginForm from './LoginForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import { useAlert } from 'context/AlertContext'
import { useEffect, useState } from 'react'

function LoginFauxModal() {
  const { setDisabled, clearAlerts } = useAlert()
  const [isLogin, setIsLogin] = useState(true)
  const [header, setHeader] = useState('')

  useEffect(() => {
    setDisabled('header')
    // clear the disabled alert key after done with page
    return () => setDisabled(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLogin) {
      setHeader('You must login to view this page')
    } else {
      setHeader('Enter your login email to get a password reset email')
    }

    clearAlerts()
  }, [isLogin, clearAlerts])

  return (
    <div className='fixed inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-100'></div>
        </div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className='w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          {header !== '' && (
            <div className='pb-4 mb-4 border-gray-200 border-b space-y-4 text-center'>
              <h1 className='text-2xl font-extrabold tracking-wide text-gray-700'>
                brew(<span className='text-indigo-500'>bean</span>)
              </h1>
              <h2 className='text-xl text-gray-800'>{header}</h2>
            </div>
          )}

          <Alert noShadow containerStyle='my-4' />

          {isLogin ? (
            <LoginForm forgotPWCallback={() => setIsLogin(false)} />
          ) : (
            <ForgotPasswordForm
              callback={() => setHeader('')}
              loginCallback={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginFauxModal
