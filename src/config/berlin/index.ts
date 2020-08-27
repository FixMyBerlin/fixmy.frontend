import xhain from './xhain';
import tempelberg from './tempelberg';
import { RegionConfig } from '~/types';

const berlinConfig: RegionConfig = {
  siteTitle: 'FixMyBerlin',
  districts: {
    xhain,
    tempelberg
  }
};

export default berlinConfig;
