import { Title } from 'components/BrewLog/Form'
import { RECIPE_FORM, SEARCH } from 'pages/BrewLog/Create'

export default function Introduction({ goTo }) {
  const goToSearchRecipe = () => goTo(SEARCH)
  const goToCreateRecipe = () => goTo(RECIPE_FORM)
  return (
    <div>
      <Title
        extraClasses='border-none'
        title='Create a brew log'
        subtitle='Step 1: Add a recipe'
      />

      <div className='mt-6 flex flex-col space-y-2 sm:flex-row sm:space-y-0 items-center justify-center'>
        <button onClick={goToSearchRecipe} className='btn btn--primary btn--lg'>
          Import recipe
        </button>
        <span className='italic mx-4 text-gray-500 text-md font-medium'>
          &mdash; or &mdash;
        </span>
        <button onClick={goToCreateRecipe} className='btn btn--primary btn--lg'>
          Create from scratch
        </button>
      </div>
    </div>
  )
}
