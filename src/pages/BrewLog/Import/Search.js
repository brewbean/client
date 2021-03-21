const recipe = {
  id: 3,
  about: 'test about',
  barista_id: 6,
  bean_grind: 'extra-coarse',
  bean_id: 2,
  bean_name_free: 'test bean name',
  bean_weight: 25,
  brew_type: 'Pour Over',
  date_added: '2021-01-06T00:00:00+00:00',
  date_updated: '2021-01-31T00:00:00+00:00',
  device: 'chemix',
  instructions: '1. yoyoyoyo',
  is_private: false,
  name: 'Recipe #1',
  water_amount: 300,
  water_temp: 200,
}

const Search = ({ navigateToCreate }) => {
  return (
    <div>
      Recipe Here
      <button
        onClick={() => navigateToCreate(recipe)}
        className='my-4 btn btn--primary btn--lg'
      >
        {' '}
        Import Recipe{' '}
      </button>
    </div>
  )
}

export default Search
