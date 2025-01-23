import React, { PureComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { close } from '~/AppState';
import SocialLinks from '~/components/Social/SocialLinks';
import { Logo as FMBLogo } from '~/components2/Logo';
import config from '~/config';
import Store from '~/store';

const Footer = styled.div`
  background: ${config.colors.lightgrey};
  color: ${config.colors.darkgrey};
  padding: 1.5rem 0;
  display: block;
`;

const StyledFMBLogo = styled(FMBLogo)`
  text-align: center;
  margin-bottom: 1rem;
`;

const FooterLinks = styled.div`
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(NavLink).attrs((props) => ({ to: props.to }))`
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  color: #635638;
`;

const ExternalLink = styled(Link)`
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  color: #635638;
`;

function renderItem(item, index) {
  return item.external === true ? (
    <ExternalLink
      href={item.link}
      key={item.label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.label}
    </ExternalLink>
  ) : (
    <StyledLink
      key={item.label}
      to={item.link}
      index={index}
      onClick={() => Store.dispatch(close())}
      tabIndex={0}
    >
      {item.label}
    </StyledLink>
  );
}

class MenuFooter extends PureComponent {
  render() {
    return (
      <Footer>
        {config.menu.logo !== false && (
          <Link onClick={() => Store.dispatch(close())} to="/">
            <StyledFMBLogo />
          </Link>
        )}
        <FooterLinks>
          {config.menu.footeritems.map((item, i) => renderItem(item, i))}
        </FooterLinks>
      </Footer>
    );
  }
}

export default MenuFooter;
