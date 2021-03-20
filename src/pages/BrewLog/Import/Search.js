// const data = {
//   recipe: [
//     {
//       id: 3,
//       about: '',
//       barista_id: 6,
//       bean_grind: 'Medium-coarse',
//       bean_id: 2,
//       bean_name_free: null,
//       bean_weight: 25,
//       brew_type: 'Pour Over',
//       date_added: '2021-01-06T00:00:00+00:00',
//       date_updated: '2021-01-31T00:00:00+00:00',
//       device: null,
//       instructions: null,
//       is_private: false,
//       name: 'Recipe #1',
//       water_amount: 300,
//       water_temp: 200,
//     },
//   ],
// }

const Search = ({ navigateToCreate }) => {
  return (
    <div>
      Recipe Here
      <button
        onClick={navigateToCreate}
        className='my-4 btn btn--primary btn--lg'
      >
        {' '}
        Import Recipe{' '}
      </button>
    </div>
  )
}

export default Search
