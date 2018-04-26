import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SocialButtons from '~/components/SocialButtons';

import MenuWrapper from './MenuWrapper';
import MenuHeader from './MenuHeader';
import Navigation from './Navigation';

const SocialButtonContainer = styled.div`
  margin-top: 1rem;
`;

const SocialButtonText = styled.div`
  font-size: 14px;
  color: ${config.colors.interaction};
  text-align: center;
  margin-bottom: 1rem;
`;

class Menu extends PureComponent {
  render() {
    return (
      <MenuWrapper isActive={this.props.isOpen}>
        <MenuHeader />
        <Navigation />

        <SocialButtonContainer>
          <SocialButtonText>Folgt uns auf Twitter</SocialButtonText>
          <SocialButtons />
        </SocialButtonContainer>
      </MenuWrapper>
    );
  }
}

export default connect(state => state.MenuState)(Menu);
