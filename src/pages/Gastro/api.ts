import ky from 'ky-universal';
import { generatePath } from 'react-router-dom';

import { GastroSignup } from './types';
import config from './config';

const URL_PUT_SIGNUP = `${config.apiUrl}/gastro/${config.gastro.campaign}`;
const URL_GET_SIGNUP = `/gastro/${config.gastro.campaign}/:id/:accessKey`;

const get = async (id: number, accessKey: string) => {
  const url = `${config.apiUrl}${generatePath(URL_GET_SIGNUP, {
    id,
    accessKey
  })}`;
  return ky.get(url).json();
};

const signup = async (signupData: GastroSignup) => {
  return ky.put(URL_PUT_SIGNUP, { json: signupData }).json();
};

export default {
  get,
  signup
};
