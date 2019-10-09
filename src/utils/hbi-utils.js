// import Store from '~/store';

export function getHBIbyProps(props, sideKey) {
  // const hbiValues = Store.getState().UserState.hbi_values;
  // const rv = (hbiValues[0] - 5) / 10;
  // const rs = (hbiValues[1] - 5) / 10;

  // return ((+props[`${sideKey}_safety`] - rs) * 1.6) + ((+props[`${sideKey}_velocity`] - rv) * 0.5);
  const safety = +props[`${sideKey}_safety`];
  const velocity = +props[`${sideKey}_velocity`];

  return safety + velocity;
}

export function getHBIColorByIndex(index) {
  const stop = config.hbiStops.find((s) => index >= s.min && index <= s.max);
  return stop ? stop.color : '#555';
}

export function translateOrientationName(name) {
  switch (name) {
    case 'O':
      return 'Ostseite';
    case 'W':
      return 'Westseite';
    case 'N':
      return 'Nordseite';
    case 'S':
      return 'Südseite';
    default:
      return '';
  }
}

export function getOrientationNames(side0, side1) {
  return {
    side0: translateOrientationName(side0),
    side1: translateOrientationName(side1)
  };

  // console.log(props);

  // const orientationKey = props.orientation ? 'orientation' : 'side0_orientation';
  // if (!props[orientationKey] || props[orientationKey] === 'O') {
  //   return {
  //     side0: 'Ostseite',
  //     side1: 'Westseite'
  //   };
  // }

  // return {
  //   side0: 'Südseite',
  //   side1: 'Nordseite'
  // };
}

export default {
  getHBIbyProps,
  getHBIColorByIndex,
  getOrientationNames
};
