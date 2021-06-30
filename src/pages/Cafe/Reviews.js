import { forwardRef, useImperativeHandle, useRef } from 'react'
import ReviewBlock from './ReviewBlock'

function Reviews(props, ref) {
  const elemRef = useRef()

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      elemRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    },
  }))
  return (
    <>
      <h1 ref={elemRef} className='text-2xl font-bold text-gray-900'>
        Reviews
      </h1>
      <div className='grid sm:grid-cols-2 gap-10'>
        <ReviewBlock
          thumbUp
          name='Bhavana'
          date='2020-08-05T22:51:41.681736+00:00'
        />
        <ReviewBlock
          thumbUp
          name='Bhavana'
          date='2020-08-05T22:51:41.681736+00:00'
        />
        <ReviewBlock
          thumbUp
          name='Bhavana'
          date='2020-08-05T22:51:41.681736+00:00'
        />
        <ReviewBlock
          thumbUp={false}
          name='Bhavana'
          date='2020-08-05T22:51:41.681736+00:00'
        />
      </div>
    </>
  )
}

export default forwardRef(Reviews)
