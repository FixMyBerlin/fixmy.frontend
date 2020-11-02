// A random integer value between -90 and +90 degrees,
// see https://deck.gl/docs/api-reference/layers/arc-layer
type Tilt = number;

// eslint-disable-next-line import/prefer-default-export
export function getRandomTilt(): Tilt {
  return getRandomNumberInRange(-10, 10);
}

function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * max + min);
}
