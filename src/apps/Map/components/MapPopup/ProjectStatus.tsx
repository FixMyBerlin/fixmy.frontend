import React from 'react';
import styled from 'styled-components';

import Title from '~/components/Title';

const StyledTitle = styled(Title)`
  margin: 16px 0 24px 0;
`;

export const ProjectStatus = ({ section }) => {
  if (!section) {
    return null;
  }

  return <StyledTitle data-cy="section-title">{section.title}</StyledTitle>;
};
