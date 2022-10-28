import React from 'react';
import { Map as ArticleMap } from '~/components2/Article';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '~/components2/Article/Map/MapLegendStyledComponents';
import {
  ZES_ALL_LAYERS,
  ZES_INITAL_CENTER,
  ZES_INITIAL_ZOOM,
  ZES_MAP_STYLE,
  ZES_MAX_BOUNDS,
} from '../../../mapboxOptions.const';
import { IconLegendLine } from './IconLegend';

/*
[
  "match",
  ["get", "layer"],
  ["osm_routen"],
  "hsl(88, 89%, 36%)",
  [
    "RSV_Y-Trasse",
    "RSV_Teltowkanalroute"
  ],
  "hsl(278, 92%, 47%)",
  [
    "radnetz_zesplus_vers__4",
    "Hauptachsen"
  ],
  "#ffbc0a",
  ["RSV BER-KW varianten"],
  "hsl(307, 89%, 40%)",
  ["radkonzept schoenefeld"],
  "hsl(178, 81%, 48%)",
  ["Radnetz_berlin"],
  "hsla(229, 100%, 38%, 0)",
  ["Vorrangnetz_berlin"],
  "hsl(203, 100%, 38%)",
  ["LDS_zielnetz"],
  "hsl(48, 93%, 53%)",
  "hsl(48, 89%, 36%)"
]
*/

export const mapCurrentVisLayers = [
  'siedlungszentren-name-only',
  'poibarriers_water_aerodrome copy',
  'poibarriers_water_aerodrome',
  'poibarriers_motorway',
  'poibarriers_train',
  'poibarriers_train2',
  'vorhandene-netze-und-planungen',
  'landuse_residential-commercial',
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  // 'Border-ZES-Betrachtungsraum',
];

export const MapCurrent = () => {
  return (
    <>
      <ArticleMap
        mapboxStyle={ZES_MAP_STYLE}
        maxBounds={ZES_MAX_BOUNDS}
        center={ZES_INITAL_CENTER}
        zoom={ZES_INITIAL_ZOOM}
        allLayers={ZES_ALL_LAYERS}
        visibleLayers={mapCurrentVisLayers}
      />
      <Legend>
        <LegendCol>
          <LegendHeader>Vorhandene Netzkonzepte</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(48, 93%, 53%)" width={4} />
              </IconWrapper>
              Konzept LK Dahme-Spree
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(88, 89%, 36%)" width={4} />
              </IconWrapper>
              Touristische Radrouten
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(307, 89%, 40%)" width={4} />
              </IconWrapper>
              RSV BER-KW Varianten
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(278, 92%, 47%)" width={4} />
              </IconWrapper>
              Radschnellverbindung Y-Trasse
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(178, 81%, 48%)" width={4} />
              </IconWrapper>
              Radkonzept Schönefeld
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(203, 100%, 38%)" width={4} />
              </IconWrapper>
              Berliner Radverkehrsnetz Vorrangrouten
            </LegendItem>
          </LegendItems>
        </LegendCol>

        <LegendSources>
          Quellen: OpenStreetMap, Vorhandene Netzkonzepte aus manuellen Importen
        </LegendSources>
      </Legend>
    </>
  );
};
