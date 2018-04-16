import React from 'react';
import { NavLink } from 'react-router-dom';

export default props => (
  <NavLink to={props.to} className="nav__item" activeClassName="nav__item--active">{props.label}</NavLink>
);
