import React from 'react';
import styled from 'styled-components';

import config from '~/config';

const Separator = styled.div`
  border-top: 1px solid #eee;
  text-transform: uppercase;
  font-size: 10px;
  color: ${config.colors.midgrey};
  padding: 1.5rem 2rem 0;
`;

export default ({ label }) => <Separator>{label}</Separator>;
