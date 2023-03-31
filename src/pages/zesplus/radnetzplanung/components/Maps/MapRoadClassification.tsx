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
import { LegendItemPoiShop } from './LegendItems';

export const mapRoadClassificationVisLayers = [
  'siedlungszentren-name-only',
  'poibarriers_water_aerodrome',
  'poibarriers_motorway',
  'poibarriers_train',
  'poibarriers_train2',
  'landuse_residential-commercial',
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  'Border-ZES-Betrachtungsraum',
  'strassentyp',
  'publicTransport',
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
              Sammelstraßen
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(18, 97%, 47%)" width={3} />
              </IconWrapper>
              Hauptstraßen
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
          <LegendHeader>Zielorte</LegendHeader>
          <LegendItems>
            <LegendItemPoiShop />
          </LegendItems>
        </LegendCol>

        <LegendSources>Quellen: OpenStreetMap</LegendSources>
      </Legend>
    </>
  );
};
