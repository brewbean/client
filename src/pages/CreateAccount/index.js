import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'context/AlertContext';
import Alert from 'components/Alert';
import FormAlert, { alertType } from 'components/FormAlert';
import { Eye, EyeOff } from 'components/Icon';
import coffeeCover from './coffee_cover.jpg';
import SuccessModal from './SuccessModal';

const CreateAccount = () => {
  const { closeAlert, hasAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [hasCompleted, setCompleted] = useState(false);
  const [state, setState] = useState({
    email: '',
    displayName: '',
    password: '',
  });
  const [passwordAlerts, setPasswordAlerts] = useState({
    length: { isActive: false, type: alertType.WARNING, text: 'must contain at least 8 characters long' },
    lowercase: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 lowercase character' },
    uppercase: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 uppercase character' },
    number: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 number' },
    special: { isActive: false, type: alertType.WARNING, text: 'must contain at least 1 special characters' },
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const validatePassword = password => {
    const change = { ...passwordAlerts };
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[@$!%*#?&]/g;

    change.length.isActive = password.length < 8;
    change.lowercase.isActive = !password.match(lowerCaseLetters);
    change.uppercase.isActive = !password.match(upperCaseLetters);
    change.number.isActive = !password.match(numbers);
    change.special.isActive = !password.match(specialCharacters);

    setPasswordAlerts(change);
  }

  const onChange = ({ target }) => {
    if (hasAlert) closeAlert();
    if (target.name === 'password') {
      validatePassword(target.value);
    }
    setState({
      ...state,
      [target.name]: target.value,
    });
  }

  const submitLogin = async e => {
    e.preventDefault();
    // await login(email, password);
    console.log('submit');
    setState({
      email: '',
      displayName: '',
      password: '',
    });
    setCompleted(true);
  }

  const showAlerts = ({ type, text }) => <FormAlert key={text} type={type} text={text} />;

  const alerts = Object.values(passwordAlerts).filter(({ isActive }) => isActive);

  return (
    <>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link to='/' className="text-3xl leading-9 font-extrabold tracking-widest text-blue-500">brew<span className='text-pink-400'>(</span>bean<span className='text-pink-400'>)</span></Link>

          <div className='mt-4 space-y-2'>
            <h2 className='text-xl text-gray-900 font-bold'>Get started with your new account</h2>
            <h3 className='text-md text-gray-700'>Create and share coffee reviews, recipes, and much more ☕</h3>
          </div>

          <Alert containerStyle='mt-6' />

          <div className="mt-6">
            <form className="space-y-2" onSubmit={submitLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email Address</label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input type="email" name='email' value={state.email} onChange={onChange} id="email" autoComplete="email" required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
              <div>
                <label htmlFor="display-name" className="block text-sm font-medium leading-5 text-gray-700">Display Name</label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input type="text" name='displayName' value={state.displayName} onChange={onChange} id="display-name" required minLength="3"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Password</label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input type={showPassword ? "text" : "password"} name='password' value={state.password} onChange={onChange} id="password" autoComplete="new-password" required minLength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" onClick={toggleShowPassword} className='text-gray-500 hover:text-gray-800 focus:outline-none'>
                      {showPassword
                        ? <EyeOff className="h-5 w-5" />
                        : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
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
                    Create Account
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

      <SuccessModal isOpen={hasCompleted} />
    </>
  )
}

export default CreateAccount;