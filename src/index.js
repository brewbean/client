import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from 'App'
import 'tailwind.generated.css'
import { AlertProvider } from 'context/AlertContext'
import { AuthProvider } from 'context/AuthContext'

const authOnlyPaths = [{ path: '/test/:id' }]

ReactDOM.render(
  <StrictMode>
    <Router>
      <AlertProvider>
        <AuthProvider authOnlyPaths={authOnlyPaths}>
          <App />
        </AuthProvider>
      </AlertProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
)
