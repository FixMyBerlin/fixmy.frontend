import React from 'react';

import ContentOverlay from '~/components/ContentOverlay';
import ContentWrapper from '~/components/ContentWrapper';
import MenuButton from '~/components/MenuButton';
import Headline from '~/components/Headline';

export default props => (
  <ContentOverlay>
    <MenuButton />
    <ContentWrapper>
      <Headline>{props.title}</Headline>
    </ContentWrapper>
  </ContentOverlay>
);
