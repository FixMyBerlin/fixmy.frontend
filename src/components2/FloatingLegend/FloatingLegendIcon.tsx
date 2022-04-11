import React from 'react';
import { StyledMapButton } from '../MapsControls';
import MapLegendIcon from './assets/map-legend-icon.svg';

type Props = {
  showLegend: boolean;
  setShowLegend: (showLegend: boolean) => void;
};

export const FloatingLegendIcon: React.FC<Props> = ({
  showLegend,
  setShowLegend,
}) => {
  return (
    <StyledMapButton
      as={MapLegendIcon}
      $active={showLegend}
      onClick={() => setShowLegend(!showLegend)}
    />
  );
};
