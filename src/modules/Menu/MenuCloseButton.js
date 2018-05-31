import React from 'react';
import styled from 'styled-components';

import Store from '~/redux/store';
import CloseIcon from '~/images/close.svg';
import { toggle } from './MenuState';

function toggleMenu() {
  Store.dispatch(toggle());
}

const MenuCloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default props => (
  <MenuCloseButton
    onClick={toggleMenu}
    role="button"
    tabIndex={0}
    className={props.className}
  >
    <CloseIcon />
  </MenuCloseButton>
);
