import axios from 'axios'
import { useState } from 'react'
import { validatePassword, passwordRequirements } from 'helper/form'
import FormAlert from 'components/FormAlert'
import { ButtonLoading } from 'components/Utility'
import { AUTH_API } from 'config'

const showAlerts = ({ type, text }) => (
  <FormAlert key={text} type={type} text={text} />
)

function Form({ code, email, onSuccess, onFail }) {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordAlerts, setPasswordAlerts] = useState(passwordRequirements)
  const [errorMsg, setErrorMsg] = useState(null)
  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
  })

  const submitPassword = async (e) => {
    e.preventDefault()
    try {
      if (state.password === state.confirmPassword) {
        // trigger loading animation
        setIsLoading(true)

        await axios.put(AUTH_API + '/password/reset', {
          code,
          email,
          password: state.password,
        })

        setIsLoading(false)
        setState({ password: '', confirmPassword: '' })
        onSuccess()
      } else {
        setErrorMsg('Passwords do not match')
      }
    } catch ({ response }) {
      setIsLoading(false)
      onFail(response)
    }
  }

  const onChange = ({ target }) => {
    if (errorMsg) {
      setErrorMsg(null)
    }

    if (target.name === 'password') {
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

  const isSubmitDisabled =
    state.password === '' ||
    state.confirmPassword === '' ||
    isLoading ||
    errorMsg ||
    alerts.length > 0

  return (
    <form onSubmit={submitPassword} className='space-y-6 sm:space-y-5 mb-0'>
      <h3 className='text-lg text-center font-medium text-gray-900'>
        Enter a new password
      </h3>

      <div className='space-y-3'>
        <div>
          <label
            htmlFor='password'
            className={`block text-sm font-medium ${
              errorMsg ? 'text-red-700' : 'text-gray-900'
            }`}
          >
            New password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={state.password}
            disabled={isLoading}
            onChange={onChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
              errorMsg ? inputStyle.error : inputStyle.default
            }`}
          />
        </div>
        <div>
          <label
            htmlFor='confirmPassword'
            className={`block text-sm font-medium ${
              errorMsg ? 'text-red-700' : 'text-gray-900'
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
              errorMsg ? inputStyle.error : inputStyle.default
            }`}
          />
        </div>
        {errorMsg && <p className='text-sm italic text-red-600'>{errorMsg}</p>}
        {alerts.length > 0 && (
          <div className='space-y-1'>{alerts.map(showAlerts)}</div>
        )}
      </div>
      <div className='flex justify-center'>
        <button
          type='submit'
          disabled={isSubmitDisabled}
          className={`inline-flex items-center justify-center w-full py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 focus:ring-blue-500 disabled:opacity-50 ${
            isSubmitDisabled ? 'cursor-not-allowed' : 'hover:bg-blue-700'
          }`.trimEnd()}
        >
          {isLoading ? (
            <>
              <ButtonLoading />
              Processing
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  )
}
export default Form
