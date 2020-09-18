import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './tailwind.generated.css';

import { UserProvider } from './context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


