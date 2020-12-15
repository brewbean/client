import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { useAlert } from 'context/AlertContext'
import Alert from 'components/Alert'
import { validatePassword, passwordRequirements } from 'helper/form'

import coffeeCover from './coffee_cover.jpg'
import Form from './Form'

const CreateAccount = () => {
  const { signup } = useAuth()
  const { closeAlert, hasAlert } = useAlert()
  const [passwordAlerts, setPasswordAlerts] = useState(passwordRequirements)
  const [state, setState] = useState({
    email: '',
    displayName: '',
    password: '',
  })

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
    await signup(state)
    console.log('submit')
  }

  const alerts = Object.values(passwordAlerts).filter(
    ({ isActive }) => isActive
  )

  return (
    <>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <Link
            to='/'
            className='text-3xl leading-9 font-extrabold tracking-widest text-blue-500'
          >
            brew<span className='text-pink-400'>(</span>bean
            <span className='text-pink-400'>)</span>
          </Link>

          <div className='mt-4 space-y-2'>
            <h2 className='text-xl text-gray-900 font-bold'>
              Get started with your new account
            </h2>
            <h3 className='text-md text-gray-700'>
              Create and share coffee reviews, recipes, and much more ☕
            </h3>
          </div>

          <Alert containerStyle='mt-6' />

          <div className='mt-6'>
            <Form
              {...state}
              alerts={alerts}
              onChange={onChange}
              submitSignup={submitSignup}
            />
          </div>
        </div>
      </div>

      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={coffeeCover}
          alt='espresso'
        />
      </div>
    </>
  )
}

export default CreateAccount
