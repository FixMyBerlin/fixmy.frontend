import React from 'react';
import styled from 'styled-components';
import NavLink from 'react-router-dom/NavLink';

import Store from '~/store';
import { toggle } from '~/AppState';
import AccountIcon from '~/images/account.svg';
import MenuCloseButton from './MenuCloseButton';

const MenuHeader = styled.div`
  background: ${config.colors.interaction};
  position: relative;
  padding: 2rem 0;
`;

const MenuHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
`;

const AccountLink = styled(NavLink).attrs({
  to: props => props.to
})`
  display: flex;
  font-size: 1rem;
  text-decoration: none;
  color: white;
  padding: 0 2rem;

  &:visited {
    color: white;
  }

  svg {
    margin-right: 16px;
  }
`;

export default () => (
  <MenuHeader>
    <MenuHeaderContainer>
      <AccountLink to="login" onClick={() => Store.dispatch(toggle())}>
        <AccountIcon />
        Anmelden
      </AccountLink>
      <MenuCloseButton />
    </MenuHeaderContainer>
  </MenuHeader>
);
