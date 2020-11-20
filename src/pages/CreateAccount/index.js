import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import { useAlert } from 'context/AlertContext';
import coffeeCover from './coffee_cover.jpg';
import Alert from 'components/Alert';
import FormAlert, { alertType } from 'components/FormAlert';

const CreateAccount = (props) => {
  const { login } = useUser();
  const { closeAlert, hasAlert } = useAlert();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAlerts, setPasswordAlerts] = useState({
    length: { isActive: false, type: alertType.WARNING, text: 'must contain at least 8 characters long' },
    lowercase: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 lowercase character' },
    uppercase: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 uppercase character' },
    number: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 number' },
    special: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 special characters' },
  });

  const onChangeEmail = ({ target }) => {
    if (hasAlert) closeAlert();
    setEmail(target.value)
  }
  const onChangeDisplayName = ({ target }) => {
    if (hasAlert) closeAlert();
    setDisplayName(target.value)
  }
  const onChangePassword = ({ target }) => {
    if (hasAlert) closeAlert();
    const change = { ...passwordAlerts };
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[@$!%*#?&]/g;

    change.length.isActive = target.value.length < 8;
    change.lowercase.isActive = !target.value.match(lowerCaseLetters);
    change.uppercase.isActive = !target.value.match(upperCaseLetters);
    change.number.isActive = !target.value.match(numbers);
    change.special.isActive = !target.value.match(specialCharacters);
    
    setPasswordAlerts(change);
    setPassword(target.value);
  }
  const submitLogin = async e => {
    e.preventDefault();
    await login(email, password);
    console.log('submit');
  }

  const showAlerts = ({ type, text }) => <FormAlert key={text} type={type} text={text} />;

  const alerts = Object.values(passwordAlerts).filter(({ isActive }) => isActive);

  return (
    <>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h1 className="text-3xl leading-9 font-extrabold tracking-widest text-blue-500">brew<span className='text-pink-400'>(</span>bean<span className='text-pink-400'>)</span></h1>

          <div className='mt-4 space-y-2'>
            <h2 className='text-xl text-gray-900 font-bold'>Get started with your new account</h2>
            <h3 className='text-md text-gray-700'>Create and share coffee reviews, recipes, and much more ☕</h3>
          </div>


          <Alert containerStyle='mt-6' />

          <div className="mt-6">
            <form className="space-y-2" onSubmit={submitLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">email address</label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input type="email" value={email} onChange={onChangeEmail} id="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
              <div>
                <label htmlFor="display-name" className="block text-sm font-medium leading-5 text-gray-700">display name</label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input type="text" value={displayName} onChange={onChangeDisplayName} id="display-name" required minLength="3" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">password</label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input type="password" value={password} onChange={onChangePassword} id="password" autoComplete="new-password" required minLength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
                {
                  alerts.length > 0 && (
                    <div className='mt-2 space-y-1'>
                      {alerts.map(showAlerts)}
                    </div>
                  )
                }
              </div>
              <div>
                <span className="pt-2 block w-full rounded-md shadow-sm">
                  <button disabled={hasAlert} type="submit" className={`disabled:opacity-50 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ${!hasAlert ? 'hover:bg-blue-500' : 'cursor-not-allowed'}`.trimEnd()}>
                    create account
                 </button>
                </span>
              </div>
              <div className="my-3 flex items-center justify-end">
                <h3 className='text-sm italic text-gray-700'>Already have an account? <Link to='/login' className='not-italic hover:underline text-blue-600'>Log in</Link></h3>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src={coffeeCover} alt="espresso" />
      </div>
    </>
  )
}

export default CreateAccount;