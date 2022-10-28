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
import IconHeatmap from './icons/poi-heatmap.svg';

/*
[
  "case",
  [
    "match",
    [
      "get",
      "FMC:Category:HighwayTypeData:typWohnstrasse"
    ],
    ["true"],
    true,
    false
  ],
  "hsl(163, 56%, 51%)",
  [
    "match",
    [
      "get",
      "FMC:Category:HighwayTypeData:typHauptUndSammelstrasse"
    ],
    ["true"],
    true,
    false
  ],
  "hsl(50, 90%, 47%)",
  [
    "match",
    [
      "get",
      "FMC:Category:HighwayTypeData:typFreiGefuehrt"
    ],
    ["true"],
    true,
    false
  ],
  "hsla(313, 18%, 69%, 0.37)",
  [
    "match",
    [
      "get",
      "FMC:Category:HighwayTypeData:typAusserorts"
    ],
    ["true"],
    true,
    false
  ],
  "hsl(18, 97%, 47%)",
  [
    "==",
    [
      "get",
      "FMC:Category:HighwayTypeData:typAusserorts"
    ],
    ""
  ],
  "hsla(97, 56%, 51%, 0)",
  "hsla(97, 56%, 51%, 0)"
]
 */

export const mapRoadClassificationVisLayers = [
  'siedlungszentren-name-only',
  'poibarriers_water_aerodrome copy',
  'poibarriers_water_aerodrome',
  'poibarriers_motorway',
  'poibarriers_train',
  'poibarriers_train2',
  'landuse_residential-commercial',
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  'Border-ZES-Betrachtungsraum',
  'strassentyp',
];

export const MapRoadClassification = () => {
  return (
    <>
      <ArticleMap
        mapboxStyle={ZES_MAP_STYLE}
        maxBounds={ZES_MAX_BOUNDS}
        center={ZES_INITAL_CENTER}
        zoom={ZES_INITIAL_ZOOM}
        allLayers={ZES_ALL_LAYERS}
        visibleLayers={mapRoadClassificationVisLayers}
      />
      <Legend>
        <LegendCol>
          <LegendHeader>Straßentypen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(163, 56%, 51%)" width={3} />
              </IconWrapper>
              Wohnstraße
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(50, 90%, 47%)" width={3} />
              </IconWrapper>
              Haupt und Sammelstraßen innerorts
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(18, 97%, 47%)" width={3} />
              </IconWrapper>
              Hauptstraßen Außerorts
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsla(313, 18%, 69%, 0.37)" width={3} />
              </IconWrapper>
              Frei geführt
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendCol>
          <LegendHeader>Ziel-Orte</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconHeatmap />
              </IconWrapper>
              Wichtige Ziel-Orte
            </LegendItem>
          </LegendItems>
        </LegendCol>

        <LegendSources>Quellen: OpenStreetMap</LegendSources>
      </Legend>
    </>
  );
};
