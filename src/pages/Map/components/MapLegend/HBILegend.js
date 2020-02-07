/* eslint import/no-dynamic-require: 0, global-require: 0 */
import React from 'react';

import config from '~/pages/Map/config';
import Store from '~/store';
import { toggleHbiFilter } from '~/pages/Map/MapState';
import Label from '~/components/Label';
import LegendWrapper from './LegendWrapper';
import LegendImageWrapper from './LegendImageWrapper';
import LegendItem from './LegendItem';
import IconSuper from '~/images/hbi-stop-icons/sehrgut@2x.png';
import IconOk from '~/images/hbi-stop-icons/ok@2x.png';
import IconBad from '~/images/hbi-stop-icons/gefaehrlich@2x.png';
import IconWorst from '~/images/hbi-stop-icons/sehrgefaehrlich@2x.png';

const Icons = {
  super: IconSuper,
  ok: IconOk,
  schlecht: IconBad,
  'sehr schlecht': IconWorst
};

export default (props) => (
  <LegendWrapper>
    {config.hbiStops.map((legendItem, i) => (
      <LegendItem
        onClick={() => Store.dispatch(toggleHbiFilter(i))}
        isActive={props.filterHbi[i]}
        key={`LegendItem__${legendItem.label}`}
      >
        <LegendImageWrapper>
          <img
            alt={`Legende - ${legendItem.label}`}
            src={Icons[legendItem.label]}
          />
        </LegendImageWrapper>
        <Label>{legendItem.label}</Label>
      </LegendItem>
    ))}
  </LegendWrapper>
);
