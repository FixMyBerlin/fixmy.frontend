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

export const mapSurfacequalityVisLayers = [
  'siedlungszentren-name-only',
  'landuse_residential-commercial',
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  'Border-ZES-Betrachtungsraum',
  'surf_mainWay_gehwegRadfFrei',
  'surf_mainWay_gehUndRadwegGemeinsam',
  'surf_mainWay_gehUndRadwegGetrennt',
  'surf_mainWay_radwegBaulichAbgesetzt',
  'surf_mainWay_radwegFreiGefuehrt',
  'surf_mainWay_radwegVerbindungsstueck',
  'surf_mainWay_verkehrsberuhigterBereichMitFahrradFrei',
  'surfacedata_cycleway',
  'surfacedata_sidewalk',
  'surf_fahrbahn-all',
];

export const MapSurfacequality = () => {
  return (
    <>
      <ArticleMap
        mapboxStyle={ZES_MAP_STYLE}
        maxBounds={ZES_MAX_BOUNDS}
        center={ZES_INITAL_CENTER}
        zoom={ZES_INITIAL_ZOOM}
        allLayers={ZES_ALL_LAYERS}
        visibleLayers={mapSurfacequalityVisLayers}
      />
      <Legend>
        <LegendCol>
          <LegendHeader>Ist-Zustand Oberflächen</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(119, 76%, 26%)" width={3} />
              </IconWrapper>
              sehr gut &amp; gut
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(47, 94%, 46%)" width={3} />
              </IconWrapper>
              mittel
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsl(5, 96%, 52%)" width={3} />
              </IconWrapper>
              schlecht &amp; sehr schlecht
            </LegendItem>
          </LegendItems>
        </LegendCol>

        <LegendSources>Quellen: OpenStreetMap</LegendSources>
      </Legend>
    </>
  );
};
