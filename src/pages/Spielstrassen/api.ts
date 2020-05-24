import ky from 'ky-universal';

import { SignupData, Counts } from './types';
import config from './config';

const API_URL = `${config.apiUrl}/playstreets/${config.spielstrassen.campaign}`;

const getData: () => Promise<Counts> = async () => ky.get(API_URL).json();

const signup: (arg0: SignupData) => Promise<Counts> = async (
  signupData: SignupData
) => {
  return ky.put(API_URL, { json: signupData }).json();
};

export default {
  getData,
  signup
};
