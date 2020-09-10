import { Button, IconButton } from '../base/Buttons';
import { CloseIcon } from '../base/Icons';
import { FlexBox } from '../base/Box';
import React from 'react';
import styled from 'styled-components';

const Container = styled(FlexBox)`
  background-color: var(--neutral);
  color: var(--neutral-text);
`;

const RefreshButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
`;

function SWUpdate() {
  const handleRefreshClick = () => window.location.reload();

  return (
    <Container alignItems="center" justifyContent="space-between" px={3}>
      <div>Update Available</div>

      <FlexBox alignItems="center">
        <RefreshButton onClick={handleRefreshClick}>Refresh?</RefreshButton>
      </FlexBox>
    </Container>
  );
}

export default SWUpdate;
