import { useAlert, alertType } from 'context/AlertContext';
import AlertMessage from './AlertMessage';

const Alert = () => {
  const { hasAlert, alerts } = useAlert();

  if (!hasAlert) return null;

  return alerts.map((alert, i) => <AlertMessage key={i} {...alert} />);
}

export default Alert;