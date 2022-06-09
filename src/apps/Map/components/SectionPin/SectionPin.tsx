import React from 'react';

import PinIntersection from './images/pin-intersection.svg?component';
import PinSection from './images/pin-section.svg?component';

const SectionPin = ({ isRoad }: { isRoad: boolean }) =>
  isRoad === false ? <PinIntersection /> : <PinSection />;

export default SectionPin;
