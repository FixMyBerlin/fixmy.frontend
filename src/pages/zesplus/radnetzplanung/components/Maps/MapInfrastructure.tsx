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

export const mapInfrastructureVisLayers = [
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
  'Fuehung mit Fuss',
  'Fuhrung getrennnt',
  'Verkehrsberuhigt',
  'surf_fahrbahn-bad',
];

export const MapInfrastructure = () => {
  return (
    <>
      <ArticleMap
        mapboxStyle={ZES_MAP_STYLE}
        maxBounds={ZES_MAX_BOUNDS}
        center={ZES_INITAL_CENTER}
        zoom={ZES_INITIAL_ZOOM}
        allLayers={ZES_ALL_LAYERS}
        visibleLayers={mapInfrastructureVisLayers}
      />
      <Legend>
        <LegendCol>
          <LegendHeader>Ist-Zustand Radinfrastruktur</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(209, 76%, 38%)" width={3} />
              </IconWrapper>
              Separate Radinfrastruktur
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine
                  color="hsl(209, 76%, 38%)"
                  width={3}
                  strokeDasharray="5 2.5"
                />
              </IconWrapper>
              gemeinsame Führung mit dem Fußverkehr
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine
                  color="hsla(232, 99%, 39%, 0.34)"
                  width={3}
                  strokeDasharray="3 2"
                />
              </IconWrapper>
              verkehrsberuhigte Bereiche
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendCol>
          <LegendHeader>Oberfläche</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine
                  color="hsl(5, 96%, 52%)"
                  width={3}
                  strokeDasharray="2.5 3"
                />
              </IconWrapper>
              Oberfläche schlecht
            </LegendItem>
          </LegendItems>
        </LegendCol>

        <LegendSources>Quellen: OpenStreetMap</LegendSources>
      </Legend>
    </>
  );
};
