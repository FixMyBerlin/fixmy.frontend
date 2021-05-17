import React from 'react';
import styled from 'styled-components';

// import BraceHorizontalZustand from '~/images/brace-horizontal-zustand.svg';
// import BraceHorizontalPlanung from '~/images/brace-horizontal-planung.svg';

import BraceHorizontalPlanung from '~/images/planung-brace.svg';
import BraceHorizontalZustand from '~/images/zustand-brace.svg';

const StyledBraceHorizontalZustand = styled(BraceHorizontalZustand)`
  display: block;
  width: 100%;
  margin: 0.5em 0;
`;

const StyledBraceHorizontalPlanung = styled(BraceHorizontalPlanung)`
  display: block;
  width: 100%;
  margin: 0.5em 0;
`;

export default (props) =>
  props.type === 'zustand' ? (
    <StyledBraceHorizontalZustand />
  ) : (
    <StyledBraceHorizontalPlanung />
  );
