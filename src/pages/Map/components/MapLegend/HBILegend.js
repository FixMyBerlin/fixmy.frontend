/* eslint import/no-dynamic-require: 0, global-require: 0 */

import React from 'react';
import styled from 'styled-components';

import Store from '~/store';
import { toggleHbiFilter } from '~/pages/Map/MapState';
import Label from '~/components/Label';

const HBILegend = styled.div`
  display: flex;
  width: 100%;
  max-width: 340px;
  padding: 20px 10px 10px 10px;
`;

const LegendItem = styled.div`
  width: 25%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  opacity: ${props => (props.isActive ? 1 : 0.4)};

  &:hover {
    opacity: .4;
  }
`;

const LegendImage = styled.img`
  width: 55px;
`;

const LegendLabel = styled(Label)`
  flex-shrink: 0;
`;

export default props => (
  <HBILegend>
    {config.hbiStops.map((legendItem, i) => (
      <LegendItem onClick={() => Store.dispatch(toggleHbiFilter(i))} isActive={props.filterHbi[i]} key={`LegendItem__${legendItem.label}`}>
        <LegendImage
          src={require(`~/images/hbi-stop-icons/${legendItem.image}`)}
        />
        <LegendLabel>{legendItem.label}</LegendLabel>
      </LegendItem>
    ))
    }
  </HBILegend>
);
