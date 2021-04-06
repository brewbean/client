import { useMemo, useEffect } from 'react'
import { GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW, DELETE_RECIPES } from 'queries'
import { useQuery, useMutation } from 'urql'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import {
  ActivitySection,
  CommentSection,
  Description,
  ModifyRow,
  TitleSection,
} from 'components/Recipe/Detail'
import { DescriptionSection } from 'components/Layout/Detail'
import { useModal } from 'context/ModalContext'
import { placeholder } from 'image'

const Detail = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { id } = useParams()
  const { isAuthenticated, isVerified, barista: user } = useAuth()
  const { isSuccess, isPending, open, content, setContent, reset } = useModal()

  const [, deleteRecipe] = useMutation(DELETE_RECIPES)

  const onDelete = async () => {
    open()
    setContent('delete')
  }

  useEffect(() => {
    const execDelete = async () => {
      await deleteRecipe({ id })
      reset()
      history.push(`/recipe`)
    }
    if (!isPending && isSuccess && content === 'delete') {
      execDelete()
    }
  }, [history, id, content, isPending, isSuccess, reset, deleteRecipe])

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW,
    variables: { id },
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

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const {
    name,
    barista,
    date_added,
    recipe_reviews,
    stages,
  } = data.recipe_by_pk

  return (
    <main>
      {/*<!-- Page header -->*/}
      <div className='md:flex md:items-center md:justify-between md:space-x-5'>
        <TitleSection
          name={barista?.display_name}
          recipeName={name}
          dateAdded={date_added}
          img={{ src: placeholder.cup, alt: 'coffee cup' }}
        />
        <ModifyRow
          canModify={isAuthenticated && user.id === barista?.id}
          onDelete={onDelete}
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
