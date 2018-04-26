import React from 'react';
import styled from 'styled-components';

import Headline from '~/components/Headline';

const AboutHeader = styled.div`
  padding: 0;
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: center;
  border-bottom: 1px dashed ${config.colors.midgrey};
`;

export default () => (
  <AboutHeader>
    <Headline>Worum geht es hier?</Headline>
  </AboutHeader>
);
