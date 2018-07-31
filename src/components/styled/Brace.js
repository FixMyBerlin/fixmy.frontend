import React from 'react';
import styled from 'styled-components';

import BraceHorizontalZustand from '~/images/brace-horizontal-zustand.svg';
import BraceHorizontalPlanung from '~/images/brace-horizontal-planung.svg';

const StyledBraceHorizontalZustand = styled(BraceHorizontalZustand)`
  display: block;
  width: 100%;
`;

const StyledBraceHorizontalPlanung = styled(BraceHorizontalPlanung)`
  display: block;
  width: 100%;
`;

export default props => (
  props.type === 'zustand' ?
    <StyledBraceHorizontalZustand /> :
    <StyledBraceHorizontalPlanung />
);
