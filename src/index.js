import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from 'App'
import 'tailwind.generated.css'
import { AlertProvider } from 'context/AlertContext'
import { AuthProvider } from 'context/AuthContext'
import { ModalProvider } from 'context/ModalContext'

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
