import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Store from '~/redux/store';
import { close } from '~/modules/Menu/MenuState';

function closeMenu() {
  Store.dispatch(close());
}

const NavItem = styled(NavLink)`
  display: block;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${config.colors.lightgrey};
  font-size: 1rem;
  color: ${config.colors.darkgrey};
  text-decoration: none;

  &:visited {
    color: ${config.colors.darkgrey};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default props => (
  <NavItem
    to={props.to}
    onClick={closeMenu}
  >
    {props.label}
  </NavItem>
);
