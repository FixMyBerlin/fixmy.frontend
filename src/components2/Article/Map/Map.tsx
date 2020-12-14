import React from 'react';
import styled from 'styled-components';
import BaseMap from '~/components2/Map';
import { media } from '~/styles/utils';

const StyledMap = styled(BaseMap)`
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Wrapper = styled.div`
  margin: 0 -16px;
  position: relative;
  padding-top: 66%;

  ${media.m`
    width: 100%;
    margin: 3em auto;
  `}
`;

const Map = ({ ...mapProps }) => (
  <Wrapper>
    <StyledMap {...mapProps} />
  </Wrapper>
);

export default Map;
