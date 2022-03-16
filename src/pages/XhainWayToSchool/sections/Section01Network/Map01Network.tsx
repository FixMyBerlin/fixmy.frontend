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
import IconPlayground from '../assets/playground.svg';
import IconSchoolAreas from '../assets/school-areas.svg';
import IconSchoolPinBlue from '../assets/school-pin-blue.svg';
import { BOUNDS, CENTER, MAP_STYLE, ZOOM } from '../mapboxOptions.const';
import { LegendItemsNetworkSchoolways } from './LegendItemsNetworkSchoolways';

export const Map01Network = () => {
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
          <LegendItemsNetworkSchoolways />
        </LegendCol>
        <LegendCol>
          <LegendHeader>Karten-Elemente</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconSchoolPinBlue />
              </IconWrapper>
              Grundschulen
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconPlayground />
              </IconWrapper>
              Spielplätze
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconSchoolAreas />
              </IconWrapper>
              Einzugsbereiche
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendSources>
          Quellen:{' '}
          <AnchorLink href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_spielplatzbestand@senstadt&type=WFS">
            Geoportal Berlin / Grünanlagenbestand Berlin (einschl. der
            öffentlichen Spielplätze) - Spielplätze
          </AnchorLink>
          ,{' '}
          <AnchorLink href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_schulen_ezb@senstadt&type=WFS">
            Geoportal Berlin / Schulen - Einschulbereiche
          </AnchorLink>
          ,{' '}
          <AnchorLink href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_schulen@senstadt&type=WFS">
            Geoportal Berlin / Schulen
          </AnchorLink>
        </LegendSources>
      </Legend>
    </>
  );
};
