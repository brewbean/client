import { useAlert } from 'context/AlertContext'
import AlertMessage from './AlertMessage'

const Alert = ({ containerStyle, disableKey, noShadow = false }) => {
  const { hasAlert, alerts, closeAlert, disabled } = useAlert()

  if (!hasAlert || disableKey === disabled) return null

  return (
    <div className={containerStyle}>
      {alerts.map((alert, i) => (
        <AlertMessage
          key={i}
          onClose={() => closeAlert(i)}
          noShadow={noShadow}
          {...alert}
        />
      ))}
    </div>
  )
}

export default Alert
