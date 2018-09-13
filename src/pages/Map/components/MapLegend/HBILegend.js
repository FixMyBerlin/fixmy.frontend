/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';

import Store from '~/store';
import { toggleHbiFilter } from '~/pages/Map/MapState';
import Label from '~/components/Label';
import LegendWrapper from './LegendWrapper';
import LegendImageWrapper from './LegendImageWrapper';
import LegendItem from './LegendItem';

export default props => (
  <LegendWrapper>
    {config.hbiStops.map((legendItem, i) => (
      <LegendItem onClick={() => Store.dispatch(toggleHbiFilter(i))} isActive={props.filterHbi[i]} key={`LegendItem__${legendItem.label}`}>
        <LegendImageWrapper>
          <img
            alt={`Legende - ${legendItem.label}`}
            src={require(`~/images/hbi-stop-icons/${legendItem.image}`)}
          />
        </LegendImageWrapper>
        <Label>{legendItem.label}</Label>
      </LegendItem>
    ))
    }
  </LegendWrapper>
);
