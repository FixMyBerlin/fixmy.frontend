/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';
import { connect } from 'react-redux';

import { togglePlanningFilter } from '~/apps/Map/MapState';
import { PLANNING_PHASES } from '~/apps/Map/constants';
import Label from '~/components2/Label';
import Store from '~/store';

import LegendImageWrapper from './SelectorBarImageWrapper';
import LegendItem from './SelectorBarItem';
import LegendWrapper from './SelectorBarWrapper';

/* eslint-disable import/no-unresolved */
import ConstructionIcon from '~/images/planning-icons/bau.svg?component';
import DoneIcon from '~/images/planning-icons/fertig.svg?component';
import ConceptIcon from '~/images/planning-icons/konzept.svg?component';
import PlanningIcon from '~/images/planning-icons/planung.svg?component';
/* eslint-enable import/no-unresolved */

const Icons = {
  draft: ConceptIcon,
  planning: PlanningIcon,
  execution: ConstructionIcon,
  ready: DoneIcon,
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
  filterPlannings: state.MapState.filterPlannings,
}))(PlanningLegendComp);
