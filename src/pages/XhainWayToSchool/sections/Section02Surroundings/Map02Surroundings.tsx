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
} from '~/components2/Article/Map/MapLegendStyledComponents';
import IconSchoolPinBlue from '../assets/school-pin-blue.svg';
import IconSchoolPinPink from '../assets/school-pin-pink.svg';
import {
  ALL_LAYERS,
  BOUNDS,
  CENTER,
  MAP_STYLE,
  ZOOM,
} from '../mapboxOptions.const';
import { IconKmh } from './components/IconKmh';
import { IconStreetClass } from './components/IconStreetClass';

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
              <IconWrapper>
                <IconKmh fill="#56a02c" />
              </IconWrapper>
              30 km/h
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconKmh fill="#2f5922" />
              </IconWrapper>
              5-20 km/h
            </LegendItem>
          </LegendItems>
          <LegendHeader>Schulen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconSchoolPinBlue />
              </IconWrapper>
              Grundschulen
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconSchoolPinPink />
              </IconWrapper>
              Grundschulen an Hauptstraßen
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendCol>
          <LegendHeader>Hauptstraßen nach Klassen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconStreetClass fill="#e2961d" />
              </IconWrapper>
              Klasse I
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconStreetClass fill="#ebc55c" />
              </IconWrapper>
              Klasse II
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconStreetClass fill="#f3eca5" />
              </IconWrapper>
              Klasse III und IV
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
