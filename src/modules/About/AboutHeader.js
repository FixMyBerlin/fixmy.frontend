import React from 'react';
import styled from 'styled-components';

import Headline from '~/components/Headline';

const AboutHeader = styled.div`
  padding: 4.5rem 0 .5rem 0;
  margin: 0 2rem;
  text-align: center;
  border-bottom: 1px dashed ${config.colors.midgrey};
`;

export default () => (
  <AboutHeader>
    <Headline>Worum geht es hier?</Headline>
  </AboutHeader>
);
