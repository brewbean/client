import { useMemo } from 'react'
import { GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW, DELETE_RECIPES } from 'queries'
import { useQuery, useMutation } from 'urql'
import RecipeReview from './Review/RecipeReview'
import { useHistory, useParams, Link, useRouteMatch } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'
import CreateRecipeReview from './Review/CreateRecipeReview'
import { useAuth } from 'context/AuthContext'

const RecipeDetails = (props) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { id } = useParams()
  const [, deleteRecipe] = useMutation(DELETE_RECIPES)
  const { barista: userBarista } = useAuth()
  const deleteRecipePressed = async () => {
    await deleteRecipe({ id })
    history.push(`/recipe`)
  }

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
    brew_type,
    bean_weight,
    bean_grind,
    water_amount,
    water_temp,
    // comment,
    about,
    name,
    instructions,
    barista,
    date_added,
    // bean,
    bean_name_free,
    recipe_reviews,
    recipe_reviews_aggregate,
  } = data.recipes_by_pk
  return (
    <div className='min-h-screen bg-gray-100'>
      <main className='py-10'>
        {/*<!-- Page header -->*/}
        <div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
          <div className='flex items-center space-x-5'>
            <div className='flex-shrink-0'>
              <div className='relative'>
                <img
                  className='h-16 w-16 rounded-full'
                  src='data:image/jpeg;base64,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'
                  alt=''
                />
                <span
                  className='absolute inset-0 shadow-inner rounded-full'
                  aria-hidden='true'
                ></span>
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>{name}</h1>
              <p className='text-sm font-medium text-gray-500'>
                Created by {barista?.display_name} on
                <time dateTime={date_added}>{date_added.substring(0, 10)}</time>
              </p>
            </div>
          </div>
          {userBarista?.id === barista?.id ? (
            <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
              <button
                onClick={deleteRecipePressed}
                type='button'
                className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
              >
                Delete Recipe
              </button>
              <Link
                to={`${url}/edit`}
                type='button'
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
              >
                Edit Recipe
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className='mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
          <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
            {/*<!-- Description list-->*/}
            <section aria-labelledby='applicant-information-title'>
              <div className='bg-white shadow sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h2
                    id='recipe-details-title'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Recipe Details
                  </h2>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'></p>
                </div>
                <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
                  <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Brew Type
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {brew_type}
                      </dd>
                    </div>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Bean Weight
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {bean_weight}g
                      </dd>
                    </div>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Bean Grind
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {bean_grind}
                      </dd>
                    </div>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Water Amount
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {water_amount}g
                      </dd>
                    </div>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Water Temp
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {water_temp}F
                      </dd>
                    </div>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Bean
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {bean_name_free}
                      </dd>
                    </div>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Rating
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {roundToHalfOrWhole(
                          recipe_reviews_aggregate.aggregate.avg.rating
                        )}
                        /5
                      </dd>
                    </div>
                    <div className='sm:col-span-2'>
                      <dt className='text-sm font-medium text-gray-500'>
                        About
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>{about}</dd>
                    </div>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Instructions
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {instructions}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/*<!-- Comments-->*/}
            <section aria-labelledby='notes-title'>
              <div className='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
                <div className='divide-y divide-gray-200'>
                  <div className='px-4 py-5 sm:px-6'>
                    <h2
                      id='notes-title'
                      className='text-lg font-medium text-gray-900'
                    >
                      Recipe Reviews
                    </h2>
                  </div>
                  <div className='px-4 py-6 sm:px-6'>
                    {recipe_reviews.length === 0 ? (
                      'No recipe reviews available'
                    ) : (
                      <RecipeReview recipe_reviews={recipe_reviews} />
                    )}
                  </div>
                </div>
                <CreateRecipeReview id={id} />
              </div>
            </section>
          </div>

          <section
            aria-labelledby='timeline-title'
            className='lg:col-start-3 lg:col-span-1'
          >
            <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
              <h2
                id='timeline-title'
                className='text-lg font-medium text-gray-900'
              >
                Stages
              </h2>

              {/*<!-- Activity Feed -->*/}

              <div className='mt-6 flex flex-col justify-stretch'>
                <Link
                  to={`/recipe-player`}
                  type='button'
                  className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Go to Recipe Player
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default RecipeDetails
