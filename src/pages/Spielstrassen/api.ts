import ky from 'ky-universal';

import SignupData from './types';
import config from './config';

const API_URL = `${config.apiUrl}/spielstrassen/${config.spielstrassen.campaign}`;

const getData = async () => ky.get(API_URL).json();

const signup = async (signupData: SignupData) => {
  return ky.post(API_URL, { json: signupData }).json();
};

export default {
  getData,
  signup
};
