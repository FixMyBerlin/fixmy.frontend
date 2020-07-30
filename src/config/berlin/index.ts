import xhain from './xhain';
import tempelberg from './tempelberg';
import { RegionConfig } from '~/types';

const berlinConfig: RegionConfig = {
  siteTitle: 'FixMyBerlin',
  apps: {
    map: {},
    hbi: {}
  },
  districts: {
    xhain,
    tempelberg
  }
};

export default berlinConfig;
