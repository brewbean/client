import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TagIcon,
} from '@heroicons/react/solid'
import { getCloudinaryURL } from 'image'
import { GET_CAFE } from 'queries/Cafe'
import { useMemo, useRef, useState } from 'react'
import { useQuery } from 'urql'
import Overview from './Overview'
import Rating from './Rating'
import Reviews from './Reviews'
import { ErrorMessage, Loading } from 'components/Utility'
import { setUrqlHeader } from 'helper/header'
import { NotFound } from 'pages/Content'
import { useParams } from 'react-router'

function Main({ data }) {
  const [images] = useState(data.pictures.map(getCloudinaryURL))
  const [imageIndex, setImageIndex] = useState(0)

  const reviewEl = useRef(null)

  const goToReviews = () => {
    reviewEl.current.scrollIntoView()
  }

  return (
    <>
      <div className='relative'>
        <div className='aspect-w-16 aspect-h-9'>
          <img
            className='rounded-lg object-contain'
            src={images[imageIndex]}
            alt='hero'
          />
        </div>

        <div className='inset-0 absolute flex items-center justify-between px-4'>
          <button
            className='rounded-full p-1 bg-white opacity-50 hover:opacity-100 focus:outline-none'
            onClick={() =>
              setImageIndex(
                imageIndex - 1 < 0 ? images.length - 1 : imageIndex - 1
              )
            }
          >
            <ChevronLeftIcon className='h-5 w-5 text-gray-500' />
          </button>
          <button
            className='rounded-full p-1 bg-white opacity-50 hover:opacity-100 focus:outline-none'
            onClick={() => setImageIndex((imageIndex + 1) % images.length)}
          >
            <ChevronRightIcon className='h-5 w-5 text-gray-500' />
          </button>
        </div>
      </div>

      <div className='mt-12 space-y-12'>
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>{data.name}</h1>
            <h2 className='text-lg font-medium text-gray-700'>{data.city}</h2>
            <div className='text-gray-500 flex items-center space-x-1 mt-2'>
              <TagIcon className='h-4 w-4' />
              {data.tags.map((tag) => (
                <button
                  key={tag}
                  className='text-sm font-light underline hover:text-indigo-500 focus:outline-none'
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <Rating
            goToReviews={goToReviews}
            count={data.cafe_reviews_aggregate.aggregate.count}
          />
        </div>

        <Overview {...data} />
        <Reviews ref={reviewEl} />
      </div>
    </>
  )
}

export default function Cafe() {
  const { slug } = useParams()
  const [{ data, fetching, error }] = useQuery({
    query: GET_CAFE,
    variables: { slug },
    context: useMemo(
      () => setUrqlHeader({ 'x-hasura-role': 'all_barista' }),
      []
    ),
  })

  if (fetching) return <Loading />
  if (error) return <ErrorMessage message={error.message} />
  if (data.cafe.length === 0) return <NotFound />

  return <Main data={data.cafe[0]} />
}
