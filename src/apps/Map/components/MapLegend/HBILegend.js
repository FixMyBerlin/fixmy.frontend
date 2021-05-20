import React from 'react';

import { toggleHbiFilter } from '~/apps/Map/MapState';
import { HBI_STOPS } from '~/apps/Map/constants';
import Label from '~/components2/Label';
import Store from '~/store';

import LegendImageWrapper from './LegendImageWrapper';
import LegendItem from './LegendItem';
import LegendWrapper from './LegendWrapper';
import IconBad from './images/hbi-bad@2x.png';
import IconOk from './images/hbi-ok@2x.png';
import IconSuper from './images/hbi-super@2x.png';
import IconWorst from './images/hbi-worst@2x.png';

const Icons = {
  super: IconSuper,
  ok: IconOk,
  schlecht: IconBad,
  miserabel: IconWorst,
};

const HBILegend = (props) => (
  <LegendWrapper>
    {HBI_STOPS.map((hbiStop, i) => (
      <LegendItem
        onClick={() => Store.dispatch(toggleHbiFilter(i))}
        isActive={props.filterHbi[i]}
        key={`LegendItem__${hbiStop.label}`}
      >
        <LegendImageWrapper>
          <img alt={`Legende - ${hbiStop.label}`} src={Icons[hbiStop.label]} />
        </LegendImageWrapper>
        <Label>{hbiStop.label}</Label>
      </LegendItem>
    ))}
  </LegendWrapper>
);

export default HBILegend;
