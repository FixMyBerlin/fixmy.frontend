import slugify from 'slugify';

import { Spielstrasse } from './types';

export const getStreetInfo = (streets: Spielstrasse[], slug: string) =>
  streets?.find(
    (street) =>
      slugify(street.street, { lower: true }) === slug &&
      street.status !== 'closed'
  );
