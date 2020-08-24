import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, AppBarProps, Button } from '@material-ui/core';

import MenuButton from '~/components2/MenuButton';
import SeparatorImage from '~/images/header-separator.svg';
import config from '~/config';

import ChatTranslate from './chat-translate.svg';

const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${config.colors.white};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

    .MuiToolbar-root {
      padding-left: 0;
    }
  }
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
  flex-grow: 1;

  &:visited,
  &:hover {
    color: ${config.colors.interaction};
    text-decoration: none;
  }
`;

const LogoWrapper = styled.div`
  margin: 1em 1em 1em auto;
`;

const ChatTranslateIcon = styled(ChatTranslate)`
  width: 32px;
  height: 32px;
`;

interface Props extends AppBarProps {
  to?: string;
  showInfoLink?: boolean;
  logo?: React.ReactNode;
  localeSwitcher?: boolean;
}

const Header = ({
  to = '/',
  showInfoLink = false,
  logo = null,
  position = 'static',
  localeSwitcher = false,
  children,
  ...props
}: Props) => (
  <StyledAppBar position={position} role="banner" {...props}>
    <Toolbar>
      <MenuButton />
      <Separator />
      <LinkWrapper to={to}>
        <Title>{children}</Title>
        {showInfoLink === true && (
          <Subtitle>Alle Infos zur Aktion &gt;</Subtitle>
        )}
      </LinkWrapper>
      {localeSwitcher && <Button endIcon={<ChatTranslateIcon />}>de</Button>}
      {logo && <LogoWrapper>{logo}</LogoWrapper>}
    </Toolbar>
  </StyledAppBar>
);

export default Header;
