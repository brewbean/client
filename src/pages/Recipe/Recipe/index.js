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
    <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
      <div className='absolute inset-0'>
        <div className='bg-white h-1/3 sm:h-2/3'></div>
      </div>
      <div className='relative max-w-7xl mx-auto'>
        <div className='text-center'>
          <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            Recipes
          </h2>
          <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
            Explore coffee recipes here!
          </div>
          <button
            onClick={navigateToCreate}
            className='mb-4 mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
          >
            Create Recipe
          </button>
        </div>
        <div className='mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
          {data && data.recipes.map((x, i) => <RecipeCard key={i} {...x} />)}
        </div>
      </div>
    </div>
  )
}
export default Recipes
