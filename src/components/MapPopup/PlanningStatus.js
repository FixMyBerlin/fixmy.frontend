import React from 'react';

import Title from '~/components/styled/Title';

export default (props) => {
  const { section } = props;
  const planningTitle = section.side0_planning_title || section.sideNone_planning_title || section.side1_planning_title;

  if (!section) {
    return null;
  }

  const PlanningStatusLabel = planningTitle || 'Keine Planungen vorhanden.';

  return (
    <Title>{PlanningStatusLabel}</Title>
  );
};
