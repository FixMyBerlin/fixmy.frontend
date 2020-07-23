import React from 'react';
import styled from 'styled-components';

import Store from '~/store';
import CloseIcon from '~/images/dark-close.svg';
import { toggle } from '~/AppState';

const MenuCloseButton = styled.button`
  position: absolute;
  top: -1.5rem;
  right: 0.5rem;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }
`;

export default (props) => (
  <MenuCloseButton
    aria-label="Menü schließen"
    onClick={() => Store.dispatch(toggle())}
    role="button"
    tabIndex={0}
    className={props.className}
  >
    <CloseIcon aria-hidden="true" />
  </MenuCloseButton>
);
