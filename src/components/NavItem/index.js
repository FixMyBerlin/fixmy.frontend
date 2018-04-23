import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.styl';

export default props => (
  <NavLink to={props.to} className="nav__item" activeClassName="nav__item--active">{props.label}</NavLink>
);
