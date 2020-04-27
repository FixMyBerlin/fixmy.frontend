import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';

import MenuButton from '~/components2/MenuButton';
import SeparatorImage from '~/images/spielstrassen/separator.svg';
import config from '~/config';
import Link from '~/components/Link';

const Wrapper = styled(Box)`
  display: flex;
  align-items: top;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  a {
    color: ${config.colors.darkgrey};
  }
`;

const Separator = styled(SeparatorImage)`
  margin-right: 1em;
  height: 69px;
`;

const Title = styled.h1`
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
  border-bottom: none !important;
`;

const Header = ({ showInfoLink = false }) => (
  <Wrapper>
    <MenuButton />
    <Separator />
    <LinkWrapper to={config.routes.spielstrassen.landing}>
      <Title>Temporäre Spielstraßen für Friedrichshain-Kreuzberg</Title>
      {showInfoLink === true && <Subtitle>Alle Infos zur Aktion &gt;</Subtitle>}
    </LinkWrapper>
  </Wrapper>
);

export default Header;
