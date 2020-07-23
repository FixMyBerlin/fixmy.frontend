import slugify from 'slugify';

import { Spielstrasse } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getStreetInfo = (streets: Spielstrasse[], slug: string) =>
  streets?.find(
    (street) =>
      slugify(street.street, { lower: true }) === slug &&
      street.status !== 'closed'
  );
