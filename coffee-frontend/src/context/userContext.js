import React, { useState, useContext, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {
      name: 'Patrick'
    },
  })

  console.log("INIT")
  // login
  // logout

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )
}

/**
 * Wrapper hook so that we don't need to import UserContext
 * Can add extra status properties here
 */
const useUser = () => {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useUser }