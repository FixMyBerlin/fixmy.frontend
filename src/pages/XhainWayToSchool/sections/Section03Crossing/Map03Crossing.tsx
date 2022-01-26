import React from 'react';
import { Map } from '~/components2/Article';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '~/pages/ZESPlus-Research/components/BaseLegend';
import {
  ALL_LAYERS,
  BOUNDS,
  CENTER,
  MAP_STYLE,
  ZOOM,
} from '../mapboxOptions.const';
import { LegendItemsNetworkSchoolways } from '../Section01Network/LegendItemsNetworkSchoolways';

export const Map03Crossing = () => {
  const allVisibleLayers = [
    'network-schoolways',
    'network-schoolways-labels',
    'accidents-fuss',
    'elementary-schools-HVS',
    'knotenpunkte-withnocrossing',
    'traffic-light-system-xhain',
    'crosswalk-xhain',
  ];

  return (
    <>
      <Map
        mapboxStyle={MAP_STYLE}
        maxBounds={BOUNDS}
        center={CENTER}
        zoom={ZOOM}
        allLayers={ALL_LAYERS}
        visibleLayers={allVisibleLayers}
      />
      <Legend>
        <LegendCol>
          <LegendItemsNetworkSchoolways />
          <LegendHeader>Schulen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>{/* <IconQ4 /> */}</IconWrapper> Grundschulen
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendCol>
          <LegendHeader>Karten-Elemente</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>{/* <IconQ1 /> */}</IconWrapper> Lichtanlagen,
              <br />
              Fußgängerübergänge
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconQ2 /> */}</IconWrapper> Fehlende
              <br />
              Querungsmöglichkeiten
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconQ3 /> */}</IconWrapper> Häufungen Unfälle
              <br />
              mit Fußgängerbeteiligung
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendSources>
          Quellen: <span style={{ color: 'red' }}>TODO</span>
        </LegendSources>
      </Legend>
    </>
  );
};
