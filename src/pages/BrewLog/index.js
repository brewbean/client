import { useMemo, useCallback, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { useQuery } from 'urql'
import { GET_ALL_BREW_LOGS } from 'queries'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import { useQueryParams } from 'components/Utility/Hook'
import Main from 'pages/BrewLog/Main'
import { setUrqlHeader } from 'helper/header'
import useIsScreenSize, { SMALL } from 'helper/useIsScreenSize'
import Mobile from './Main/Mobile'

export default function BrewLog() {
  const isMobile = useIsScreenSize(SMALL)
  const { isAuthenticated, isVerified } = useAuth()
  const {
    isSuccess,
    isPending,
    open,
    content,
    setContent,
    setModalAlert,
    reset,
  } = useModal()
  const { url } = useRouteMatch()
  const history = useHistory()
  const { page } = useQueryParams()

  const [result] = useQuery({
    query: GET_ALL_BREW_LOGS,
    variables: {
      limit: 10,
      offset:
        page === undefined || page === '1' ? 0 : (parseInt(page) - 1) * 10,
    },
    context: useMemo(
      () => setUrqlHeader({ 'x-hasura-role': 'all_barista' }),
      []
    ),
  })

  const triggerUnverifiedModal = useCallback(() => {
    open()
    setModalAlert(false)
    setContent('unverified')
  }, [open, setModalAlert, setContent])

  const goToCreate = () => {
    if (isVerified) {
      history.push(`${url}/new`)
    } else if (isAuthenticated) {
      triggerUnverifiedModal()
    } else {
      open()
      setContent('login', 'You must be logged in to create a recipe')
    }
  }

  useEffect(() => {
    if (!isPending && isSuccess && content === 'login' && isVerified) {
      // need to clear modal settings so that going back
      // to this page doesn't retrigger this effect
      reset()
      history.push(`${url}/new`)
    }
  }, [isPending, isSuccess, content, isVerified, url, history, reset])

  return isMobile ? (
    <Mobile {...result} goToCreate={goToCreate} />
  ) : (
    <Main {...result} goToCreate={goToCreate} />
  )
}
