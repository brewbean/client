import { useHistory, useRouteMatch } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'
import { Check, X } from 'components/Icon'
import { Rating } from 'components/Badge'

export default function Table({ recipes }) {
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
              Writer
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Brew Type
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Rating
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-sm font-medium text-gray-600'
            >
              Playable?
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(
            ({
              id,
              recipe_reviews_aggregate,
              barista,
              name,
              about,
              brew_type,
              stages,
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
                    {about}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {barista.display_name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize'>
                  {brew_type}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <Rating
                    value={roundToHalfOrWhole(
                      recipe_reviews_aggregate.aggregate.avg.rating
                    )}
                  />
                </td>
                <td className='rounded-r-lg px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {stages.length > 0 ? (
                    <Check className='h-5 w-5 text-green-600' />
                  ) : (
                    <X className='h-5 w-5 text-red-600' />
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
