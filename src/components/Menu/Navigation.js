import React from 'react';
import styled from 'styled-components';
import Store from '~/store';

import { close } from '~/AppState';
import NavItem from '~/components/NavItem';

const NavHeader = styled.div`
  background: ${config.colors.lightgrey};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  color: ${config.colors.darkgrey};
  letter-spacing: 1px;
  padding: 1.5rem 2rem;
  border-top: 1px dashed ${config.colors.midgrey};
  border-bottom: 1px dashed ${config.colors.midgrey};
`;

const NavBody = styled.div`
  padding: 0 2rem;
`;

export default props => (
  <nav className={props.className}>
    <NavHeader>Infos</NavHeader>
    <NavBody>
      {config.menu.items.map(menuItem =>
        (<NavItem
          key={menuItem.label}
          to={menuItem.link}
          onClick={() => Store.dispatch(close())}
        >
          {menuItem.label}
        </NavItem>)
      )}
    </NavBody>
  </nav>
);
