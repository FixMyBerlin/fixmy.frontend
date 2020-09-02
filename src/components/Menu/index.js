import React from 'react';
import { useIntl, defineMessage } from 'react-intl';
import { connect } from 'react-redux';

import MenuWrapper from './MenuWrapper';
import MenuHeader from './MenuHeader';
import Navigation from './Navigation';
import MenuFooter from './MenuFooter';

const label = defineMessage({
  id: 'components.menu.ariaRole',
  defaultMessage: 'Hauptmenü'
});

const Menu = ({ isMenuOpen, token }) => {
  const intl = useIntl();
  return (
    <MenuWrapper isActive={isMenuOpen} aria-label={intl.formatMessage(label)}>
      <MenuHeader token={token} />
      <Navigation />
      <MenuFooter />
    </MenuWrapper>
  );
};

export default connect((state) => ({
  ...state.AppState,
  token: state.UserState.token
}))(Menu);
