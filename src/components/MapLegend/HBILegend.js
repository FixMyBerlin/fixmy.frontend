import React from 'react';
import styled from 'styled-components';

import Store from '~/redux/store';
import { setHbiFiler } from '~/modules/MapView/MapState';

const HBILegend = styled.div`
  display: flex;
  width: 100%;
  max-width: 340px;
  padding: 20px 10px;
`;

const LegendItem = styled.div`
  width: 25%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const LegendIcon = styled.div`
  width: 55px;
  height: 35px;
  background: #ddd;
`;

const LegendLabel = styled.div`
  font-size: 10px;
  color: ${config.colors.darkgrey};
  flex-shrink: 0;
`;

function filterHbi(min, max) {
  Store.dispatch(setHbiFiler(min, max));
}

export default () => (
  <HBILegend>
    <LegendItem onClick={() => filterHbi(0, 2.5)}>
      <LegendIcon />
      <LegendLabel>sehr gefährlich</LegendLabel>
    </LegendItem>
    <LegendItem onClick={() => filterHbi(2.5, 5)}>
      <LegendIcon />
      <LegendLabel>gefährlich</LegendLabel>
    </LegendItem>
    <LegendItem onClick={() => filterHbi(5, 7.5)}>
      <LegendIcon />
      <LegendLabel>ok</LegendLabel>
    </LegendItem>
    <LegendItem onClick={() => filterHbi(7.5, Number.MAX_VALUE)}>
      <LegendIcon />
      <LegendLabel>sehr gut</LegendLabel>
    </LegendItem>
  </HBILegend>
);
