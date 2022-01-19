import React from 'react';
import styled from 'styled-components';

import BraceHorizontal from '~/images/selector-brace.svg';
import BraceVertical from '~/images/selector-brace_vertical.svg';
import { media } from '~/styles/utils';

const StyledBraceHorizontalZustand = styled(BraceHorizontal)`
  display: block;
  width: 100%;
  margin-left: -30px;

  ${media.m`
    display: none;
  `}
`;

const StyledBraceHorizontalPlanung = styled(BraceHorizontal)`
  display: block;
  width: 100%;
  margin-left: 30px;

  ${media.m`
    display: none;
  `}
`;

const StyledBraceWrapper = styled.div`
  display: block;
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
        <StyledBraceHorizontalZustand />
      ) : (
        <StyledBraceHorizontalPlanung />
      )}
      <StyledBraceVertical />
    </StyledBraceWrapper>
  );
};
