//@ts-ignore
import { animated, useTransition } from 'react-spring';
import { Box } from '../base/Box';
import { useNotificationActions, useNotificationState } from '../../contexts/NotificationContext';
import React, { useState } from 'react';
import styled from 'styled-components';

const NotificationsContainer = styled(Box)`
  bottom: 1rem;
  display: grid;
  grid-template-rows: auto;
  left: 1.5rem;
  position: fixed;
  right: 1.5rem;
  z-index: 100;

  @media screen and (min-width: 768px) {
    grid-template-columns: 300px;
    left: 2rem;
    right: unset;
  }
`;

const NotificationContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

function Notifications() {
  /* -- Hooks -- */
  const [refMap] = useState(() => new WeakMap());
  const { removeNotification } = useNotificationActions();
  const notifications = useNotificationState();

  //@ts-ignore
  const animatedNotifications = useTransition(notifications, (n: { key: string }) => n.key, {
    config: {
      clamp: true,
      friction: 30,
      tension: 300,
    },

    enter: (item: any) => async (next: any) => {
      await next({
        height: refMap.get(item).offsetHeight,
        opacity: 1,
      });
    },

    from: {
      height: 0,
      opacity: 0,
    },

    leave: () => async (next: any) => {
      await next({ opacity: 0 });
      await next({ height: 0 });
    },
  });

  /* -- Rendering -- */
  const mappedNotifications = animatedNotifications.map(
    ({ item, key, props }: { item: any; key: string; props: any }) => (
      <animated.div data-testid="notification" key={key} style={props}>
        <NotificationContainer
          onClick={() => removeNotification(parseInt(key, 10))}
          ref={(ref) => ref && refMap.set(item, ref)}
        >
          {item.content}
        </NotificationContainer>
      </animated.div>
    ),
  );

  return (
    <NotificationsContainer
      data-testid="notifications"
      flexDirection="column"
      justifyContent="flex-end"
    >
      {mappedNotifications}
    </NotificationsContainer>
  );
}

export default Notifications;
