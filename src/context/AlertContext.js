import { useContext, createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as alertType from 'constants/alert';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setAlerts([]);
  }, [location])

  const addAlert = ({ type, message, url }) => setAlerts([...alerts, { type, message, url }]);
  const addAlertBulk = bulk => setAlerts([...alerts, ...bulk]);

  const closeAlert = index => setAlerts([
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