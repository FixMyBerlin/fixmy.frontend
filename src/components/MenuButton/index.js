import React from 'react';
import MenuIcon from '~/images/hamburger.svg';

import Store from '~/redux/store';
import { toggle } from '~/modules/Menu/MenuState';

import './MenuButton.styl';

function handleClick() {
  Store.dispatch(toggle());
}

export default () => (
  <div role="button" tabIndex={0} onClick={handleClick} className="menu-button">
    <img src={MenuIcon} alt="menu" />
  </div>
);
