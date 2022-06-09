import React from 'react';

/* eslint-disable import/no-unresolved */
import PinIntersection from './images/pin-intersection.svg?component';
import PinSection from './images/pin-section.svg?component';
/* eslint-enable import/no-unresolved */

const SectionPin = ({ isRoad }: { isRoad: boolean }) =>
  isRoad === false ? <PinIntersection /> : <PinSection />;

export default SectionPin;
