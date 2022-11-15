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
} from '../../../mapboxOptions.const';
import {
  mapCurrentVisLayers,
  mapFromToVisLayers,
  mapInfrastructureVisLayers,
  mapRoadClassificationVisLayers,
  mapSurfacequalityVisLayers,
} from '../Maps';
import ActiveIcon from './icons/eye-icon.svg';
import DisabledIcon from './icons/eye-slash-icon.svg';

export const MapInteractive = () => {
  // We always want those…
  const defaultLayer = [
    'siedlungszentren-name-only',
    'dimmlayer-ZES-Betrachtungsraum',
    'dimmlayer-ZESplus',
    'Border-ZES-Betrachtungsraum',
  ];

  const [activeLegendItems, setActiveLegendItem] = useState([]);
  const [visibleLayers, setVisibleLayers] = useState(defaultLayer);

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

  const activeInactiveIcon = (checkFor) => {
    return activeLegendItems.includes(checkFor) ? (
      <ActiveIcon style={{ color: 'green' }} />
    ) : (
      <DisabledIcon />
    );
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
              toggleLayerAndLegend('FromTo', mapFromToVisLayers);
            }}
          >
            <IconWrapper>{activeInactiveIcon('FromTo')}</IconWrapper>
            Quellen und Ziele
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Current', mapCurrentVisLayers);
            }}
          >
            <IconWrapper>{activeInactiveIcon('Current')}</IconWrapper>
            Vorhandene Netze und Planungen
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend(
                'Infrastructure',
                mapInfrastructureVisLayers
              );
            }}
          >
            <IconWrapper>{activeInactiveIcon('Infrastructure')}</IconWrapper>
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
            <IconWrapper>{activeInactiveIcon('Surfacequality')}</IconWrapper>
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
              {activeInactiveIcon('RoadClassification')}
            </IconWrapper>
            Straßentypen
          </LegendItem>
        </LegendItems>
      </LegendCol>
    </FullscreenMap>
  );
};
