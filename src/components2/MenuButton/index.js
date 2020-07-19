import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Store from '~/store';
import { toggle } from '~/AppState';

import MenuButtonSVG from '~/images/menubutton.svg';

const MenuButton = () => (
  <IconButton
    aria-label="Menü öffnen"
    data-cy="hamburger-button"
    onClick={() => Store.dispatch(toggle())}
  >
    <MenuButtonSVG />
  </IconButton>
);

export default MenuButton;
