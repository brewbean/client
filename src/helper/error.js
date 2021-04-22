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

const createError = (addAlert, error, setError, inputField, message) => {
  if (error.message.includes('Uniqueness violation')) {
    setError(inputField, {
      message,
      shouldFocus: true,
    })
  } else {
    addAlert({
      type: alertType.ERROR,
      header: error.message,
      close: true,
    })
  }
}

export const recipeError = (addAlert, error, setError) => {
  createError(
    addAlert,
    error,
    setError,
    'name',
    'This recipe name already exist'
  )
}

export const brewLogError = (addAlert, error, setError) => {
  createError(
    addAlert,
    error,
    setError,
    'title',
    'This brew log title already exist'
  )
}
