import ky from 'ky-universal';
import { generatePath } from 'react-router-dom';

import config from '~/config';
import { DistrictConfig } from '~/types';
import logger from '~/utils/logger';

import { SignupData, Counts } from './types';

const API_URL = `/playstreets/:campaign`;

const getApiBase = (district: DistrictConfig) => {
  if (district?.backend == null) {
    return config.apiUrl;
  }

  return (
    import.meta.env.API_URL ||
    district.backend[import.meta.env.BACKEND] ||
    district.backend.production
  );
};

const getData: (arg0: DistrictConfig) => Promise<Counts> = async (district) => {
  const url = `${getApiBase(district)}${generatePath(API_URL, {
    campaign: district.name,
  })}`;
  logger('load signups');
  return ky.get(url).json();
};

const signup: (
  arg0: SignupData,
  arg1: DistrictConfig
) => Promise<Counts> = async (signupData, district) => {
  const url = `${getApiBase(district)}${generatePath(API_URL, {
    campaign: district.name,
  })}`;
  logger('api signup', signupData);
  return ky.put(url, { json: signupData }).json();
};

export default {
  getData,
  signup,
};
