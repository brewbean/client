import { useHistory, useRouteMatch } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'

export default function List({ beans }) {
  const { url } = useRouteMatch()
  const history = useHistory()

  return (
    <div className='overflow-x-auto'>
      <table className='table-auto w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Company
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Roast
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Region
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {beans.map(
            ({
              id,
              company_name,
              name,
              region,
              roast_type,
              profile_note,
              bean_reviews_aggregate,
            }) => {
              let avgRating = bean_reviews_aggregate.aggregate.avg.rating
              if (avgRating) {
                avgRating = roundToHalfOrWhole(avgRating)
              }

              return (
                <tr
                  key={id}
                  tabIndex='0'
                  className='rounded-lg cursor-pointer hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:shadow-inner'
                  onClick={() => history.push(url + '/' + id)}
                >
                  <td className='rounded-l-lg px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <div>{name}</div>
                    <div className='text-gray-500 text-xs font-normal'>
                      {profile_note.join(', ')}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {company_name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize'>
                    {roast_type}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize'>
                    {region}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        avgRating === null
                          ? 'bg-gray-300 text-gray-800'
                          : avgRating >= 4
                          ? 'bg-green-200 text-green-800'
                          : avgRating >= 3
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {avgRating ? avgRating : 'not rated'}
                    </span>
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </div>
  )
}
