import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

import MenuButton from '~/components2/MenuButton';
import SeparatorImage from '~/images/header-separator.svg';
import config from '~/config';

const Wrapper = styled(Box)`
  display: flex;
  align-items: top;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Separator = styled(SeparatorImage)`
  margin-right: 1em;
  height: 69px;
`;

const Title = styled.h1`
  color: ${config.colors.darkgrey};
  font-weight: bold;
  font-size: 1em;
  line-height: 1.5em;
`;

const Subtitle = styled.span`
  font-size: 0.75em;
  color: ${config.colors.darkgrey};
  margin-top: -10px;
  display: block;
  border-bottom: none !important;
`;

const LinkWrapper = styled(Link)`
  border-bottom: none;
  color: ${config.colors.interaction};
  text-decoration: none;

  &:visited,
  &:hover {
    color: ${config.colors.interaction};
    text-decoration: none;
  }
`;

const Header = ({ to = '/', showInfoLink = false, children }) => (
  <Wrapper>
    <MenuButton />
    <Separator />
    <LinkWrapper to={to}>
      <Title>{children}</Title>
      {showInfoLink === true && <Subtitle>Alle Infos zur Aktion &gt;</Subtitle>}
    </LinkWrapper>
  </Wrapper>
);

export default Header;
