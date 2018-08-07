import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';

import FMBLogo from '~/components/FMBLogo';

import Store from '~/redux/store';
import { close } from './MenuState';

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

function handleLogoClick() {
  Store.dispatch(close());
}

export default () => (
  <MenuHeader>
    <MenuHeaderContainer>
      <Link onClick={handleLogoClick} to="/">
        <StyledFMBLogo />
      </Link>
      <MenuCloseButton />
    </MenuHeaderContainer>
  </MenuHeader>
);
