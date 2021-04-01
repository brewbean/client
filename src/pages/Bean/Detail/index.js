import { useMemo } from 'react'
import { useQuery } from 'urql'
import { useParams, useRouteMatch } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW } from 'queries'
import {
  ModifyRow,
  TitleSection,
  Description,
  CommentSection,
} from 'components/Bean/Detail'
import { DescriptionSection } from 'components/Layout/Detail'

const Detail = () => {
  const { id } = useParams()
  const { url } = useRouteMatch()
  const { isAuthenticated, barista } = useAuth()

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
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
    author,
    company_name,
    date_added,
    bean_reviews,
  } = data.bean_by_pk

  return (
    <main>
      {/*<!-- Page header -->*/}
      <div className='md:flex md:items-start md:justify-between md:space-x-5'>
        <TitleSection
          name={name}
          dateAdded={date_added}
          authorName={author?.display_name}
          companyName={company_name}
        />
        <ModifyRow
          canModify={isAuthenticated && barista.id === author?.id}
          editPath={`${url}/edit`}
        />
      </div>

      <div className='mt-6'>
        {/*<!-- Description list-->*/}
        <div className='space-y-6'>
          <DescriptionSection title='Bean Details'>
            <Description {...data.bean_by_pk} />
          </DescriptionSection>
        </div>

        {/*<!-- Comments-->*/}
        <div className='mt-6'>
          <CommentSection
            beanId={id}
            beanReviews={bean_reviews}
            canReview={
              isAuthenticated &&
              !bean_reviews.find((review) => review.barista.id === barista.id) // can't review twice
            }
          />
        </div>
      </div>
    </main>
  )
}

export default Detail
