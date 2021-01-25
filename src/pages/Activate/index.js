import axios from 'axios'
import qs from 'qs'
import { useState, useEffect } from 'react'
import { Loading } from 'components/Utility'
import { Link, useLocation } from 'react-router-dom'
import { VERIFY_API } from 'config'

function Activate() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showResend, setShowResend] = useState(false)
  const [title, setTitle] = useState('Verifying your account...')
  const [subtext, setSubtext] = useState(
    'Your account should be fully verified momentarily.'
  )
  const { search } = useLocation()
  const { code, email } = qs.parse(search, { ignoreQueryPrefix: true })

  useEffect(() => {
    const validate = async () => {
      try {
        console.log(code, email)
        await axios.post(VERIFY_API + '/validate', { code, email })
        setIsLoading(false)
        setIsSuccess(true)
        setTitle('Verified')
        setSubtext('You are now verified and have full user privileges.')
      } catch ({ response }) {
        console.log('here')
        setIsLoading(false)
        if (response.status === 400 || response.status === 401) {
          // catch all
          // 401: invalid email - no such user
          setTitle('Error validating')
          setSubtext('Please try your email link again.')
        } else if (response.status === 410) {
          if (response.data.message === 'barista already verified') {
            // already done
            setIsSuccess(true)
            setTitle('Verified')
            setSubtext('Account already verified.')
          } else {
            setTitle('Expired link')
            setSubtext(
              'Your verification link is expired. Please click on the button below to get a new verification email.'
            )
            setShowResend(true)
            // expired (or wrong code - very edge)
          }
        }
        console.log(response)
      }
    }

    if (!code || !email) {
      setIsLoading(false)
      setTitle('Error validating')
      setSubtext('Please try your email link again.')
    } else {
      validate()
    }
    // eslint-disable-next-line
  }, [])

  const resendEmail = () => {
    setIsSuccess(true)
    setShowResend(false)
    setTitle('Email sent!')
    setSubtext('Your new verification email should arrive momentarily.')
    axios.post(VERIFY_API + '/resend', { email })
  }

  return (
    <div className='flex-1 flex items-center justify-center'>
      <div className='absolute top-0 mt-10'>
        <Link
          to='/'
          className={`text-2xl font-extrabold tracking-widest text-blue-500 ${
            isLoading ? 'pointer-events-none' : ''
          }`.trimEnd()}
        >
          brew<span className='text-pink-400'>(</span>bean
          <span className='text-pink-400'>)</span>
        </Link>
      </div>
      <div className='bg-white shadow sm:rounded-lg max-w-sm'>
        <div className='px-4 py-5 sm:p-8'>
          <div className='pb-5'>
            {isLoading ? (
              <Loading sizeClass='h-12 w-12' defaultPadding={false} />
            ) : isSuccess ? (
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
                <svg
                  className='w-6 h-6 text-green-600'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            ) : (
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
                <svg
                  className='w-6 h-6 text-red-600'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            )}
          </div>
          <h3 className='text-lg text-center font-medium text-gray-900'>
            {title}
          </h3>

          <div className='mt-2 max-w-xl text-sm text-gray-500 text-center'>
            <p>{subtext}</p>
          </div>
          {isSuccess && (
            <div className='mt-5 flex justify-center'>
              <Link
                to='/'
                type='button'
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
              >
                Go to home page
              </Link>
            </div>
          )}
          {showResend && (
            <div className='mt-5 flex justify-center'>
              <button
                onClick={resendEmail}
                type='button'
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
              >
                Resend confirmation email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Activate
