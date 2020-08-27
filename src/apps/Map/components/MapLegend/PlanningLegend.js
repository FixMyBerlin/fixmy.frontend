/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';
import { connect } from 'react-redux';

import config from '~/config';
import ConceptIcon from '~/images/planning-icons/konzept.svg';
import PlanningIcon from '~/images/planning-icons/planung.svg';
import ConstructionIcon from '~/images/planning-icons/bau.svg';
import DoneIcon from '~/images/planning-icons/fertig.svg';

import Store from '~/store';
import Label from '~/components/Label';
import { togglePlanningFilter } from '~/apps/Map/MapState';
import LegendWrapper from './LegendWrapper';
import LegendImageWrapper from './LegendImageWrapper';
import LegendItem from './LegendItem';
import { PLANNING_PHASES } from '~/apps/Map/constants';

const Icons = {
  draft: ConceptIcon,
  planning: PlanningIcon,
  execution: ConstructionIcon,
  ready: DoneIcon
};

function handleClick(index) {
  Store.dispatch(togglePlanningFilter(index));
}

function renderLegendItem(props, index, isActive) {
  const Icon = Icons[props.id];

  return (
    <LegendItem
      isActive={isActive}
      onClick={() => handleClick(index)}
      key={`PlanningLegendItem__${props.id}`}
    >
      <LegendImageWrapper>
        <Icon />
      </LegendImageWrapper>
      <Label>{props.name}</Label>
    </LegendItem>
  );
}

const PlanningLegendComp = ({ filterPlannings }) => (
  <LegendWrapper>
    {PLANNING_PHASES.map((item, index) =>
      renderLegendItem(item, index, filterPlannings[index])
    )}
  </LegendWrapper>
);

export default connect((state) => ({
  filterPlannings: state.MapState.filterPlannings
}))(PlanningLegendComp);
