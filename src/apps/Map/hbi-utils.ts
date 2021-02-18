import { HBI_STOPS } from '~/apps/Map/constants';

export function getHBIbyProps(props: any, sideKey: 'side0' | 'side1'): number {
  const safety = +props[`${sideKey}_safety`];
  const velocity = +props[`${sideKey}_velocity`];

  return safety + velocity;
}

export function getHBIColorByIndex(index: number): string {
  const stop = HBI_STOPS.find((s) => index >= s.min && index <= s.max);
  return stop ? stop.color : '#555';
}

interface OrientationInfo {
  side0: string;
  side1: string;
}

export function getOrientationNames(
  side0: string,
  side1: string
): OrientationInfo {
  const mapping = {
    O: 'Ostseite',
    W: 'Westseite',
    N: 'Nordseite',
    S: 'Südseite',
  };
  return {
    side0: mapping[side0] || '',
    side1: mapping[side1] || '',
  };
}

export default {
  getHBIbyProps,
  getHBIColorByIndex,
  getOrientationNames,
};
