import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import MenuWrapper from './MenuWrapper';
import MenuHeader from './MenuHeader';
import Navigation from './Navigation';

class Menu extends PureComponent {
  render() {
    return (
      <MenuWrapper isActive={this.props.isOpen}>
        <MenuHeader />
        <Navigation />
      </MenuWrapper>
    );
  }
}

export default connect(state => state.MenuState)(Menu);
