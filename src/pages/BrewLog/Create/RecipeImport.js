import { Header, RecipeSection, Title } from 'components/BrewLog/Form'
import { BREWLOG_FORM } from 'pages/BrewLog/Create'

export default function RecipeImport({ goBack, goTo, payload }) {
  const goToBrewLogForm = () =>
    goTo(BREWLOG_FORM, {
      recipe: payload,
      subtitle: 'Step 4: Add brew log details',
    })

  return (
    <>
      <Header goBack={goBack} />
      <Title
        extraClasses='mt-2'
        title='Create a brew log'
        subtitle='Step 3: Confirm recipe import'
      />
      <dl className='mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <RecipeSection {...payload} />
      </dl>
      <div className='flex justify-end my-4 space-x-2'>
        <button className='btn btn--white btn--sm' onClick={goBack}>
          Cancel
        </button>
        <button className='btn btn--primary btn--sm' onClick={goToBrewLogForm}>
          Confirm
        </button>
      </div>
    </>
  )
}
