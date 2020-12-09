import React from 'react';
import styled from 'styled-components';
import BaseMap from '~/components2/Map';
import { media } from '~/styles/utils';

const StyledMap = styled(BaseMap)`
  width: 100%;
  height: 35em;
`;

const Wrapper = styled.div`
  margin: 0 -16px;
  position: relative;

  ${media.m`
    margin: 3em auto;
  `}
`;

const Map = ({ ...mapProps }) => (
  <Wrapper>
    <StyledMap {...mapProps} />
  </Wrapper>
);

export default Map;