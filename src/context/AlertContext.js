import { useContext, createContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import * as alertType from 'constants/alert';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setAlerts([]);
  }, [location]);

  // destructured for clarity - can remove if we implement TypeScript types/interfaces
  const addAlert = useCallback(alert => setAlerts(prevAlerts => [
    ...prevAlerts,
    {
      type: alert.type,
      header: alert.header,
      message: alert.message,
      close: alert.close,
    }
  ]), []);

  const addAlertBulk = bulk => setAlerts([...alerts, ...bulk]);

  const closeAlert = (index = 0) => setAlerts([
    ...alerts.slice(0, index),
    ...alerts.slice(index + 1)
  ]);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, addAlertBulk, closeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

const useAlert = () => {
  const context = useContext(AlertContext);
  const hasAlert = context.alerts.length > 0;

  return {
    ...context,
    hasAlert,
  };
}

export { AlertProvider, useAlert, alertType }