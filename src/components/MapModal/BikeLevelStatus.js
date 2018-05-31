import React from 'react';
import styled from 'styled-components';

import { numberFormat } from '~/utils';

const BikeLevelStatus = styled.div`
  color: ${config.colors.interaction};
  font-size: 22px;
  margin-bottom: 15px;
`;

export default (props) => {
  const bikeLevelTotal = (props.level0 + props.level1) / 2;
  const bikeLevelTotalFormatted = numberFormat(bikeLevelTotal);

  return <BikeLevelStatus {...props}>Happy Bike-Level: {bikeLevelTotalFormatted}</BikeLevelStatus>;
};
