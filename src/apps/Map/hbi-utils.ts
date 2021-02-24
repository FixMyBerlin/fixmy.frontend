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
  getOrientationNames,
};
