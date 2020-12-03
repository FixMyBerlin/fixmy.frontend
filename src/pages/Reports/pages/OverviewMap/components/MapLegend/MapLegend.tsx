import React, { useState } from 'react';
import LegendLarge from './LegendLarge';
import LegendSmall from './LegendSmall';

const MapLegend = () => {
  const [isExtended, setExtended] = useState(false);

  return isExtended ? (
    <LegendLarge onToggle={() => setExtended(false)} />
  ) : (
    <LegendSmall onToggle={() => setExtended(true)} />
  );
};

export default MapLegend;
