import { ArrowNarrowLeft } from 'components/Icon'

export default function Header({ goBack }) {
  return (
    <button
      className='inline-flex items-center text-indigo-500 font-medium focus:outline-none'
      onClick={goBack}
    >
      <ArrowNarrowLeft className='mr-2 h-5 w-5' />
      Back
    </button>
  )
}
