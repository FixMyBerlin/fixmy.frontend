import React from 'react';
import styled from 'styled-components';

import MenuIcon from '~/images/hamburger.svg';
import MenuIconWhite from '~/images/hamburgerWhite.svg';
import Store from '~/store';
import { toggle } from '~/AppState';

const MenuButton = styled.div`
  position: fixed;
  left: 2rem;
  top: 2rem;
  cursor: pointer;
  z-index: 100;
`;

function handleClick() {
  Store.dispatch(toggle());
}

export default (props) => (
  <MenuButton
    data-cy="hamburger-button"
    role="button"
    tabIndex={0}
    onClick={handleClick}
    {...props}
  >
    {props.whiteFill ? <MenuIconWhite /> : <MenuIcon />}
  </MenuButton>
);
