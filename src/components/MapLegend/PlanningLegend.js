/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ConceptIcon from '~/images/planning-icons/konzept.svg';
import PlanningIcon from '~/images/planning-icons/planung.svg';
import ConstructionIcon from '~/images/planning-icons/bau.svg';
import DoneIcon from '~/images/planning-icons/fertig.svg';

import Label from '~/components/styled/Label';

import Store from '~/redux/store';
import { togglePlanningFilter } from '~/modules/MapView/MapState';

const Icons = {
  draft: ConceptIcon,
  planning: PlanningIcon,
  execution: ConstructionIcon,
  ready: DoneIcon
};

const PlanningLegend = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LegendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px 10px 10px;
  cursor: pointer;
  opacity: ${props => (props.isActive ? 1 : 0.4)};

  &:hover {
    opacity: .4;
  }
`;

const LegendIconWrapper = styled.div``;

function handleClick(index) {
  Store.dispatch(togglePlanningFilter(index));
}

function renderLegendItem(props, index, isActive) {
  const Icon = Icons[props.id];

  return (
    <LegendItem isActive={isActive} onClick={() => handleClick(index)} key={`PlanningLegendItem__${props.id}`}>
      <LegendIconWrapper>
        <Icon />
      </LegendIconWrapper>
      <Label>{props.name}</Label>
    </LegendItem>
  );
}

const PlanningLegendComp = ({ filterPlannings }) => (
  <PlanningLegend>
    {config.planningPhases.map((item, index) => renderLegendItem(item, index, filterPlannings[index]))}
  </PlanningLegend>
);

export default connect(state => ({
  filterPlannings: state.MapState.filterPlannings
}))(PlanningLegendComp);
