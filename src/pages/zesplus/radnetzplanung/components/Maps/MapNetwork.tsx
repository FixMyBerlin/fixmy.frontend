import React from 'react';
import { Map as ArticleMap } from '~/components2/Article';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
} from '~/components2/Article/Map/MapLegendStyledComponents';
import {
  ZES_ALL_LAYERS,
  ZES_INITAL_CENTER,
  ZES_INITIAL_ZOOM,
  ZES_MAP_STYLE,
  ZES_MAX_BOUNDS,
} from '../../../mapboxOptions.const';
import { IconLegendLine } from './IconLegend';

export const mapCurrentVisLayers = [
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  'landuse_residential-commercial',
  'siedlungszentren-name-only',
  'Netzvorschlaege_buergerInnen',
  'nudafa-ramboll-wunschlininien',
  'strassentyp-wohnstrassenonly',
];

export const MapNetwork = () => {
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
          <LegendHeader>Netzentwurfskarte</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="rgb(16, 94, 249)" width={3} />
              </IconWrapper>
              Wunschlinien
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine
                  strokeDasharray="6 2"
                  color="#dd0303"
                  width={3}
                />
              </IconWrapper>
              Netzentwurf
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="#dd0303" width={1} />
              </IconWrapper>
              Wohnstraßen ohne Oberfläche=schlecht
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="#ffd53d" width={4} />
              </IconWrapper>
              Netzvorschläge Bürger:innen
            </LegendItem>
          </LegendItems>
        </LegendCol>
        {/* <LegendSources>
          Quellen: -
        </LegendSources> */}
      </Legend>
    </>
  );
};
