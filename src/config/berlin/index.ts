import { RegionConfig } from '~/types';

import xhain from './xhain';

const berlinConfig: RegionConfig = {
  siteTitle: 'FixMyBerlin',
  districts: {
    xhain,
  },
  sentryDsn:
    'https://b02fc2d532694a8c956365811b70b13a@o1174824.ingest.sentry.io/6294496',
};

export default berlinConfig;
