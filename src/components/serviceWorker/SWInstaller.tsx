import { useNotificationActions } from '../../contexts/NotificationContext';
//@ts-ignore
import { Workbox } from 'workbox-window';
import React, { useEffect } from 'react';
import SWUpdate from './SWUpdate';

function SWInstaller(): null {
  const { addNotification } = useNotificationActions();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('./service-worker.js');

      let updatePending = false;

      wb.addEventListener('message', (event: any) => {
        if (event.data.type === 'CACHE_UPDATED') {
          if (updatePending) return;

          updatePending = true;

          addNotification(<SWUpdate />);
        }
      });

      wb.register();
    }
  }, []);

  return null;
}

export default SWInstaller;
