import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as MenuActions from './MenuState';

import NavItem from './NavItem';

import './Menu.styl';

class Menu extends PureComponent {
  toggleMenu = () => {
    this.props.dispatch(MenuActions.toggle());
  }

  render() {
    const MenuClasses = classnames('menu', { 'menu--open': this.props.isOpen });

    return (
      <div className={MenuClasses}>
        <div className="nav">
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="Worum geht es hier?" />
          <NavItem to="/map" label="Karte anzeigen" />
        </div>
        <button onClick={this.toggleMenu}>CLOSE MENU</button>
      </div>
    );
  }
}

export default connect(state => state.MenuState)(Menu);
