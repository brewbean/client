import axios from 'axios'
import { useState } from 'react'
import { useAuth } from 'context/AuthContext'
import { useAlert, alertType } from 'context/AlertContext'
import { BasicCard } from 'components/Layout/Panel'
import AlertMessage from 'components/Alert/AlertMessage'
import { validatePassword, passwordRequirements } from 'helper/form'
import FormAlert from 'components/FormAlert'
import { AUTH_API } from 'config'
import { ButtonLoading } from 'components/Utility'
import { createUnverifiedAlert } from 'helper/auth'
import { combineClass } from 'helper/stringHelper'

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
          AUTH_API + '/password/update',
          {
            email: barista.email,
            currentPassword: state.oldPassword,
            newPassword: state.newPassword,
          },
          { withCredentials: true }
        )

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

        {!barista.is_verified && (
          <AlertMessage
            {...createUnverifiedAlert(barista.email)}
            noShadow
            close={false}
          />
        )}

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
                    className={combineClass('mt-1 input', {
                      'input--state-error':
                        error.type === 'bad_password' ||
                        error.type === 'no_change',
                    })}
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
                    className={combineClass('mt-1 input', {
                      'input--state-error':
                        error.type === 'mismatch' || error.type === 'no_change',
                    })}
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
                    className={combineClass('mt-1 input', {
                      'input--state-error': error.type === 'mismatch',
                    })}
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
                  className={combineClass(
                    'disabled:opacity-50 mr-2 btn btn--primary btn--md',
                    {
                      'pointer-events-none': isSaveDisabled,
                    }
                  )}
                >
                  {isLoading ? (
                    <>
                      <ButtonLoading />
                      Processing
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
                <button onClick={cancel} className='btn btn--white btn--md'>
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
                className='btn btn--primary btn--md'
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
