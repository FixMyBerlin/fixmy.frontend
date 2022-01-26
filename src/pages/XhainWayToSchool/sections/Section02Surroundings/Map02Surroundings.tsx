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

export const Map02Surroundings = () => {
  const allVisibleLayers = [
    'network-schoolways',
    'network-schoolways-labels',
    'speedlimits',
    'streetclass',
    'elementary-schools-HVS',
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
          <LegendHeader>Tempolimits</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>{/* <IconQ1 /> */}</IconWrapper> 30 km/h
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconQ2 /> */}</IconWrapper> 5-20 km/h
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconQ3 /> */}</IconWrapper> mehr als 100
              Schulwege
            </LegendItem>
          </LegendItems>
          <LegendHeader>Schulen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>{/* <IconQ4 /> */}</IconWrapper> Grundschulen
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconPathSR /> */}</IconWrapper> Grundschulen an
              Hauptstraßen
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendCol>
          <LegendHeader>Hauptstraßen nach Klassen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>{/* <IconQ1 /> */}</IconWrapper> Klasse I
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconQ2 /> */}</IconWrapper> Klasse II
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconQ3 /> */}</IconWrapper> Klasse III und IV
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
