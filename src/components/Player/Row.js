import { Check } from 'components/Icon'

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

const Row = ({ bottom = false, stage, start }) => (
  <li>
    <Container bottom={bottom}>
      <div className='relative flex items-center space-x-3'>
        <div>
          <span className='h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white'>
            <Check className='h-5 w-5 text-white' />
          </span>
        </div>
        <div className='min-w-0 flex-1 flex justify-between text-sm text-gray-500'>
          <p>{stage}</p>
          <p>{start}</p>
        </div>
      </div>
    </Container>
  </li>
)

export default Row
