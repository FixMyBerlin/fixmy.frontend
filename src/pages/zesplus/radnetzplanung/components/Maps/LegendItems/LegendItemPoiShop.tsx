import React from 'react';
import {
  IconWrapper,
  LegendItem,
} from '~/components2/Article/Map/MapLegendStyledComponents';
import { IconLegendCircle } from '../IconLegend';
import IconHeatmap from '../icons/heatmap.svg';

export const LegendItemPoiShop = () => {
  return (
    <>
      <LegendItem>
        <IconWrapper>
          <IconHeatmap />
        </IconWrapper>
        Wichtige Zielorte
      </LegendItem>
      <LegendItem style={{ fontSize: '86%' }}>
        <IconWrapper> </IconWrapper>
        <div>
          <em>Wenn nah heran gezoomed:</em> <br />
          <div style={{ width: '10px', display: 'inline-block' }}>
            <IconLegendCircle color="#e709fb" borderWidth={0} size={5} />
          </div>{' '}
          Einkaufen
          <br />
          <div style={{ width: '10px', display: 'inline-block' }}>
            <IconLegendCircle color="#960854" borderWidth={0} size={5} />
          </div>{' '}
          Freizeit / Sport
          <br />
          <div style={{ width: '10px', display: 'inline-block' }}>
            <IconLegendCircle color="#1122df" borderWidth={0} size={5} />
          </div>{' '}
          Bildungsstätten
        </div>
      </LegendItem>
    </>
  );
};
