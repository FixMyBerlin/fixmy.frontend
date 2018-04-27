import React from 'react';
import styled from 'styled-components';

import Headline from '~/components/Headline';

const ContentHeader = styled.div`
  padding: 0;
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: center;
  border-bottom: 1px dashed ${config.colors.midgrey};
`;

export default () => (
  <ContentHeader>
    <Headline>Worum geht es hier?</Headline>
  </ContentHeader>
);
