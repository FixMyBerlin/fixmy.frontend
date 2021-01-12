import React from 'react';
import { useIntl, defineMessage } from 'react-intl';
import { useTypedSelector } from '~/store';

import MenuWrapper from './MenuWrapper';
import MenuHeader from './MenuHeader';
import Navigation from './Navigation';
import MenuFooter from './MenuFooter';

const label = defineMessage({
  id: 'components.menu.ariaRole',
  defaultMessage: 'Hauptmenü',
});

const Menu = () => {
  const intl = useIntl();
  const isMenuOpen = useTypedSelector(({ AppState }) => AppState.isMenuOpen);
  const token = useTypedSelector(({ UserState }) => UserState.token);
  return (
    <MenuWrapper isActive={isMenuOpen} aria-label={intl.formatMessage(label)}>
      <MenuHeader token={token} />
      <Navigation />
      <MenuFooter />
    </MenuWrapper>
  );
};

export default Menu;
