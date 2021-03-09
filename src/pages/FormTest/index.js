import { useState } from 'react'

const FormErros = ({ errors }) => {
  return (
    <div>
      {Object.keys(errors).map((fieldName, i) => {
        if (errors[fieldName].length > 0) {
          return (
            <p key={i}>
              {fieldName} {errors[fieldName]}
            </p>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}
const FormTest = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    errors: { email: '', password: '' },
    emailValid: false,
    passwordValid: false,
  })
  const validateField = (name, value) => {
    let fieldValidationErrors = state.errors
    let { emailValid, passwordValid } = state
    console.log('Validating Field', name, value)
    switch (name) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        fieldValidationErrors.email = emailValid ? '' : ' is invalid'
        break
      case 'password':
        passwordValid = value.length >= 6
        console.log('Value: ', value)
        console.log('PasswordValid: ', passwordValid)

        fieldValidationErrors.password = passwordValid ? '' : ' is too short'
        break
      default:
        break
    }
    setState({
      ...state,
      errors: fieldValidationErrors,
      emailValid,
      passwordValid,
    })
  }
  const handleOnChange = ({ target }) => {
    const { name, value } = target
    validateField(name, value)
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <div>
      <h1>FormTest Page</h1>
      <label>Email</label>

      <input
        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
        type='email'
        name='email'
        id='email'
        value={state.email}
        onChange={handleOnChange}
      />
      <input
        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
        type='password'
        name='password'
        id='password'
        value={state.password}
        onChange={handleOnChange}
      />
      <FormErros errors={state.errors} />
    </div>
  )
}
export default FormTest
