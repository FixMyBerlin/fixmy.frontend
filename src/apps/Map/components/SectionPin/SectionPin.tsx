import React from 'react';

import PinIntersection from './images/pin-intersection.svg';
import PinSection from './images/pin-section.svg';

const SectionPin = ({ isRoad }: { isRoad: boolean }) =>
  isRoad === false ? <PinIntersection /> : <PinSection />;

export default SectionPin;
