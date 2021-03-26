import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAlert, alertType } from 'context/AlertContext'

const Brewlogs = () => {
  const location = useLocation()
  const { addAlert } = useAlert()

  useEffect(() => {
    if (location.state?.createdBrewLog) {
      addAlert({
        type: alertType.SUCCESS,
        header: 'Brew log successfully created!',
        close: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div></div>
}

export default Brewlogs
