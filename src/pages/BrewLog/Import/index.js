import { useCallback, useState } from 'react'
// import { useHistory, useRouteMatch } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import Search from './Search'
import Create from '../Create'
const Import = () => {
  // const history = useHistory()
  // const { url } = useRouteMatch()
  const { isAuthenticated, isVerified } = useAuth()
  const { open, setContent, setModalAlert } = useModal()

  const [state, setState] = useState({
    // Use this might need to change to reducer
    showSearchRecipe: false,
    showCreateForm: false,
    isImport: false,
    data: {},
  })

  const navigateToImport = () => {
    if (isVerified) {
      setState({ ...state, showSearchRecipe: true })
    } else if (isAuthenticated) {
      triggerUnverifiedModal()
    } else {
      open()
      setContent('login', 'You must be logged in to create a recipe')
    }
  }

  const navigateToCreate = (data, isImport = false) => {
    if (isVerified) {
      setState({ ...state, showCreateForm: true, data, isImport })
    } else if (isAuthenticated) {
      triggerUnverifiedModal()
    } else {
      open()
      setContent('login', 'You must be logged in to create a recipe')
    }
  }

  const triggerUnverifiedModal = useCallback(() => {
    open()
    setModalAlert(false)
    setContent('unverified')
  }, [open, setModalAlert, setContent])

  return (
    <>
      {state.showCreateForm ? (
        <div className='sm:col-span-2'>
          <Create recipe={state.data} isImport={state.isImport} />
        </div>
      ) : state.showSearchRecipe ? (
        <Search navigateToCreate={navigateToCreate} />
      ) : (
        <div className='text-center sm:col-span-2'>
          <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            Import
          </h2>
          <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
            Would you like to import a recipe?
          </div>
          <button
            onClick={navigateToImport}
            className='my-4 btn btn--primary btn--lg'
          >
            Import Recipe
          </button>

          <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            Create your own
          </h2>
          <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
            Would you like to create your own brew log?
          </div>
          <button
            onClick={() => navigateToCreate(false)}
            className='my-4 btn btn--primary btn--lg'
          >
            Fresh Brew Log
          </button>
        </div>
      )}
    </>
  )
}

export default Import
