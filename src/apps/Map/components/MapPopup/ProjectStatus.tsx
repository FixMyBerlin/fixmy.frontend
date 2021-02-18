import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Title from '~/components/Title';
import { RootState } from '~/store';

const StyledTitle = styled(Title)`
  margin: 16px 0 24px 0;
`;

export const ProjectStatus = () => {
  const title = useSelector<RootState>(
    ({ MapState }) => MapState.popupData?.section?.title
  );

  if (!title) {
    return null;
  }

  return <StyledTitle data-cy="section-title">{title}</StyledTitle>;
};
