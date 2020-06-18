import ky from 'ky-universal';
import { generatePath } from 'react-router-dom';

import { GastroSignup, GastroRegistration } from './types';
import store from '~/store';
import logger from '~/utils/logger';
import config from './config';

const URL_GET_SIGNUP = `/gastro/${config.gastro.campaign}/:id/:accessKey?`;
const URL_PUT_SIGNUP = `/gastro/${config.gastro.campaign}`;
const URL_POST_SIGNUP = `/gastro/${config.gastro.campaign}/:id/:accessKey`;
const URL_POST_CERTIFICATE = `/gastro/${config.gastro.campaign}/certificate/:id/:accessKey`;

const getApiBase = () => {
  const state = store.getState();
  const districtBackends = state.AppState.district?.backend;
  if (districtBackends == null) {
    return config.apiUrl;
  }
  return districtBackends[process.env.backend] || districtBackends.production;
};

/**
 * Request previously submitted data
 *
 * @param id of the signup
 * @param accessKey that registrants received via email
 */
const get = async (id: number, accessKey: string) => {
  const url = `${getApiBase()}${generatePath(URL_GET_SIGNUP, {
    id,
    accessKey
  })}`;
  logger('api get', url);
  return ky.get(url).json();
};

/**
 * Submit Interessensbekundung
 */
const signup = async (signupData: GastroSignup) => {
  const endpoint = `${getApiBase()}${URL_PUT_SIGNUP}`;
  logger('api signup', endpoint);
  return ky.post(endpoint, { json: signupData }).json();
};

/**
 * Submit formaler Antrag
 */
const register = async (signupData: GastroRegistration) => {
  const endpoint = `${getApiBase()}${generatePath(URL_POST_SIGNUP, {
    id: signupData.id,
    accessKey: signupData.access_key
  })}`;
  logger('api register', endpoint);
  return ky.put(endpoint, { json: signupData }).json();
};

/**
 * Upload certificate file for registration
 */
const uploadCertificate = async (registrationData: GastroRegistration) => {
  const formData = new FormData();
  const fileName = registrationData.certificate.name;
  formData.append('file', registrationData.certificate, fileName);
  const endpoint = `${getApiBase()}${generatePath(URL_POST_CERTIFICATE, {
    id: registrationData.id,
    accessKey: registrationData.access_key
  })}`;
  logger('api uploadCertificate', endpoint);
  return ky
    .post(endpoint, {
      body: formData,
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`
      },
      timeout: 60000
    })
    .json();
};

export default {
  get,
  signup,
  register,
  uploadCertificate
};
