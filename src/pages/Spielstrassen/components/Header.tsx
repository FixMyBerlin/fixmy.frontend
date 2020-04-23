import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';

import MenuButton from '~/components2/MenuButton';
import SeparatorImage from '~/images/spielstrassen/separator.svg';

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
  font-weight: bold;
  font-size: 1em;
  line-height: 1.5em;
`;

const Header = () => (
  <Wrapper>
    <MenuButton />
    <Separator />
    <Title>Temporäre Spielstraßen für Friedrichshain-Kreuzberg</Title>
  </Wrapper>
);

export default Header;
