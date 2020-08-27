import React, { useState } from 'react';
import styled from 'styled-components';

import config from '~/config';
import ProjectStatusChart from './ProjectStatusChart';
import ProjectChecklist from './ProjectChecklist';

const DetailButton = styled.button`
  border: 1px solid ${config.colors.interaction};
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  padding: 5px 20px;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const DetailButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0 10px 0;
  display: none; // for now we dont want to show the details button
`;

const ProjectStatus = ({ phase }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      <ProjectStatusChart phase={phase} />
      <DetailButtonWrapper>
        <DetailButton onClick={toggleExpanded}>Details +</DetailButton>
      </DetailButtonWrapper>
      {isExpanded && <ProjectChecklist />}
    </>
  );
};

export default ProjectStatus;
