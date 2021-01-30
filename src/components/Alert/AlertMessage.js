import { useState } from 'react'
import Notification from './Notification'

const AlertMessage = (props) => {
  const [hasSucceeded, setHasSucceeded] = useState(false)
  const [hasFailed, setHasFail] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSuccess = () => {
    setLoading(false)
    setHasSucceeded(true)
  }
  const onFail = () => {
    setLoading(false)
    setHasFail(true)
  }
  const onLoad = () => setLoading(true)
  const actionOnClick = () => props.action?.onClick(onSuccess, onFail, onLoad)

  return (
    <Notification
      {...props}
      hasSucceeded={hasSucceeded}
      hasFailed={hasFailed}
      loading={loading}
      actionOnClick={actionOnClick}
    />
  )
}

export default AlertMessage
