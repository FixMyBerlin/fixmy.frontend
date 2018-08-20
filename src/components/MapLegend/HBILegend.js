/* eslint import/no-dynamic-require: 0, global-require: 0 */

import React from 'react';
import styled from 'styled-components';

import Store from '~/redux/store';
import { toggleHbiFilter } from '~/modules/MapView/MapState';
import Label from '~/components/styled/Label';

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

  &:hover {
    opacity: .9;
  }
`;

const LegendImage = styled.img`
  width: 55px;
  filter: ${props => (props.isActive ? 'none' : 'grayscale(1)')};
`;

const LegendLabel = Label.extend`
  flex-shrink: 0;
`;

export default props => (
  <HBILegend>
    {config.hbiStops.map((legendItem, i) => (
      <LegendItem key={`LegendItem__${legendItem.label}`}>
        <LegendImage
          src={require(`~/images/hbi-stop-icons/${legendItem.image}`)}
          isActive={props.filterHbi[i]}
          onClick={() => Store.dispatch(toggleHbiFilter(i))}
        />
        <LegendLabel>{legendItem.label}</LegendLabel>
      </LegendItem>
    ))
    }
  </HBILegend>
);
