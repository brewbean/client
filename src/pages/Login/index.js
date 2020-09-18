import React, { useState } from 'react';
import coffeeCover from './espresso_cover.jpg'
import { useUser } from '../../context/userContext'

const Login = (props) => {
  const { login } = useUser();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = async e => {
    e.preventDefault()
    await login(email, password)
    console.log('submit')
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">

          <h1 className="text-3xl leading-9 font-extrabold tracking-widest text-blue-500">brew<span className='text-pink-400'>(</span>bean<span className='text-pink-400'>)</span></h1>

          <div className="mt-6">
            <form className="space-y-3" onSubmit={submitLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                  Email address
                </label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input value={email} onChange={({ target }) => setEmail(target.value)} id="email" type="email" autoComplete="username" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                  Password
                </label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input value={password} onChange={({ target }) => setPassword(target.value)} id="password" autoComplete="current-password" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                  <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-5">
                  <p className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Forgot your password?
                  </p>
                </div>
              </div>

              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                    Sign in
                 </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src={coffeeCover} alt="espresso" />
      </div>
    </div>

  )
}

export default Login;