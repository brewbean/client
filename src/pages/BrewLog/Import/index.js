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

  const navigateToCreate = (data) => {
    if (isVerified) {
      setState({ ...state, showCreateForm: true, data })
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
        <div>
          <Create defaultValue={state.data} />
        </div>
      ) : state.showSearchRecipe ? (
        <Search navigateToCreate={navigateToCreate} />
      ) : (
        <div>
          <h1>Import</h1>
          <div>Would you like to import a recipe?</div>
          <button
            onClick={navigateToImport}
            className='my-4 btn btn--primary btn--lg'
          >
            Import Recipe
          </button>

          <h1>Create Your Own</h1>
          <div>Would you like to create your own brew log?</div>
          <button
            onClick={() => navigateToCreate()}
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
