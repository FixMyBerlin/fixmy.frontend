import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { useDispatch } from 'react-redux';

import { toggle } from '~/AppState';
import MenuButtonSVG from '~/images/menubutton.svg?component';
import { useTypedSelector } from '~/store';

const MenuButton = ({ className = null }) => {
  const dispatch = useDispatch();
  const isMenuOpen = useTypedSelector((state) => state.AppState.isMenuOpen);

  return (
    <IconButton
      aria-label="Menü öffnen"
      aria-expanded={isMenuOpen}
      data-cy="hamburger-button"
      onClick={() => dispatch(toggle())}
      classes={{ root: className }}
    >
      <MenuButtonSVG />
    </IconButton>
  );
};

export default MenuButton;
