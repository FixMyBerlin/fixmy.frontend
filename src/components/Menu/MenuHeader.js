import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

const AccountLink = styled(NavLink).attrs(
  props => ({ to: props.to })
)`
  display: flex;
  font-size: 1rem;
  text-decoration: none;
  color: white;
  padding: 0 2rem;
  align-items: center;

  &:visited {
    color: white;
  }

  svg {
    margin-right: 16px;
  }
`;

export default (props) => {
  const profileLink = props.token ? config.routes.profile : config.routes.login;
  const profileLabel = props.token ? config.menu.profileLabel : config.menu.loginLabel;

  return (
    <MenuHeader>
      <MenuHeaderContainer>
        <AccountLink to={profileLink} onClick={() => Store.dispatch(toggle())}>
          <AccountIcon />
          {profileLabel}
        </AccountLink>
        <MenuCloseButton />
      </MenuHeaderContainer>
    </MenuHeader>
  );
};
