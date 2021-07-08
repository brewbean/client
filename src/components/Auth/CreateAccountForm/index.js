import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { useAlert } from 'context/AlertContext'
import { validatePassword, passwordRequirements } from 'helper/form'

import Form from './Form'

const CreateAccountForm = ({ callback, loginCallback }) => {
  const { signup } = useAuth()
  const { closeAlert, hasAlert } = useAlert()
  const [passwordAlerts, setPasswordAlerts] = useState(passwordRequirements)
  const [state, setState] = useState({
    email: '',
    displayName: '',
    password: '',
  })

  const history = useHistory()

  const onChange = ({ target }) => {
    if (hasAlert) closeAlert()
    if (target.name === 'password') {
      setPasswordAlerts(validatePassword(target.value))
    }
    setState({
      ...state,
      [target.name]: target.value,
    })
  }

  const submitSignup = async (e) => {
    e.preventDefault()
    await signup(state, callback)
  }

  const goToLoginPage = () => {
    if (hasAlert) closeAlert()
    if (loginCallback) {
      loginCallback()
    } else {
      history.push('/login')
    }
  }

  const alerts = Object.values(passwordAlerts).filter(
    ({ isActive }) => isActive
  )

  return (
    <Form
      {...state}
      alerts={alerts}
      onChange={onChange}
      submitSignup={submitSignup}
      goToLoginPage={goToLoginPage}
    />
  )
}

export default CreateAccountForm
