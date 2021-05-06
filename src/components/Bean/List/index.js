import { useHistory, useRouteMatch } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'
import { Rating } from 'components/Badge'
import { Sort, sortHandler } from 'components/Search/Sort'

export default function List({ beans, filters, setFilters, setOrderBy }) {
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
              <div className='flex justify-between items-center'>
                Name
                <Sort
                  direction={filters.name}
                  onClick={sortHandler('name', filters, setFilters, setOrderBy)}
                />
              </div>
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              <div className='flex justify-between items-center'>
                Company
                <Sort
                  direction={filters.company_name}
                  onClick={sortHandler(
                    'company_name',
                    filters,
                    setFilters,
                    setOrderBy
                  )}
                />
              </div>
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              <div className='flex justify-between items-center'>
                Roast
                <Sort
                  direction={filters.roast_type}
                  onClick={sortHandler(
                    'roast_type',
                    filters,
                    setFilters,
                    setOrderBy
                  )}
                />
              </div>
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              <div className='flex justify-between items-center'>
                Region
                <Sort
                  direction={filters.region}
                  onClick={sortHandler(
                    'region',
                    filters,
                    setFilters,
                    setOrderBy
                  )}
                />
              </div>
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              <div className='flex justify-between items-center'>
                Rating
                <Sort
                  direction={filters.bean_reviews_aggregate?.avg.rating}
                  onClick={sortHandler(
                    'bean_reviews_aggregate',
                    filters,
                    setFilters,
                    setOrderBy
                  )}
                />
              </div>
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
            }) => (
              <tr
                key={id}
                tabIndex='0'
                className='rounded-lg cursor-pointer hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:shadow-inner'
                onClick={() => history.push(url + '/' + id)}
              >
                <td className='rounded-l-lg px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <div>{name}</div>
                  <div className='text-gray-500 text-xs font-normal'>
                    {profile_note}
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
                <td className='rounded-r-lg px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <Rating
                    value={roundToHalfOrWhole(
                      bean_reviews_aggregate.aggregate.avg.rating
                    )}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
