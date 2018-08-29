import React from 'react';
import styled from 'styled-components';

import { resetMap } from '~/pages/Map/map-utils';

const ResetMapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${config.colors.white};
  border-radius: 50%;
  border: 1px solid ${config.colors.midgrey};
  cursor: pointer;
  font-size: 24px;
  color: ${config.colors.midgrey};
`;

export default props => (
  <ResetMapButton {...props} onClick={resetMap}>
    ×
  </ResetMapButton>
);
