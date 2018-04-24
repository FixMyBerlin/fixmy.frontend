import React from 'react';
import styled from 'styled-components';

import FMBLogo from '~/components/FMBLogo';

import MenuCloseButton from './MenuCloseButton';

const MenuHeader = styled.div`
  background: ${config.colors.interaction};
  position: relative;
  padding: .5rem 1rem;
`;

const MenuHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFMBLogo = styled(FMBLogo)`
  margin: 2rem 0;
`;

export default () => (
  <MenuHeader>
    <MenuHeaderContainer>
      <StyledFMBLogo />
      <MenuCloseButton />
    </MenuHeaderContainer>
  </MenuHeader>
);
