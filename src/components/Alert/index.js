import { useAlert, alertType } from 'context/AlertContext';
import ErrorAlert from './Error';

const Alert = () => {
  const { hasAlert, alerts } = useAlert();

  if (!hasAlert) return null;

  return alerts.map(({ type, ...rest }, i) => type === alertType.ERROR
    ? <ErrorAlert key={i} {...rest} />
    : null);
}

export default Alert;