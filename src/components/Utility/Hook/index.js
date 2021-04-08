import qs from 'qs'
import { useLocation } from 'react-router'

export const useQueryParams = () => {
  const { search } = useLocation()
  return qs.parse(search, { ignoreQueryPrefix: true })
}
