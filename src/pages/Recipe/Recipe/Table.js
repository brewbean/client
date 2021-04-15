import { useHistory, useRouteMatch } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'
import { Check, PrivacyIcon, X } from 'components/Icon'
import { Rating, TextSymbol } from 'components/Badge'
import { useAuth } from 'context/AuthContext'
import { UserIcon } from '@heroicons/react/solid'

export default function Table({ recipes }) {
  const { barista: user } = useAuth()
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
              is_private,
              stages,
            }) => (
              <tr
                key={id}
                tabIndex='0'
                className='rounded-lg cursor-pointer hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:shadow-inner'
                onClick={() => history.push(url + '/' + id)}
              >
                <td className='rounded-l-lg px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <div className='flex items-center'>
                    {user?.id === barista.id && (
                      <PrivacyIcon
                        isPrivate={is_private}
                        className='h-5 w-5 mr-3 text-gray-700'
                      />
                    )}
                    <div>
                      <h1>{name}</h1>
                      <h2 className='text-gray-500 text-xs font-normal'>
                        {about}
                      </h2>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-500'>
                  {user?.display_name === barista.display_name ? (
                    <TextSymbol symbol={UserIcon}>
                      {barista.display_name}
                    </TextSymbol>
                  ) : (
                    barista.display_name
                  )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-500 capitalize'>
                  {brew_type}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
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
