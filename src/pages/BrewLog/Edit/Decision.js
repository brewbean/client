import { Header, Title } from 'components/BrewLog/Form'
import { useHistory } from 'react-router'
import { BREW_LOG_EDIT, RECIPE_COPY_EDIT } from './index'

export default function Decision({ goTo }) {
  const history = useHistory()

  const goToBrewLogEdit = () => goTo(BREW_LOG_EDIT)
  const goToRecipeCopyEdit = () => goTo(RECIPE_COPY_EDIT)

  return (
    <>
      <Header goBack={history.goBack} />

      <Title
        extraClasses='mt-2'
        title='Edit brew log'
        subtitle='Select recipe editing options'
      />

      <div className='mt-4 space-y-4 text-md font-normal text-gray-600'>
        <p>Your brew log references a recipe created by another user.</p>
        <p>
          You can choose to continue edit your brew log without editing the
          recipe or you can create a copy of the recipe to edit.
        </p>
      </div>

      <div className='mt-6 space-y-2 flex flex-col sm:flex-row sm:space-y-0 items-center justify-center'>
        <button onClick={goToBrewLogEdit} className='btn btn--primary btn--lg'>
          Continue without changes
        </button>
        <span className='italic mx-4 text-gray-500 text-md font-medium'>
          &mdash; or &mdash;
        </span>
        <button
          onClick={goToRecipeCopyEdit}
          className='btn btn--primary btn--lg'
        >
          Edit recipe by copying
        </button>
      </div>
    </>
  )
}
