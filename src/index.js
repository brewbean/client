import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from 'App'
import './index.css'
import { AlertProvider } from 'context/AlertContext'
import { AuthProvider } from 'context/AuthContext'
import { ModalProvider } from 'context/ModalContext'

if (process.env.NODE_ENV === 'production') {
  // disable react-dev-tools for this project
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value == 'function' ? () => {} : null
    }
  }
}

ReactDOM.render(
  <StrictMode>
    <Router>
      <AlertProvider>
        <ModalProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ModalProvider>
      </AlertProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
)
