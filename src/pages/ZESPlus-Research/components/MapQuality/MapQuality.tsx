import React from 'react';

import { Map as ArticleMap } from '~/components2/Article';
import { BOUNDS_ZES, ZES_CENTER, ZES_ZOOM } from '../../constants';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '../BaseLegend';

import IconPathFB from './icons/f-fb.svg';
import IconPathSR from './icons/f-sr.svg';
import IconPathGW from './icons/f-gw.svg';
import IconQ1 from './icons/q1.svg';
import IconQ2 from './icons/q2.svg';
import IconQ3 from './icons/q3.svg';
import IconQ4 from './icons/q4.svg';
import IconQ5 from './icons/q5.svg';

const MAP_STYLE_QUALITY = 'mapbox://styles/hejco/ckhurerfv3wgv1aog7t7ek3gs';

const MapQuality = () => (
  <>
    <ArticleMap
      mapboxStyle={MAP_STYLE_QUALITY}
      maxBounds={BOUNDS_ZES}
      center={ZES_CENTER}
      zoom={ZES_ZOOM}
    />
    <Legend>
      <LegendCol>
        <LegendHeader>Oberflächenbewertung ¹</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconQ1 />
            </IconWrapper>{' '}
            Sehr gut
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconQ2 />
            </IconWrapper>{' '}
            Gut
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconQ3 />
            </IconWrapper>{' '}
            Mittelmäßig
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconQ4 />
            </IconWrapper>{' '}
            Schlecht
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconQ5 />
            </IconWrapper>{' '}
            Sehr schlecht
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Radinfrastruktur (vorhandene)²</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconPathSR />
            </IconWrapper>{' '}
            Radweg im Seitenraum (neben Gehweg)
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconPathFB />
            </IconWrapper>{' '}
            Führung auf der Fahrbahn
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconPathGW />
            </IconWrapper>{' '}
            Gehweg Radfahrer frei
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendSources>
        Quellen: ¹ SimRa - TU Berlin 2020, ² OSM 2020
      </LegendSources>
    </Legend>
  </>
);

export default MapQuality;
