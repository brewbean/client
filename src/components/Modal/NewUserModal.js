import { Transition } from '@headlessui/react'
import { useAuth } from 'context/AuthContext'

export default function NewUserModal() {
  const { isIntroModalOpen, closeIntroModal } = useAuth()
  return (
    <Transition show={isIntroModalOpen}>
      <div className='fixed z-10 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          {/* <!-- Background overlay, show/hide based on  state. --> */}
          <Transition.Child
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
          </Transition.Child>

          <Transition.Child
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            {/* <!-- This element is to trick the browser into centering the  contents. --> */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div
              className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
              role='dialog'
              aria-modal='true'
              aria-labelledby='-headline'
            >
              <div>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
                  {/* <!-- Heroicon name: check --> */}
                  <svg
                    className='h-6 w-6 text-green-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-5 space-y-2'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='-headline'
                  >
                    Account created!
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Check your email to confirm your new account
                  </p>
                </div>
              </div>
              <div className='mt-5 sm:mt-6'>
                <button
                  onClick={closeIntroModal}
                  className='w-full btn btn--primary btn--md'
                >
                  Go to Main Page
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  )
}
