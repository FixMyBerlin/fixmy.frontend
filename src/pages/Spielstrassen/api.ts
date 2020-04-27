import ky from 'ky-universal';

import { SignupData } from './types';
import config from './config';

const API_URL = `${config.apiUrl}/playstreets/${config.spielstrassen.campaign}`;

const getData = async () => ky.get(API_URL).json();

const signup = async (signupData: SignupData) => {
  return ky.put(API_URL, { json: signupData }).json();
};

export default {
  getData,
  signup
};
