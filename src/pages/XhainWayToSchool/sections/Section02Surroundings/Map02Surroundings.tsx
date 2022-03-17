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
import { AnchorLink } from '~/components2/Link';
import IconSchoolPinBlue from '../assets/school-pin-blue.svg';
import IconSchoolPinPink from '../assets/school-pin-pink.svg';
import IconStreetClass from '../assets/street-class.svg';
import {
  ALL_LAYERS,
  BOUNDS,
  CENTER,
  MAP_STYLE,
  ZOOM,
} from '../mapboxOptions.const';
import { IconKmh } from './components/IconKmh';

export const Map02Surroundings = () => {
  return (
    <>
      <Map
        mapboxStyle={MAP_STYLE}
        maxBounds={BOUNDS}
        center={CENTER}
        zoom={ZOOM}
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
          <LegendHeader>Straßenklassen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconStreetClass />
              </IconWrapper>
              Hauptstraßen (Klasse I-IV)
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendSources>
          Quellen:{' '}
          <AnchorLink href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_vms_tempolimits_spatial@senstadt&type=WFS">
            Geoportal Berlin / Tempolimits
          </AnchorLink>
          ,{' '}
          <AnchorLink href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_vms_detailnetz_spatial_gesamt@senstadt&type=WFS">
            Geoportal Berlin / Detailnetz Straßenabschnitte
          </AnchorLink>
        </LegendSources>
      </Legend>
    </>
  );
};
