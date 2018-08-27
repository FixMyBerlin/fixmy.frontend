import React, { PureComponent } from 'react';

import ContentWrapper from '~/components/styled/ContentWrapper';
import MenuButton from '~/components/MenuButton';

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
