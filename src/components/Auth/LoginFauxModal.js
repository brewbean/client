import Alert from 'components/Alert'
import LoginForm from './LoginForm'

function LoginFauxModal({ headerText }) {
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
          <div className='pb-4 border-gray-200 border-b space-y-4 text-center'>
            <h1 className='text-2xl font-extrabold tracking-widest text-blue-500'>
              brew<span className='text-pink-400'>(</span>bean
              <span className='text-pink-400'>)</span>
            </h1>
            {headerText && (
              <h2 className='text-xl text-gray-800'>{headerText}</h2>
            )}
          </div>
          <Alert noShadow containerStyle='my-4' />
          <div className='mt-4'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginFauxModal
