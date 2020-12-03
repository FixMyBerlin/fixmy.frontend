import React, { useState } from 'react';
import LegendExpanded from './LegendExpanded';
import LegendCollapsed from './LegendCollapsed';

const MapLegend = () => {
  const [isExpanded, setExpanded] = useState(false);

  return isExpanded ? (
    <LegendExpanded onToggle={() => setExpanded(false)} />
  ) : (
    <LegendCollapsed onToggle={() => setExpanded(true)} />
  );
};

export default MapLegend;
