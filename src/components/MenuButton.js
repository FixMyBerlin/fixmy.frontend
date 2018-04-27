import React from 'react';
import styled from 'styled-components';

import MenuIcon from '~/images/hamburger.svg';
import Store from '~/redux/store';
import { toggle } from '~/modules/Menu/MenuState';

const MenuButton = styled.div`
  position: fixed;
  left: 2rem;
  top: 2rem;
  cursor: pointer;
`;

function handleClick() {
  Store.dispatch(toggle());
}

export default () => (
  <MenuButton role="button" tabIndex={0} onClick={handleClick}>
    <img src={MenuIcon} alt="menu" />
  </MenuButton>
);
