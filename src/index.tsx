import { LS_PATH_KEY } from './components/base/LocationTracker';
import { NotificationProvider } from './contexts/NotificationContext';
import App from './components/App';
import GlobalStyles from './components/GlobalStyles';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import SWInstaller from './components/serviceWorker/SWInstaller';

const GlobalProviders = ({ children }: { children: ReactNode }) => (
  <NotificationProvider>
    {children}
  </NotificationProvider>
);

(() => {
  const currentPath = localStorage.getItem(LS_PATH_KEY);

  if (currentPath && window.location.pathname !== currentPath) {
    window.location.href = currentPath;

    return;
  }

  const Root = () => (
    <GlobalProviders>
      <GlobalStyles />
      <App />
      <SWInstaller />
    </GlobalProviders>
  );

  ReactDOM.render(<Root />, document.querySelector('main'));
})();
