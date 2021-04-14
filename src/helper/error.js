import { alertType } from 'context/AlertContext'

export const authenticateError = (addAlert, error) => {
  if (!error.response && error.message === 'Network Error') {
    addAlert({
      type: alertType.ERROR,
      header: error.message,
      message: 'Our servers or your internet may be down at this time.',
    })
  } else if (error.response.status === 429) {
    addAlert({
      type: alertType.ERROR,
      header: error.response.statusText,
      message: 'Try again in an hour.',
    })
  } else {
    addAlert({
      type: alertType.ERROR,
      header: error.response.data.message,
      message: 'Please retry logging in',
    })
  }
}
