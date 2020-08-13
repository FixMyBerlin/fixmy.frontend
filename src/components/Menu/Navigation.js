import React from 'react';
import styled from 'styled-components';
import Store from '~/store';

import config from '~/config';
import { close } from '~/AppState';
import NavItem from '~/components/Menu/NavItem';
import AnchorItem from '~/components/Menu/AnchorItem';
import SvgIcon from '~/components/SvgIcon';
import Separator from './Separator';

const NavBody = styled.nav`
  flex-grow: 1;
`;

const PlusItemWrapper = styled.div`
  padding: 1.2rem 0;
  margin: 0 2rem;
  border-bottom: 1px solid ${config.colors.lightgrey};

  svg {
    margin-right: 16px;
  }
`;

const PlusItemLabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PlusChildren = styled.div`
  margin-left: 10px;

  a {
    padding: 0.6rem 0;
  }
`;

function renderItem(item) {
  switch (item.type) {
    case 'link':
      return (
        <NavItem
          key={item.label}
          to={item.link}
          onClick={() => Store.dispatch(close())}
          border={item.border ? item.border.toString() : null}
        >
          {item.icon ? <SvgIcon type={item.icon} /> : null}
          <NavItem.Label>{item.label}</NavItem.Label>
        </NavItem>
      );
    case 'external':
      return (
        <AnchorItem
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          border={item.border ? item.border.toString() : null}
        >
          {item.icon ? <SvgIcon type={item.icon} /> : null}
          {item.label}
        </AnchorItem>
      );
    case 'plus':
      return (
        <PlusItemWrapper key={item.label}>
          <PlusItemLabelWrapper>
            {item.icon ? <SvgIcon type={item.icon} /> : null}
            <div>{item.label}</div>
          </PlusItemLabelWrapper>
          <PlusChildren>
            {item.children.map((c) => (
              <NavItem
                key={c.link}
                to={c.link}
                onClick={() => Store.dispatch(close())}
                border={c.border ? c.border.toString() : null}
              >
                {c.icon ? <SvgIcon type={c.icon} /> : null}
                <NavItem.Label>{c.label}</NavItem.Label>
              </NavItem>
            ))}
          </PlusChildren>
        </PlusItemWrapper>
      );
    case 'separator':
      return <Separator key={item.label} label={item.label} />;
    default:
      return null;
  }
}

export default (props) => (
  <NavBody className={props.className}>
    {config.menu.items.map((item) => renderItem(item))}
  </NavBody>
);
