import ky from 'ky-universal';
import { generatePath } from 'react-router-dom';

import { GastroSignup, GastroRegistration } from './types';
import config from './config';

const URL_GET_SIGNUP = `/gastro/${config.gastro.campaign}/:id/:accessKey`;
const URL_PUT_SIGNUP = `/gastro/${config.gastro.campaign}`;
const URL_POST_SIGNUP = `/gastro/${config.gastro.campaign}/:id/:accessKey`;

/**
 * Request previously submitted data
 *
 * @param id of the signup
 * @param accessKey that registrants received via email
 */
const get = async (id: number, accessKey: string) => {
  const url = `${config.apiUrl}${generatePath(URL_GET_SIGNUP, {
    id,
    accessKey
  })}`;
  return ky.get(url).json();
};

/**
 * Submit Interessensbekundung
 */
const signup = async (signupData: GastroSignup) => {
  return ky
    .post(`${config.apiUrl}${URL_PUT_SIGNUP}`, { json: signupData })
    .json();
};

/**
 * Submit formaler Antrag
 */
const register = async (signupData: GastroRegistration) => {
  if (!signupData.id)
    throw Error('Can not add registration without existing signup id');

  return ky
    .put(
      `${config.apiUrl}${generatePath(URL_POST_SIGNUP, {
        id: signupData.id,
        accessKey: signupData.access_key
      })}`,
      { json: signupData }
    )
    .json();
};

export default {
  get,
  signup,
  register
};
