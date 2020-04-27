import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';

const MapWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const MapImg = styled.img`
  width: 90%;
  height: auto;
  margin: 1em auto;

  ${media.m`
    height: 20em;
    width: auto;
  `}
`;

const KiezMap = ({ street }) => (
  <MapWrapper>
    <MapImg
      src={`/src/images/spielstrassen/kieze/${street}.png`}
      alt={`${street} im Kiezumfeld`}
    />
  </MapWrapper>
);

export default KiezMap;
