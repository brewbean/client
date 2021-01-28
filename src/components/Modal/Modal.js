import { Transition } from '@headlessui/react'
import { useModal } from 'context/ModalContext'
import { X } from 'components/Icon'
import { CreateAccountForm, LoginForm } from 'components/Auth'
import { useLocation } from 'react-router-dom'
import { useEffect, useCallback, useRef } from 'react'
import Alert from 'components/Alert'
import { useAlert } from 'context/AlertContext'
/**
 * onClose -> click away or press 'X' button
 * onSuccess -> login successful, whatever render action should happen now
 * able to show a forgot password form
 * able to show a create account form
 * Globally used -> like alerts
 */
function Modal() {
  const {
    isVisible,
    close,
    exit,
    success,
    content,
    text,
    setContent,
  } = useModal()
  const { setDisabled, clearAlerts } = useAlert()

  const location = useLocation()
  const modalRef = useRef(null)

  const exitClose = useCallback(() => {
    exit()
    close()
  }, [exit, close])

  const successClose = () => {
    success()
    close()
  }

  const goToSignup = () => setContent('signup', 'Create an account')
  const goToLogin = () => setContent('login', 'Log in to your account')

  useEffect(() => {
    if (isVisible) {
      setDisabled('header')
    } else {
      clearAlerts()
      setDisabled(null)
    }
  }, [isVisible, setDisabled, clearAlerts])

  useEffect(exitClose, [exitClose, location])

  useEffect(() => {
    function handleClickOutside(event) {
      if (!modalRef?.current?.contains(event.target)) {
        exitClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [exitClose, modalRef])

  return (
    <Transition show={isVisible}>
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
              className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
              role='dialog'
              aria-modal='true'
              ref={modalRef}
            >
              <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                <button
                  onClick={exitClose}
                  className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='sr-only'>Close</span>
                  {/* <!-- Heroicon name: x --> */}
                  <X />
                </button>
              </div>
              {text && (
                <div className='sm:mt-4 pb-4 border-gray-200 border-b'>
                  <h2 className='text-xl text-gray-800'>{text}</h2>
                </div>
              )}

              <Alert noShadow containerStyle='my-4' />

              <div className='mt-4'>
                {content === 'login' ? (
                  <LoginForm
                    callback={successClose}
                    signupCallback={goToSignup}
                  />
                ) : content === 'signup' ? (
                  <CreateAccountForm
                    callback={successClose}
                    loginCallback={goToLogin}
                  />
                ) : null}
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  )
}

export default Modal
