import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import CloseIcon from '~/images/close.svg';

import FMBLogo from '~/components/FMBLogo';
import NavItem from '~/components/NavItem';

import * as MenuActions from './MenuState';

import './Menu.styl';

class Menu extends PureComponent {
  toggleMenu = () => {
    this.props.dispatch(MenuActions.toggle());
  }

  render() {
    const MenuClasses = classnames('menu', { 'menu--open': this.props.isOpen });

    return (
      <div className={MenuClasses}>
        <div className="menu__header">
          <div className="menu__header__container">
            <FMBLogo width={67} />
            <div onClick={this.toggleMenu} role="button" tabIndex={0} className="menu__close">
              <img src={CloseIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="nav">
          <div className="nav__header">Infos</div>
          <div className="nav__body">
            {config.menu.items.map(menuItem =>
              <NavItem to={menuItem.link} key={menuItem.label} label={menuItem.label} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.MenuState)(Menu);
