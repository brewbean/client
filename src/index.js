import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'App';
import 'tailwind.generated.css';
import { UserProvider } from 'context/UserContext';
import { AlertProvider } from 'context/AlertContext';

/**
 * Any path that only supports being authenticated (ex. /profile/jimmy)
 * Behavior -> if logged out, these routes will go to login
 * The alternative is a page that still works when you are not logged in (guest mode available)
 */
const authOnlyPaths = [
  { path: '/test/:id' },
];

ReactDOM.render(
  <StrictMode>
    <Router>
      <AlertProvider>
        <UserProvider authOnlyPaths={authOnlyPaths}>
          <App />
        </UserProvider>
      </AlertProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);


