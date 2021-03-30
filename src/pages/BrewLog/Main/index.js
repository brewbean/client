import { useQueryParams } from 'components/Utility/Hook'
import { GET_ALL_BREW_LOGS } from 'queries'
import { useQuery } from 'urql'
import Container from './Container'

export default function Main() {
  const { page } = useQueryParams()
  const [result] = useQuery({
    query: GET_ALL_BREW_LOGS,
    variables: {
      limit: 10,
      offset:
        page === undefined || page === '1' ? 0 : (parseInt(page) - 1) * 10,
    },
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

  return <Container {...result} />
}
