import React from 'react';
import { Map } from '~/components2/Article';
import { BOUNDS_ZES, ZES_CENTER, ZES_ZOOM } from '../../mapboxOptions.const';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '~/components2/Article/Map/MapLegendStyledComponents';

/* eslint-disable import/no-unresolved */
import IconBV from './icons/berliner-verbaende.svg?component';
import IconHeatmap from './icons/heatmap.svg?component';
import IconKDS from './icons/konzept-dahme-spree.svg?component';
import IconKS from './icons/konzept-schoenefeld.svg?component';
import IconRSV from './icons/radschnellverbindungen.svg?component';
import IconT from './icons/touristische.svg?component';
import IconV from './icons/varianten-rsv.svg?component';
import IconZES from './icons/zes.svg?component';
/* eslint-enable import/no-unresolved */

const MAP_STYLE_QUALITY: mapboxgl.MapboxOptions['style'] =
  'mapbox://styles/hejco/ckhufbloj0gmz19pk0m6bd4d2';

const MapNetworks = () => (
  <>
    <Map
      mapboxStyle={MAP_STYLE_QUALITY}
      maxBounds={BOUNDS_ZES}
      center={ZES_CENTER}
      zoom={ZES_ZOOM}
    />
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
        Quellen: ¹ OSM 2020, ² InfraVelo GmbH 2019, ³ ADFC 2019, ⁴IGS 2020, ⁵ ⁶
        ⁷ Radgruppe ZES+ 2020, ⁸ OSM und Radgruppe ZES+ 2020
      </LegendSources>
    </Legend>
  </>
);

export default MapNetworks;
