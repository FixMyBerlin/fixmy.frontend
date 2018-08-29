import React, { PureComponent } from 'react';
import styled from 'styled-components';

import MenuButton from '~/components/MenuButton';

const ContentWrapper = styled.div`
  padding: 3rem 2rem 0 2rem;
  max-width: 650px;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;

class ContentPageWrapper extends PureComponent {
  render() {
    return (
      <ContentWrapper>
        <MenuButton />
        {this.props.children}
      </ContentWrapper>
    );
  }
}

export default ContentPageWrapper;
