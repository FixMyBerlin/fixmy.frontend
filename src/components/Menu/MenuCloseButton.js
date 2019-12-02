import React from 'react';
import styled from 'styled-components';

import Store from '~/store';
import CloseIcon from '~/images/dark-close.svg';
import { toggle } from '~/AppState';

const MenuCloseButton = styled.div`
  position: absolute;
  top: -1.5rem;
  right: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }
`;

export default (props) => (
  <MenuCloseButton
    onClick={() => Store.dispatch(toggle())}
    role="button"
    tabIndex={0}
    className={props.className}
  >
    <CloseIcon />
  </MenuCloseButton>
);
