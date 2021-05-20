import { LEFT_SIDE, RIGHT_SIDE } from './constants';

interface OrientationInfo {
  [RIGHT_SIDE]: string;
  [LEFT_SIDE]: string;
}

export function getOrientationNames(
  orientationRight: string,
  orientationLeft: string
): OrientationInfo {
  const mapping = {
    O: 'Ostseite',
    W: 'Westseite',
    N: 'Nordseite',
    S: 'Südseite',
  };
  return {
    [RIGHT_SIDE]: mapping[orientationRight] || '',
    [LEFT_SIDE]: mapping[orientationLeft] || '',
  };
}

export default {
  getOrientationNames,
};
