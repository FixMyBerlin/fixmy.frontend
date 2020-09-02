import React from 'react';
import { useIntl, defineMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import MenuWrapper from './MenuWrapper';
import MenuHeader from './MenuHeader';
import Navigation from './Navigation';
import MenuFooter from './MenuFooter';

const label = defineMessage({
  id: 'components.menu.ariaRole',
  defaultMessage: 'Hauptmenü'
});

const Menu = () => {
  const intl = useIntl();
  const isMenuOpen = useSelector(({ AppState }) => AppState.isMenuOpen);
  const token = useSelector(({ UserState }) => UserState.token);
  return (
    <MenuWrapper isActive={isMenuOpen} aria-label={intl.formatMessage(label)}>
      <MenuHeader token={token} />
      <Navigation />
      <MenuFooter />
    </MenuWrapper>
  );
};

export default Menu;
