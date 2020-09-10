import { FlexBox } from '../base/Box';
import NotificationWrapper from './NotificationWrapper';
import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled(NotificationWrapper)<{ type: string }>`
  ${({ type }) => {
    switch (type) {
      case 'error':
        return css`
          background-color: var(--danger);
          color: var(--danger-text);
        `;

      case 'success':
        return css`
          background-color: var(--primary);
          color: var(--primary-text);
        `;

      default:
        return css`
          background-color: var(--neutral);
          color: var(--neutral-text);
        `;
    }
  }}
`;

interface StandardNotificationProps {
  text: string,
  type?: 'error' | 'success',
}

const StandardNotification = ({ text, type }: StandardNotificationProps) => {
  return (
    <Container alignItems="center" justifyContent="space-between" px={3} type={type}>
      <div>{text}</div>
    </Container>
  );
};

export default StandardNotification;
