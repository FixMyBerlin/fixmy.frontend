import React from 'react';

import { Map as ArticleMap } from '~/components2/Article';
import { BOUNDS_ZES } from '../../constants';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '../BaseLegend';

import IconBV from './icons/berliner-verbaende.svg';
import IconKDS from './icons/konzept-dahme-spree.svg';
import IconKS from './icons/konzept-schoenefeld.svg';
import IconRSV from './icons/radschnellverbindungen.svg';
import IconT from './icons/touristische.svg';
import IconV from './icons/varianten-rsv.svg';
import IconHeatmap from './icons/heatmap.svg';
import IconZES from './icons/zes.svg';

const MAP_STYLE_QUALITY = 'mapbox://styles/hejco/ckhurerfv3wgv1aog7t7ek3gs';

const MapNetworks = () => (
  <>
    <ArticleMap mapboxStyle={MAP_STYLE_QUALITY} maxBounds={BOUNDS_ZES} />
    <Legend>
      <LegendCol>
        <LegendHeader>Übergeordnete Netze</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconT />
            </IconWrapper>{' '}
            Touristische Radrouten¹
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconRSV />
            </IconWrapper>{' '}
            Radschnellverbindung Berlin Y-Trasse²
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconBV />
            </IconWrapper>{' '}
            Berliner Verbände Radnetz³
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Netze im Kreis Dahme-Spree</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconKDS />
            </IconWrapper>{' '}
            Konzept LK Dahme-Spree⁴
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconKS />
            </IconWrapper>{' '}
            Radkonzept Schönefeld⁵
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconV />
            </IconWrapper>{' '}
            Varianten Radschnellverb. BER-KW⁶
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconZES />
            </IconWrapper>{' '}
            Konzept ZES⁷
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Quellen und Ziele</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconHeatmap />
            </IconWrapper>{' '}
            Quellen und Ziele (Heatmap)⁸
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendSources>
        Quellen: ¹ SimRa - TU Berlin 2020, ² OSM 2020
      </LegendSources>
    </Legend>
  </>
);

export default MapNetworks;
