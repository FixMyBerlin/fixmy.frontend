import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

/* eslint-disable import/no-unresolved */
import BraceHorizontal from '~/images/selector-brace.svg?component';
import BraceVertical from '~/images/selector-brace_vertical.svg?component';
/* eslint-enable import/no-unresolved */

const StyledBraceHorizontal = styled(BraceHorizontal)`
  display: block;
  width: 100%;
  margin-left: ${(props) => props.pixel};

  ${media.m`
    display: none;
  `}
`;

const StyledBraceWrapper = styled.div`
  // This is the width of the SVG file
  width: 950px;
  position: absolute;
  left: 50%;
  margin-left: -475px;
  overflow: hidden;

  ${media.m`
    width: 100%;
    height: 200px;
    position: static;
    margin: -50px 0;
  `}
`;

const StyledBraceVertical = styled(BraceVertical)`
  display: block;
  height: 100%;
`;

export default (props) => {
  return (
    <StyledBraceWrapper>
      {props.type === 'zustand' ? (
        <StyledBraceHorizontal pixel="-30px" />
      ) : (
        <StyledBraceHorizontal pixel="30px" />
      )}
      <StyledBraceVertical />
    </StyledBraceWrapper>
  );
};
