import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'App';
import 'tailwind.generated.css';
import { AlertProvider } from 'context/AlertContext';



ReactDOM.render(
  <StrictMode>
    <Router>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);


