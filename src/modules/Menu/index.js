import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import SocialLinks from '~/components/Social/SocialLinks';

import MenuWrapper from './MenuWrapper';
import MenuHeader from './MenuHeader';
import Navigation from './Navigation';

class Menu extends PureComponent {
  render() {
    return (
      <MenuWrapper isActive={this.props.isOpen}>
        <MenuHeader />
        <Navigation />

        <SocialLinks title="Folgt uns auf Twitter" />
      </MenuWrapper>
    );
  }
}

export default connect(state => state.MenuState)(Menu);
