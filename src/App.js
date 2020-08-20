import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './components/BrewTrak/';
import { UserProvider } from './context/userContext';
import Header from './components/Header';
import Modal from './components/Modal';
import Login from './pages/Login';
import PourGuide from './pages/PourGuide';
import Recipe from './pages/Recipe';


function TestPage() {
  const history = useHistory();
  const [modalToggle, setToggle] = useState(false);
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="bg-gray-50 flex-1 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => history.push('/timer')}
            type="button" 
            className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
            timer
          </button>
          <button
            onClick={() => setToggle(true)}
            type="button" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
            login
          </button>
        </div>
      </div>
      <Modal isOpen={modalToggle} close={() => setToggle(false)}>
        <Login />
      </Modal>
    </div>
  )
}

function App() {
  

  return (
    <>
      {/* NON-USER EXPERIENCE */}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/pour-app' component={PourGuide} />
        <Route path='/recipe' component={Recipe} />
      </Switch>
      {/* USER EXPERIENCE */}
      <UserProvider>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/test' component={TestPage} />
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
