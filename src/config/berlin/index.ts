import { RegionConfig } from '~/types';

import tempelberg from './tempelberg';
import xhain from './xhain';

const berlinConfig: RegionConfig = {
  siteTitle: 'FixMyBerlin',
  districts: {
    xhain,
    tempelberg,
  },
};

export default berlinConfig;
