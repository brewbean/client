import { Check, DotsHorizontal, Heart } from 'components/Icon'

const Container = ({ bottom, children }) =>
  bottom ? (
    children
  ) : (
    <div className='relative pb-8'>
      <span
        className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
        aria-hidden='true'
      ></span>
      {children}
    </div>
  )

const Row = ({ bottom = false, stage, start, isCurrent, isDone }) => {
  const gray = 'bg-gray-400'
  const green = 'bg-green-500'
  const blue = 'bg-blue-500'
  const color = isDone ? green : isCurrent ? blue : gray
  const Icon = isDone ? Check : isCurrent ? Heart : DotsHorizontal

  return (
    <li>
      <Container bottom={bottom}>
        <div className='relative flex items-center space-x-3'>
          <div>
            <span
              className={
                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ' +
                color
              }
            >
              <Icon className='h-5 w-5 text-white' />
            </span>
          </div>
          <div className='min-w-0 flex-1 flex justify-between text-sm text-gray-500'>
            <p className={isCurrent ? 'font-bold text-gray-700' : ''}>
              {stage}
            </p>
            <p>{start}</p>
          </div>
        </div>
      </Container>
    </li>
  )
}

export default Row
