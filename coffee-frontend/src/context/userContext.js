import React, { useState, useEffect, createContext } from 'react';


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: 'test',
    })

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }