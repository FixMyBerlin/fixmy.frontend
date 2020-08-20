import React from 'react';
import styled from 'styled-components';

import FeelSafe, {
  FeelsafeSize,
  FeelsafeIcon
} from '~/pages/Research/components/FeelSafe';
import { media } from '~/styles/utils';
import config from '~/config';

const Subtitle = styled.div`
  color: ${config.colors.darkgrey};
  font-size: 0.75rem;
  margin-top: 5px;
  padding: 0 0.5em;
`;

export default Subtitle;
