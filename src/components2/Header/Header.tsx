import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, AppBarProps, Button } from '@material-ui/core';

import MenuButton from '~/components2/MenuButton';
import SeparatorImage from '~/images/header-separator.svg';
import config from '~/config';
import { useTypedSelector } from '~/store';

import ChatTranslate from './chat-translate.svg';
import LocaleMenu from './LocaleMenu';
import { LocaleCode } from '~/types';
import { media } from '~/styles/utils';

const StyledAppBar = styled(({ isOpen, hideAppBar, ...props }) => (
  <AppBar {...props} />
))<
  typeof AppBar & {
    isOpen: boolean;
    hideAppBar: boolean;
  }
>`
  && {
    background: ${({ hideAppBar }) =>
      hideAppBar ? 'none' : config.colors.white};
    box-shadow: ${({ hideAppBar }) =>
      hideAppBar ? 'none' : '0 0 10px 0 rgba(0, 0, 0, 0.2)'};

    .MuiToolbar-root {
      padding-left: 0;
      opacity: ${(props) => (props.isOpen ? 0.7 : 1)};
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
  line-height: 1.2em;

  ${media.s`
    line-height: 1.5em;
  `}
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
  margin: 1em 0 1em auto;
`;

const ChatTranslateIcon = styled(({ isOpen, ...props }) => (
  <ChatTranslate {...props} />
))`
  width: 24px;
  height: 24px;
  path {
    fill: ${({ isOpen }) => (isOpen ? config.colors.interaction : 'initial')};
  }
`;

interface Props extends AppBarProps {
  to?: string;
  showInfoLink?: boolean;
  logo?: React.ReactNode;
  locales?: LocaleCode[];
  hideAppBar?: boolean;
  className?: string;
}

const Header = ({
  to = '/',
  showInfoLink = false,
  logo = null,
  position = 'static',
  locales = null,
  hideAppBar = false,
  children,
  className,
  ...props
}: Props) => {
  const [isLocaleMenuOpen, setLocaleMenu] = useState(false);
  const activeLocale = useTypedSelector((state) => state.AppState.locale);
  return (
    <StyledAppBar
      position={position}
      role="banner"
      isOpen={isLocaleMenuOpen}
      hideAppBar={hideAppBar}
      className={className}
      {...props}
    >
      <Toolbar>
        <MenuButton />
        {!hideAppBar && (
          <>
            <Separator />
            <LinkWrapper to={to}>
              {React.Children.count(children) > 0 && (
                <>
                  <Title>{children}</Title>
                  {showInfoLink === true && (
                    <Subtitle>Alle Infos zur Aktion &gt;</Subtitle>
                  )}
                </>
              )}
            </LinkWrapper>
          </>
        )}
        {locales && (
          <Button
            endIcon={<ChatTranslateIcon isOpen={isLocaleMenuOpen} />}
            onClick={() => setLocaleMenu(!isLocaleMenuOpen)}
          >
            {activeLocale}
          </Button>
        )}
        {logo && <LogoWrapper>{logo}</LogoWrapper>}
      </Toolbar>
      {locales && (
        <LocaleMenu
          locales={locales}
          open={isLocaleMenuOpen}
          onSelection={() => setLocaleMenu(false)}
        />
      )}
    </StyledAppBar>
  );
};

export default Header;
