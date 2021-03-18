import { useMemo, useEffect, useCallback } from 'react'
import { useQuery } from 'urql'
import RecipeCard from './RecipeCard'
import { GET_ALL_RECIPES } from 'queries'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { useAlert, alertType } from 'context/AlertContext'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'

const Recipes = () => {
  const { isAuthenticated, isVerified } = useAuth()
  const {
    isSuccess,
    isPending,
    open,
    content,
    setContent,
    setModalAlert,
    reset,
  } = useModal()
  const { url } = useRouteMatch()
  const { addAlert } = useAlert()
  const location = useLocation()
  const history = useHistory()

  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_RECIPES,
    context: useMemo(
      () => ({
        fetchOptions: {
          headers: {
            'x-hasura-role': 'all_barista',
          },
        },
      }),
      []
    ),
  })

  useEffect(() => {
    if (location.state?.createdRecipe) {
      addAlert({
        type: alertType.SUCCESS,
        header: 'Recipe successfully created!',
        close: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const triggerUnverifiedModal = useCallback(() => {
    open()
    setModalAlert(false)
    setContent('unverified')
  }, [open, setModalAlert, setContent])

  const navigateToCreate = () => {
    if (isVerified) {
      history.push(`${url}/new`, { fromRecipe: true })
    } else if (isAuthenticated) {
      triggerUnverifiedModal()
    } else {
      open()
      setContent('login', 'You must be logged in to create a recipe')
    }
  }

  useEffect(() => {
    if (!isPending && isSuccess && content === 'login' && isVerified) {
      // need to clear modal settings so that going back
      // to this page doesn't retrigger this effect
      reset()
      history.push(`${url}/new`, { fromRecipe: true })
    }
  }, [isPending, isSuccess, content, isVerified, url, history, reset])

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className='my-8 max-w-7xl mx-auto'>
      <div className='text-center'>
        <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
          Recipes
        </h2>
        <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
          Explore coffee recipes here!
        </div>
        <button
          onClick={navigateToCreate}
          className='my-4 btn btn--primary btn--lg'
        >
          Create Recipe
        </button>
      </div>
      <div className='mt-8 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
        {data && data.recipe.map((x, i) => <RecipeCard key={i} {...x} />)}
      </div>
    </div>
  )
}
export default Recipes
