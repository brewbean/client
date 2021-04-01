import { useMemo } from 'react'
import { useQuery } from 'urql'
import { GET_ALL_BREW_LOGS } from 'queries'
import { useQueryParams } from 'components/Utility/Hook'
import Main from 'pages/BrewLog/Main'

export default function Brewlog() {
  const { page } = useQueryParams()
  const [result] = useQuery({
    query: GET_ALL_BREW_LOGS,
    variables: {
      limit: 10,
      offset:
        page === undefined || page === '1' ? 0 : (parseInt(page) - 1) * 10,
    },
    context: useMemo(
      () => ({
        fetchOptions: {
          headers: {
            'x-hasura-role': 'all_barista',
          },
        },
      }),
      []
    ),
  })
  /**
   * Goal
   * - container level data fetching
   * - leave rendering to UI components (agnostic to data)
   *
   * Architecture
   *
   * Data container (here)
   * ├── Sidebar (UI only; pass loading/error down)
   * └── Main viewer
   *     ├── Detail view - based on clicking on sidebar (UI only; no queries)
   *     └── Create flow
   *         ├── Form (data & conditional rendering) container
   *         └── Form views
   *
   */

  return <Main {...result} />
}
