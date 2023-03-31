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
import { IconLegendArea, IconLegendCircle } from './IconLegend';
import { LegendItemPoiShop } from './LegendItems';
import IconTrain from './icons/train.svg';
import IconLine from './icons/line.svg';
import IconAirport from './icons/airport.svg';
import SbahnIcon from './icons/s-bahn.svg';

export const mapFromToVisLayers = [
  'siedlungszentren-center',
  'siedlungszentren-name',
  'poibarriers_water_aerodrome',
  'poibarriers_motorway',
  'poibarriers_train',
  'poibarriers_train2',
  'landuse_residential-commercial',
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  'Border-ZES-Betrachtungsraum',
  'poiShopCategory',
  'poiShopping-heatmap',
  'poiEducation',
  'poiEducation-label',
  'publicTransport',
];

export const MapFromTo = () => {
  return (
    <>
      <ArticleMap
        mapboxStyle={ZES_MAP_STYLE}
        maxBounds={ZES_MAX_BOUNDS}
        center={ZES_INITAL_CENTER}
        zoom={ZES_INITIAL_ZOOM}
        allLayers={ZES_ALL_LAYERS}
        visibleLayers={mapFromToVisLayers}
      />
      <Legend>
        <LegendCol>
          <LegendHeader>Hindernisse und natürliche Barrieren</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconTrain />
              </IconWrapper>
              Eisenbahnstrecken
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLine />
              </IconWrapper>
              Autobahnen
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconAirport />
              </IconWrapper>
              Gewässer, Flughafen
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendCol>
          <LegendHeader>Quell-Orte</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper
                style={{
                  backgroundColor: 'white',
                  border: '1px solid rgb(94, 94, 94)',
                }}
              >
                <IconLegendArea
                  color="hsla(17, 93%, 81%, 20%)"
                  borderColor="transparent"
                  borderWidth={0}
                />
              </IconWrapper>
              Wohngebiete
            </LegendItem>
            <LegendItem>
              <IconWrapper
                style={{
                  backgroundColor: 'white',
                  border: '1px solid rgb(94, 94, 94)',
                }}
              >
                <IconLegendArea
                  color="hsla(215, 87%, 78%, 20%)"
                  borderColor="transparent"
                  borderWidth={0}
                />
              </IconWrapper>
              Andere bebaute Gebiete
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendCircle
                  color="rgba(33, 134, 196, 40%)"
                  borderColor="rgb(26, 104, 153)"
                  borderWidth={2}
                />
              </IconWrapper>
              Siedlungszentren mit Einwohnerzahlen
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendCol>
          <LegendHeader>Zielorte</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendCircle
                  color="hsl(209, 76%, 38%)"
                  borderColor="white"
                  borderWidth={0.5}
                  size={5}
                />
              </IconWrapper>
              Schulen
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <SbahnIcon />
              </IconWrapper>
              S-Bahnhöfe
            </LegendItem>
            <LegendItemPoiShop />
          </LegendItems>
        </LegendCol>

        <LegendSources>
          Quellen: OpenStreetMap, Vorhandene Netzkonzepte aus manuellen Importen
        </LegendSources>
      </Legend>
    </>
  );
};
