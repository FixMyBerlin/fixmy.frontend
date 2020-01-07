import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

import Store from '~/store';
import { close } from '~/AppState';
import FMBLogo from '~/components/FMBLogo';
import SocialLinks from '~/components/Social/SocialLinks';

function getTextAlign(index) {
  switch (index % 3) {
    case 0:
      return 'left';
    case 1:
      return 'center';
    case 2:
      return 'right';
    default:
      return 'center';
  }
}

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
  flex-wrap: wrap;
`;

const StyledLink = styled(NavLink).attrs((props) => ({ to: props.to }))`
  width: 33.3333%;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  color: #635638;
  text-align: ${(props) => getTextAlign(props.index)};
`;

function renderItem(item, index) {
  return (
    <StyledLink key={item.label} to={item.link} index={index}>
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
          {config.menu.footeritems.map((item, i) => renderItem(item, i))}
        </FooterLinks>
        <SocialLinks title="Folge uns" />
      </Footer>
    );
  }
}

export default MenuFooter;
