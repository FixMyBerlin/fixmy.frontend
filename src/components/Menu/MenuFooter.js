import React, { PureComponent } from 'react';
import styled from 'styled-components';
import NavLink from 'react-router-dom/NavLink';
import Link from 'react-router-dom/Link';

import Store from '~/store';
import { close } from '~/AppState';
import FMBLogo from '~/components/FMBLogo';
import SocialLinks from '~/components/Social/SocialLinks';

const Footer = styled.div`
  background: ${config.colors.lightgrey};
  color: ${config.colors.darkgrey};
  padding: 1.5rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledFMBLogo = styled(FMBLogo)`
  text-align: center;
`;

const FooterLinks = styled.div`
  font-size: 14px;
  display: flex;
  margin-top: 1rem;
`;

const StyledLink = styled(NavLink).attrs({
  to: props => props.to
})`
  width: ${props => props.width}%;
  text-align: center;
  text-decoration: none;
  color: #635638;
`;

function renderItem(item, index, items) {
  return (
    <StyledLink
      key={item.label}
      to={item.link}
      width={100 / items.length}
    >
      {item.label}
    </StyledLink>
  );
}

class MenuFooter extends PureComponent {
  render() {
    return (
      <Footer>
        <Link onClick={() => Store.dispatch(close())} to="/">
          <StyledFMBLogo />
        </Link>
        <FooterLinks>
          {config.menu.footeritems.map((item, i, items) => renderItem(item, i, items))}
        </FooterLinks>
        <SocialLinks title="Folge uns" />
      </Footer>
    );
  }
}

export default MenuFooter;
