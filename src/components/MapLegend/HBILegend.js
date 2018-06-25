import React from 'react';
import styled from 'styled-components';

import Store from '~/redux/store';
import { setHbiFilter, resetHbiFilter } from '~/modules/MapView/MapState';

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
  cursor: pointer;

  &:hover {
    opacity: .9;
  }
`;

const LegendIconWrapper = styled.div`
  position: relative;
`;

const LegendIcon = styled.div`
  width: 55px;
  height: 35px;
  background: ${props => props.color};
`;

const LegendLabel = styled.div`
  font-size: 10px;
  color: ${config.colors.darkgrey};
  flex-shrink: 0;
`;

const CloseLegendItem = styled.div`
  display: ${props => (props.closable ? 'block' : 'none')};
  position: absolute;
  right: -5px;
  top: -5px;
  width: 15px;
  height: 15px;
  background: #fff;
  font-size: 10px;
  border: 1px solid ${config.colors.darkgrey};
  border-radius: 50%;
  text-align: center;
`;

function filterHbi(min, max, index) {
  Store.dispatch(setHbiFilter(min, max, index));
}

function resetHbi() {
  Store.dispatch(resetHbiFilter());
}

export default props => (
  <HBILegend>
    {config.hbiStops.map((legendItem, i) => (
      <LegendItem key={`LegendItem__${legendItem.label}`}>
        <LegendIconWrapper>
          <CloseLegendItem onClick={resetHbi} closable={props.filterHbiIndex === i}>×</CloseLegendItem>
          <LegendIcon color={legendItem.color} onClick={() => filterHbi(legendItem.min, legendItem.max, i)} />
        </LegendIconWrapper>
        <LegendLabel>{legendItem.label}</LegendLabel>
      </LegendItem>
    ))
    }
  </HBILegend>
);
