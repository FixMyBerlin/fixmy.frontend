/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';
import styled from 'styled-components';

import ConceptIcon from '~/images/planning-icons/konzept.svg';
import PlanningIcon from '~/images/planning-icons/planung.svg';
import ConstructionIcon from '~/images/planning-icons/bau.svg';
import DoneIcon from '~/images/planning-icons/fertig.svg';

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

export default () => (
  <PlanningLegend>
    <LegendItem>
      <ConceptIcon />
      <LegendItemLabel>Konzept</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <PlanningIcon />
      <LegendItemLabel>Planung</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <ConstructionIcon />
      <LegendItemLabel>im Bau</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <DoneIcon />
      <LegendItemLabel>Fertig</LegendItemLabel>
    </LegendItem>
  </PlanningLegend>
);
