import { useAlert } from 'context/AlertContext'
import AlertMessage from './AlertMessage'

const Alert = ({ containerStyle }) => {
  const { hasAlert, alerts, closeAlert } = useAlert()

  if (!hasAlert) return null

  return (
    <div className={containerStyle}>
      {alerts.map((alert, i) => (
        <AlertMessage key={i} onClose={() => closeAlert(i)} {...alert} />
      ))}
    </div>
  )
}

export default Alert
