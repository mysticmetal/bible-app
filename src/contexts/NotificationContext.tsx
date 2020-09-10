import React, { createContext, ReactNode, useState, useMemo, useContext, useReducer } from 'react';

interface NotificationActions {
  addNotification: (notification: JSX.Element) => void;
  clearNotifications: () => void;
  removeNotification: (key: number) => void;
}

interface Notification {
  content: ReactNode;
  key: number;
}

interface NotificationActionType {
  payload?: Notification | number,
  type: 'add' | 'clear' | 'remove',
}

const NotificationActionContext = createContext<NotificationActions>(null);
const NotificationStateContext = createContext<Notification[]>(null);

let keyCounter = 0;

function notificationReducer(
  state: Notification[],
  action: NotificationActionType,
) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload as Notification];

    case 'clear':
      return [];

    case 'remove': {
      const notificationIndex = state.findIndex((n) => n.key === action.payload);

      return [...state.slice(0, notificationIndex), ...state.slice(notificationIndex + 1)];
    }
  }
}

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = (notification: ReactNode) => {
    const key = keyCounter++;

    dispatch({
      payload: {
        content: notification,
        key,
      },

      type: 'add',
    });
  };

  const removeNotification = (key: number) => {
    dispatch({
      payload: key,
      type: 'remove',
    });
  };

  const clearNotifications = () => dispatch({ type: 'clear'});

  const actions = useMemo(
    () => ({
      addNotification,
      clearNotifications,
      removeNotification,
    }),
    [],
  );

  return (
    <NotificationActionContext.Provider value={actions}>
      <NotificationStateContext.Provider value={notifications}>
        {children}
      </NotificationStateContext.Provider>
    </NotificationActionContext.Provider>
  );
}

const useNotificationActions = () => useContext(NotificationActionContext);
const useNotificationState = () => useContext(NotificationStateContext);

export { NotificationProvider, useNotificationActions, useNotificationState };
