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

/* eslint-disable import/no-unresolved */
import IconAccidentsHeatap from '../assets/accidents-heatmap.svg?component';
import IconCrosswalk from '../assets/crosswalk.svg?component';
import IconDangerPin from '../assets/danger-pin.svg?component';
import IconSchoolPinBlue from '../assets/school-pin-blue.svg?component';
import IconSchoolPinPink from '../assets/school-pin-pink.svg?component';
import IconTrafficSignal from '../assets/traffic-signal.svg?component';
/* eslint-enable import/no-unresolved */

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
          <LegendHeader>Karten-Elemente</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconTrafficSignal />
              </IconWrapper>
              Lichtsignalanlagen
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconCrosswalk />
              </IconWrapper>
              Fußgängerübergänge
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconDangerPin />
              </IconWrapper>
              Fehlende Querungsmöglichkeiten
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconAccidentsHeatap />
              </IconWrapper>
              Häufungen Unfälle mit Fußgänger*&shy;Innen-Beteiligung
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendSources>
          Quellen:{' '}
          <AnchorLink href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_lsa@senstadt&type=WFS">
            Geoportal Berlin / Lichtsignalanlagen
          </AnchorLink>
          ,{' '}
          <AnchorLink href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_zebra@senstadt&type=WFS">
            Geoportal Berlin / Fußgängerüberwege
          </AnchorLink>
          ,{' '}
          <AnchorLink href="https://unfallatlas.statistikportal.de/">
            Unfallatlas, Statistische Ämter des Bundes und der Länder (2018 bis
            2020)
          </AnchorLink>
        </LegendSources>
      </Legend>
    </>
  );
};
