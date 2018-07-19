/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';
import styled from 'styled-components';

const PlanningLegend = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LegendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px 10px 10px;
`;
const LegendItemLabel = styled.div`
  font-size: 10px;
  color: ${config.colors.darkgrey};
`;
const LegendIcon = styled.img`
  width: 30px;
`;

export default () => (
  <PlanningLegend>
    <LegendItem>
      <LegendIcon src={require('~/images/planning-icons/konzept@3x.png')} />
      <LegendItemLabel>Konzept</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <LegendIcon src={require('~/images/planning-icons/planung@3x.png')} />
      <LegendItemLabel>Planung</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <LegendIcon src={require('~/images/planning-icons/bau@3x.png')} />
      <LegendItemLabel>im Bau</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <LegendIcon src={require('~/images/planning-icons/fertig@3x.png')} />
      <LegendItemLabel>Fertig</LegendItemLabel>
    </LegendItem>
  </PlanningLegend>
);
