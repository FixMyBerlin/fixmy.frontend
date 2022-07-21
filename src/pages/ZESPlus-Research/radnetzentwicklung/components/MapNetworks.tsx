import React, { useState } from 'react';
import { FullscreenMap } from '~/components2/Article';
import {
  IconWrapper,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '~/components2/Article/Map/MapLegendStyledComponents';
import { BOUNDS_ZES, ZES_CENTER, ZES_ZOOM } from '../../mapboxOptions.const';
import IconBV from './icons/berliner-verbaende.svg';
import IconHeatmap from './icons/heatmap.svg';
import IconKDS from './icons/konzept-dahme-spree.svg';
import IconKS from './icons/konzept-schoenefeld.svg';
import IconRSV from './icons/radschnellverbindungen.svg';
import IconT from './icons/touristische.svg';

const MAP_STYLE: mapboxgl.MapboxOptions['style'] =
  'mapbox://styles/hejco/cl0rzb1ff000615rz609xmppp';

export const MapNetworks = () => {
  const [toggleLayers, setToggleLayers] = useState([]);

  return (
    <FullscreenMap
      mapboxStyle={MAP_STYLE}
      maxBounds={BOUNDS_ZES}
      center={ZES_CENTER}
      zoom={ZES_ZOOM}
      toggleLayers={toggleLayers}
      setToggleLayers={setToggleLayers}
    >
      <LegendCol>
        <LegendHeader>TEST MAP</LegendHeader>
        <LegendItems>
          <LegendItem
            onClick={() =>
              setToggleLayers(['settlement-major-label', 'stations'])
            }
          >
            <IconWrapper>
              <IconT />
            </IconWrapper>
            CLICK
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconRSV />
            </IconWrapper>
            Radschnellverbindung Berlin Y-Trasse²
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconBV />
            </IconWrapper>
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
            </IconWrapper>
            Konzept LK Dahme-Spree⁴
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconKS />
            </IconWrapper>
            Radkonzept Schönefeld⁵
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Quellen und Ziele</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconHeatmap />
            </IconWrapper>
            Quellen und Ziele (Heatmap)⁸
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendSources>
        Quellen: ¹ OSM 2020, ² InfraVelo GmbH 2019, ³ ADFC 2019, ⁴IGS 2020, ⁵ ⁶
        ⁷ Radgruppe ZES+ 2020, ⁸ OSM und Radgruppe ZES+ 2020
      </LegendSources>
    </FullscreenMap>
  );
};
