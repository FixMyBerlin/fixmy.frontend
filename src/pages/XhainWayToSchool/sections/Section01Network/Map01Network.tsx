import React, { useState } from 'react';
import { Map } from '~/components2/Article';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '~/pages/ZESPlus-Research/components/BaseLegend';
import {
  ALL_LAYERS,
  BOUNDS,
  CENTER,
  MAP_STYLE,
  ZOOM,
} from '../mapboxOptions.const';
import { LegendItemsNetworkSchoolways } from './LegendItemsNetworkSchoolways';

export const Map01Network = () => {
  const allVisibleLayers = [
    'network-schoolways',
    'network-schoolways-labels',
    'elementary-schools-allblue',
    'schools-einzugsbereich',
  ];
  const [visibleLayers, setVisibleLayers] = useState(allVisibleLayers);

  const handleVisibilityToggle = (layer) => {
    const filteredLayers = allVisibleLayers.filter((l) => l !== layer);

    setVisibleLayers(
      visibleLayers.includes(layer) ? filteredLayers : allVisibleLayers
    );
  };

  return (
    <>
      <Map
        mapboxStyle={MAP_STYLE}
        maxBounds={BOUNDS}
        center={CENTER}
        zoom={ZOOM}
        allLayers={ALL_LAYERS}
        visibleLayers={visibleLayers}
      />
      <Legend>
        <LegendCol>
          <LegendItemsNetworkSchoolways
            onClick={() => handleVisibilityToggle('network-schoolways')}
          />
        </LegendCol>
        <LegendCol>
          <LegendHeader>Karten-Elemente</LegendHeader>
          <LegendItems>
            <LegendItem
              onClick={() =>
                handleVisibilityToggle('elementary-schools-allblue')
              }
              style={{ cursor: 'pointer' }}
            >
              <IconWrapper>{/* <IconQ4 /> */}</IconWrapper> Grundschulen
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconPathSR /> */}</IconWrapper> Spielplätze
            </LegendItem>
            <LegendItem>
              <IconWrapper>{/* <IconPathSR /> */}</IconWrapper> Einzugsbereiche
            </LegendItem>
          </LegendItems>
        </LegendCol>
        <LegendSources>
          Quellen: <span style={{ color: 'red' }}>TODO</span>
        </LegendSources>
      </Legend>
    </>
  );
};
