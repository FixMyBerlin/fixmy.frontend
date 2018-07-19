/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';
import styled from 'styled-components';

import ConceptIcon from '~/images/planning-icons/konzept.svg';
import PlanningIcon from '~/images/planning-icons/planung.svg';
import ConstructionIcon from '~/images/planning-icons/bau.svg';

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
const LegendItemIcon = styled.div`
  font-size: 20px;
`;

export default () => (
  <PlanningLegend>
    <LegendItem>
      <LegendItemIcon>
        <ConceptIcon width={32} height={35} />
      </LegendItemIcon>
      <LegendItemLabel>Konzept</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <LegendItemIcon>
        <PlanningIcon width={32} height={35} />
      </LegendItemIcon>
      <LegendItemLabel>Planung</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <LegendItemIcon>
        <ConstructionIcon width={32} height={35} />
      </LegendItemIcon>
      <LegendItemLabel>im Bau</LegendItemLabel>
    </LegendItem>
    <LegendItem>
      <LegendItemIcon>
        <ConstructionIcon width={32} height={35} />
      </LegendItemIcon>
      <LegendItemLabel>Fertig</LegendItemLabel>
    </LegendItem>
  </PlanningLegend>
);
