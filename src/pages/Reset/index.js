import qs from 'qs'
import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Form from './Form'

function Reset() {
  const { search } = useLocation()
  const { code, email } = qs.parse(search, { ignoreQueryPrefix: true })

  const [showForm, setShowForm] = useState(code && email ? true : false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [title, setTitle] = useState(code && email ? null : 'Bad link!')
  const [subtext, setSubtext] = useState(
    code && email ? null : 'Please check your email again.'
  )

  const onSuccess = () => {
    setShowForm(false)
    setIsSuccess(true)
    setTitle('Password successfully changed!')
    setSubtext('You may now log in with your new credentials.')
  }
  const onFail = (response) => {
    setShowForm(false)
    setIsSuccess(false)
    setTitle('Error resetting password!')
    setSubtext(response.data?.message)
  }

  return (
    <div className='flex-1 flex items-center justify-center'>
      <div className='absolute top-0 mt-10'>
        <Link
          to='/'
          className={`text-2xl font-extrabold tracking-widest text-blue-500 ${
            showForm ? 'pointer-events-none' : ''
          }`.trimEnd()}
        >
          brew<span className='text-pink-400'>(</span>bean
          <span className='text-pink-400'>)</span>
        </Link>
      </div>
      <div className='bg-white shadow rounded sm:rounded-lg w-full sm:w-1/3'>
        <div className='px-4 py-5 sm:p-8'>
          {showForm ? (
            <Form
              onSuccess={onSuccess}
              onFail={onFail}
              code={code}
              email={email}
            />
          ) : (
            <>
              <div className='pb-5'>
                {isSuccess ? (
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

              {title && (
                <h3 className='text-lg text-center font-medium text-gray-900'>
                  {title}
                </h3>
              )}
              {subtext && (
                <div className='mt-2 max-w-xl text-sm text-gray-500 text-center'>
                  <p>{subtext}</p>
                </div>
              )}

              {isSuccess && (
                <div className='mt-5 flex justify-center'>
                  <Link
                    to='/'
                    className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
                  >
                    Go to home page
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Reset