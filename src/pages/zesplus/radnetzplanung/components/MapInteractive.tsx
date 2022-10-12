import React, { useState } from 'react';
import { FullscreenMap } from '~/components2/Article';
import {
  IconWrapper,
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
} from '../../mapboxOptions.const';
import {
  mapCurrentVisLayers,
  mapFromToVisLayers,
  mapInfrastructureVisLayers,
  mapRoadClassificationVisLayers,
  mapSurfacequalityVisLayers,
} from './Maps';

export const MapInteractive = () => {
  const [activeLegendItems, setActiveLegendItem] = useState([]);
  const [visibleLayers, setVisibleLayers] = useState([]);

  // We always want those…
  const defaultLayer = [
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
  ];

  const toggleLayerAndLegend = (item: string, layerToToggle: string[]) => {
    if (activeLegendItems.includes(item)) {
      // Disable Legend, hide Layers
      setActiveLegendItem((prev) => {
        return prev.filter((i) => i !== item);
      });
      setVisibleLayers((prev) => {
        return [
          ...prev.filter((layer) => !layerToToggle.includes(layer)),
          ...defaultLayer,
        ];
      });
    } else {
      // Activate Legend, show Layers
      setActiveLegendItem((prev) => {
        return [...prev, item];
      });
      setVisibleLayers((prev) => {
        return [...prev, ...layerToToggle, ...defaultLayer];
      });
    }
  };

  return (
    <FullscreenMap
      mapboxStyle={ZES_MAP_STYLE}
      maxBounds={ZES_MAX_BOUNDS}
      center={ZES_INITAL_CENTER}
      zoom={ZES_INITIAL_ZOOM}
      allLayers={ZES_ALL_LAYERS}
      visibleLayers={visibleLayers}
    >
      <LegendCol>
        <LegendHeader>Themenkarten</LegendHeader>
        <LegendItems>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Current', mapCurrentVisLayers);
            }}
          >
            <IconWrapper>
              {activeLegendItems.includes('Current') ? 'an' : 'aus'}
            </IconWrapper>
            Vorhandene Netze und Planungen
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('FromTo', mapFromToVisLayers);
            }}
          >
            <IconWrapper>
              {activeLegendItems.includes('FromTo') ? 'an' : 'aus'}
            </IconWrapper>
            Quellen und Ziele
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend(
                'Infrastructure',
                mapInfrastructureVisLayers
              );
            }}
          >
            <IconWrapper>
              {activeLegendItems.includes('Infrastructure') ? 'an' : 'aus'}
            </IconWrapper>
            Radinfrastruktur
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend(
                'Surfacequality',
                mapSurfacequalityVisLayers
              );
            }}
          >
            <IconWrapper>
              {activeLegendItems.includes('Surfacequality') ? 'an' : 'aus'}
            </IconWrapper>
            Komfort &amp; Qualität
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend(
                'RoadClassification',
                mapRoadClassificationVisLayers
              );
            }}
          >
            <IconWrapper>
              {activeLegendItems.includes('RoadClassification') ? 'an' : 'aus'}
            </IconWrapper>
            Straßentypen
          </LegendItem>
        </LegendItems>
      </LegendCol>
    </FullscreenMap>
  );
};
