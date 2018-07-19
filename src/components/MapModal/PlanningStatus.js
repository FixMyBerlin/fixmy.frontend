import React from 'react';
import styled from 'styled-components';

const PlanningStatus = styled.div`
  color: ${config.colors.change_4};
  font-size: 22px;
  margin-bottom: 15px;
`;

export default (props) => {
  console.log(props);
  return (
    <PlanningStatus {...props}>Neubau eines geschützten Radfahrstreifens</PlanningStatus>
  );
};
