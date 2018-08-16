/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';
import styled from 'styled-components';

import ConceptIcon from '~/images/planning-icons/konzept.svg';
import PlanningIcon from '~/images/planning-icons/planung.svg';
import ConstructionIcon from '~/images/planning-icons/bau.svg';
import DoneIcon from '~/images/planning-icons/fertig.svg';
import Label from '~/components/styled/Label';

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

export default () => (
  <PlanningLegend>
    <LegendItem>
      <ConceptIcon />
      <Label>Konzept</Label>
    </LegendItem>
    <LegendItem>
      <PlanningIcon />
      <Label>Planung</Label>
    </LegendItem>
    <LegendItem>
      <ConstructionIcon />
      <Label>im Bau</Label>
    </LegendItem>
    <LegendItem>
      <DoneIcon />
      <Label>Fertig</Label>
    </LegendItem>
  </PlanningLegend>
);
