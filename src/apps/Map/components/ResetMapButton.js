import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import resetMap from '~/apps/Map/reset';

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

export default (props) => (
  // Wrapper components may use prop spreading
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ResetMapButton {...props} onClick={resetMap}>
    ×
  </ResetMapButton>
);
