import { useMemo, useEffect } from 'react'
import { GET_RECIPE, DELETE_RECIPE } from 'queries/Recipe'
import { useQuery, useMutation } from 'urql'
import {
  Redirect,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import {
  ActivitySection,
  CommentSection,
  Description,
  TitleSection,
} from 'components/Recipe/Detail'
import { DescriptionSection } from 'components/Layout/Detail'
import { ModifyRow } from 'components/Form/ButtonGroup'
import { useModal } from 'context/ModalContext'
import { placeholder } from 'image'
import { setUrqlHeader } from 'helper/header'

const Detail = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const params = useParams()
  const id = parseInt(params.id)
  const { isAuthenticated, isVerified, barista: user } = useAuth()
  const {
    isSuccess,
    isPending,
    open,
    content,
    setContent,
    reset,
    setKey,
    key,
  } = useModal()

  const [, deleteRecipe] = useMutation(DELETE_RECIPE)

  const onDelete = (recipeName) => () => {
    open()
    setKey(recipeName)
    setContent('delete')
  }

  useEffect(() => {
    const execDelete = async () => {
      await deleteRecipe({
        id,
        name: `${key} [ARCHIVED ${new Date().toLocaleDateString()}]`,
      })
      reset()
      history.push(`/recipe`)
    }
    if (!isPending && isSuccess && content === 'delete') {
      execDelete()
    }
  }, [history, id, content, isPending, isSuccess, reset, key, deleteRecipe])

  const [{ data, fetching, error }] = useQuery({
    query: GET_RECIPE,
    variables: { id },
    context: useMemo(
      () => setUrqlHeader({ 'x-hasura-role': 'all_barista' }),
      []
    ),
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  if (!data?.recipe_by_pk) return null

  const {
    name,
    barista,
    date_added,
    recipe_reviews,
    stages,
    is_private,
    is_deleted,
  } = data.recipe_by_pk

  return is_deleted ? (
    <Redirect to='/recipe' />
  ) : (
    <main>
      {/*<!-- Page header -->*/}
      <div className='md:flex md:items-center md:justify-between md:space-x-5'>
        <TitleSection
          name={barista?.display_name}
          recipeName={name}
          dateAdded={date_added}
          isPrivate={is_private}
          showPrivacyBadge={barista?.id === user?.id}
          img={{ src: placeholder.cup, alt: 'coffee cup' }}
        />
        <ModifyRow
          canModify={isAuthenticated && user.id === barista?.id}
          onDelete={onDelete(name)}
          editPath={`${url}/edit`}
        />
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/*<!-- Description list-->*/}
        <div className='space-y-6 lg:col-span-2'>
          <DescriptionSection title='Recipe Details'>
            <Description {...data.recipe_by_pk} />
          </DescriptionSection>
        </div>

        {/*<!-- Activity Feed -->*/}
        <div className='order-first sm:order-none lg:col-span-1'>
          <ActivitySection stages={stages} playerPath={`${url}/player`} />
        </div>

        {/*<!-- Comments-->*/}
        <div className='lg:col-span-2'>
          <CommentSection
            recipeId={id}
            recipeReviews={recipe_reviews}
            canReview={
              isVerified &&
              !recipe_reviews.find((review) => review.barista.id === user.id)
            }
          />
        </div>
      </div>
    </main>
  )
}

export default Detail
