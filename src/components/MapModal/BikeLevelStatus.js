import React from 'react';
import styled from 'styled-components';

const BikeLevelStatus = styled.div`
  color: ${config.colors.interaction};
  font-size: 22px;
  margin-bottom: 15px;
`;

export default props => (
  <BikeLevelStatus {...props}>Happy Bike-Level: 1,4</BikeLevelStatus>
);
