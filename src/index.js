import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'App';
import 'tailwind.generated.css';
import { UserProvider } from 'context/userContext';



ReactDOM.render(
  <StrictMode>
    <Router>
      <UserProvider authPaths={['/test']}>
        <App />
      </UserProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);


