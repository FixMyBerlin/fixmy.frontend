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
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend(
                'Infrastructure',
                mapInfrastructureVisLayers
              );
            }}
          >
            <IconWrapper>{activeInactiveIcon('Infrastructure')}</IconWrapper>
            Radinfrastruktur & Oberfläche schlecht
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
              toggleLayerAndLegend('Current1', [
                'Vorhandene-netze_uebergeordnet',
              ]);
            }}
          >
            <IconWrapper>{activeInactiveIcon('Current1')}</IconWrapper>
            Vorhandene Netze (Übergeordnet)
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Current2', [
                'Netzvorschlaege_buergerInnen',
              ]);
            }}
          >
            <IconWrapper>{activeInactiveIcon('Current2')}</IconWrapper>
            Netzvorschläge Bürger:innen
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Netzentwurf', [
                'nudafa-ramboll-netzentwurf',
              ]);
            }}
          >
            <IconWrapper>{activeInactiveIcon('Netzentwurf')}</IconWrapper>
            Netzentwurf
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('HighwayResidential', [
                'strassentyp-wohnstrassenonly',
                'surf_fahrbahn-bad',
              ]);
            }}
          >
            <IconWrapper>
              {activeInactiveIcon('HighwayResidential')}
            </IconWrapper>
            Fahrradgeeignete Nebenstraßen
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Wunschlininien', [
                'nudafa-ramboll-wunschlininien',
              ]);
            }}
          >
            <IconWrapper>{activeInactiveIcon('Wunschlininien')}</IconWrapper>
            Wunschlininien
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Zwangspunkte', [
                'nudafa-ramboll-zwangspunkte',
                'nudafa-ramboll-zielpunkte',
              ]);
            }}
          >
            <IconWrapper>{activeInactiveIcon('Zwangspunkte')}</IconWrapper>
            Ziel und Zwangspunkte
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Buildings', ['buildings-black']);
            }}
          >
            <IconWrapper>{activeInactiveIcon('Buildings')}</IconWrapper>
            Gebäude
          </LegendItem>
          <LegendItem
            onClick={() => {
              toggleLayerAndLegend('Schulwegsicherheit', [
                'poiEducation-schoolsafety',
                'unfaelle-210727',
                'schulwege-real-761p90',
                'unsichererstellen-8n5geh',
              ]);
            }}
          >
            <IconWrapper>
              {activeInactiveIcon('Schulwegsicherheit')}
            </IconWrapper>
            Schulwegsicherheit
          </LegendItem>
        </LegendItems>
      </LegendCol>
    </FullscreenMap>
  );
};
