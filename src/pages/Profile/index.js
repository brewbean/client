import axios from 'axios'
import { useState } from 'react'
import { useAuth } from 'context/AuthContext'
import { useAlert, alertType } from 'context/AlertContext'
import { BasicCard } from 'components/Layout/Panel'
import { validatePassword, passwordRequirements } from 'helper/form'
import FormAlert from 'components/FormAlert'
import { AUTH_API } from 'config'
import SmallLoading from './SmallLoading'

const showAlerts = ({ type, text }) => (
  <FormAlert key={text} type={type} text={text} />
)

function Profile() {
  const { barista } = useAuth()
  const { addAlert } = useAlert()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordAlerts, setPasswordAlerts] = useState(passwordRequirements)
  const [error, setError] = useState({
    message: null,
    type: null,
  })
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const clearError = () => {
    setError({
      message: null,
      type: null,
    })
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      if (state.newPassword === state.confirmPassword) {
        // trigger loading animation
        setIsLoading(true)

        await axios.put(
          AUTH_API + '/change-password',
          {
            email: barista.email,
            currentPassword: state.oldPassword,
            newPassword: state.newPassword,
          },
          { withCredentials: true }
        )
        // turn off loading animation
        // set global alert to success

        addAlert({
          type: alertType.SUCCESS,
          header: 'Password successfully changed!',
          close: true,
        })
        setIsLoading(false)
        setIsEditing(false)
        setState({ oldPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        setError({
          message: 'Passwords do not match',
          type: 'mismatch',
        })
      }
    } catch ({ response }) {
      setIsLoading(false)
      if (!response || response?.status === 500) {
        setError({
          message: 'Unable to change password at this time. Try again later.',
          type: 'bad_server',
        })
      } else if (response?.status === 400) {
        setError({
          message: response?.data.message,
          type: 'no_change',
        })
      } else if (response?.status === 401) {
        setError({
          message: 'Incorrect current password',
          type: 'bad_password',
        })
      }
    }
  }

  const cancel = () => {
    clearError()
    setIsEditing(false)
    setState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  const onChange = ({ target }) => {
    if (
      error.type === 'bad_server' ||
      (error.type === 'bad_password' && target.name === 'oldPassword') ||
      (error.type === 'mismatch' && target.name !== 'oldPassword') ||
      (error.type === 'no_change' && target.name !== 'confirmPassword')
    ) {
      clearError()
    }

    if (target.name === 'newPassword') {
      setPasswordAlerts(validatePassword(target.value))
    }

    setState({
      ...state,
      [target.name]: target.value,
    })
  }

  const alerts = Object.values(passwordAlerts).filter(
    ({ isActive }) => isActive
  )

  const inputStyle = {
    default: 'border-gray-300 focus:ring-blue-700 focus:border-blue-700',
    error: 'border-red-300 focus:ring-red-700 focus:border-red-700',
  }

  const isSaveDisabled =
    state.oldPassword === '' ||
    state.newPassword === '' ||
    state.confirmPassword === '' ||
    isLoading ||
    error.type ||
    alerts.length > 0

  return (
    <BasicCard>
      <form onSubmit={save} className='space-y-6 sm:space-y-5'>
        <div className='border-b border-gray-200 sm:border-none pb-6 sm:pb-0'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Profile
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Manage your account information here.
          </p>
        </div>

        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
          <label htmlFor='email' className='text-sm font-medium text-gray-700'>
            Email
          </label>
          <p
            id='email'
            className='text-md text-gray-900 mt-1 sm:mt-0 sm:col-span-2'
          >
            {barista.email}
          </p>
        </div>

        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
          <label
            htmlFor='displayName'
            className='block text-sm font-medium text-gray-700'
          >
            Display name
          </label>
          <p
            id='displayName'
            className='text-md text-gray-900 mt-1 sm:mt-0 sm:col-span-2'
          >
            {barista.display_name}
          </p>
        </div>

        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>

          {isEditing ? (
            <>
              <div className='mt-2 sm:mt-0 sm:col-span-1 space-y-2'>
                <div>
                  <label
                    htmlFor='oldPassword'
                    className={`block text-sm font-medium ${
                      error.type === 'bad_password' ||
                      error.type === 'no_change'
                        ? 'text-red-700'
                        : 'text-gray-900'
                    }`}
                  >
                    Current password
                  </label>
                  <input
                    type='password'
                    id='oldPassword'
                    name='oldPassword'
                    value={state.oldPassword}
                    disabled={isLoading}
                    onChange={onChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                      error.type === 'bad_password' ||
                      error.type === 'no_change'
                        ? inputStyle.error
                        : inputStyle.default
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor='newPassword'
                    className={`block text-sm font-medium ${
                      error.type === 'mismatch' || error.type === 'no_change'
                        ? 'text-red-700'
                        : 'text-gray-900'
                    }`}
                  >
                    New password
                  </label>
                  <input
                    type='password'
                    id='newPassword'
                    name='newPassword'
                    value={state.newPassword}
                    disabled={isLoading}
                    onChange={onChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                      error.type === 'mismatch' || error.type === 'no_change'
                        ? inputStyle.error
                        : inputStyle.default
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className={`block text-sm font-medium ${
                      error.type === 'mismatch'
                        ? 'text-red-700'
                        : 'text-gray-900'
                    }`}
                  >
                    Confirm password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={state.confirmPassword}
                    disabled={isLoading}
                    onChange={onChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                      error.type === 'mismatch'
                        ? inputStyle.error
                        : inputStyle.default
                    }`}
                  />
                </div>
                {error.type && (
                  <p className='text-sm italic text-red-600'>{error.message}</p>
                )}
                {alerts.length > 0 && (
                  <div className='space-y-1'>{alerts.map(showAlerts)}</div>
                )}
              </div>
              <div className='mt-4 sm:mt-0 sm:col-span-1 flex justify-end'>
                <button
                  type='submit'
                  disabled={isSaveDisabled}
                  className={`mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 focus:ring-blue-500 disabled:opacity-50 ${
                    isSaveDisabled ? 'cursor-not-allowed' : 'hover:bg-blue-700'
                  }`.trimEnd()}
                >
                  {isLoading ? (
                    <>
                      <SmallLoading />
                      Processing
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
                <button
                  onClick={cancel}
                  className='inline-flex items-center px-4 py-2 border d shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className='mt-1 sm:mt-0 sm:col-span-2 flex items-center justify-between'>
              <p id='password' className='text-md text-gray-900 leading-none'>
                ***************
              </p>
              <button
                type='button'
                onClick={() => setIsEditing(true)}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Update
              </button>
            </div>
          )}
        </div>
      </form>
    </BasicCard>
  )
}
export default Profile
