import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import MenuWrapper from './MenuWrapper';
import MenuHeader from './MenuHeader';
import Navigation from './Navigation';
import MenuFooter from './MenuFooter';

class Menu extends PureComponent {
  render() {
    return (
      <MenuWrapper isActive={this.props.isMenuOpen}>
        <MenuHeader token={this.props.token} />
        <Navigation />
        <MenuFooter />
      </MenuWrapper>
    );
  }
}

export default connect(state => ({
  ...state.AppState,
  token: state.UserState.token
}))(Menu);
