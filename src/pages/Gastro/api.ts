import ky from 'ky-universal';

import { GastroSignup } from './types';
import config from './config';

const API_URL = `${config.apiUrl}/gastro/${config.gastro.campaign}`;

const signup = async (signupData: GastroSignup) => {
  return ky.put(API_URL, { json: signupData }).json();
};

export default {
  signup
};
