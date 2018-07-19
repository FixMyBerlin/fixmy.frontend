import React from 'react';
import styled from 'styled-components';

const PlanningStatus = styled.div`
  color: ${config.colors.change_4};
  font-size: 22px;
  margin-bottom: 15px;
`;

export default (props) => {
  const { section } = props;
  const planningTitle = section.side0_planning_title || section.sideNone_planning_title || section.side1_planning_title;

  if (!section) {
    return null;
  }

  const PlanningStatusLabel = planningTitle || 'Keine Planungen vorhanden.';

  return (
    <PlanningStatus>{PlanningStatusLabel}</PlanningStatus>
  );
};
