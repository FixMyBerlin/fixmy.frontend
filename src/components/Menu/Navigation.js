import React from 'react';
import styled from 'styled-components';
import Store from '~/store';

import { close } from '~/AppState';
import NavItem from '~/components/Menu/NavItem';
import SvgIcon from '~/components/SvgIcon';
import Separator from './Separator';

const NavBody = styled.nav`
  flex-grow: 1;
`;

function renderItem(item) {
  switch (item.type) {
    case 'link': return (
      <NavItem
        key={item.label}
        to={item.link}
        onClick={() => Store.dispatch(close())}
        border={item.border}
      >
        {item.icon ? <SvgIcon type={item.icon} /> : null}
        <NavItem.Label>{item.label}</NavItem.Label>
      </NavItem>
    );
    case 'separator': return (
      <Separator key={item.label} label={item.label} />
    );
    default: return null;
  }
}

export default props => (
  <NavBody className={props.className}>
    {config.menu.items.map(item => renderItem(item))}
  </NavBody>
);
