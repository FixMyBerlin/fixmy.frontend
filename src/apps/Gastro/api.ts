import ky from 'ky-universal';
import { generatePath } from 'react-router-dom';

import { GastroSignup, GastroRegistration } from './types';
import logger from '~/utils/logger';
import config from './config';

const URL_GET_SIGNUP = `/gastro/:campaign/:id/:accessKey?`;
const URL_PUT_SIGNUP = `/gastro/:campaign`;
const URL_POST_SIGNUP = `/gastro/:campaign/:id/:accessKey`;
const URL_POST_CERTIFICATE = `/gastro/:campaign/certificate/:id/:accessKey`;

const getApiBase = (district) => {
  if (district?.backend == null) {
    return config.apiUrl;
  }

  return (
    process.env.API_URL ||
    district.backend[process.env.BACKEND] ||
    district.backend.production
  );
};

/**
 * Request previously submitted data
 *
 * @param id of the signup
 * @param accessKey that registrants received via email
 */
const get = async (id: number, accessKey: string, district) => {
  const url = `${getApiBase(district)}${generatePath(URL_GET_SIGNUP, {
    id,
    accessKey,
    campaign: district.name
  })}`;
  logger('api get', url);
  return ky.get(url).json();
};

/**
 * Submit Interessensbekundung
 */
const signup = async (signupData: GastroSignup, district) => {
  const endpoint = `${getApiBase(district)}${generatePath(URL_PUT_SIGNUP, {
    campaign: district.name
  })}`;
  logger('api signup', endpoint);
  return ky.post(endpoint, { json: signupData }).json();
};

/**
 * Submit formaler Antrag
 */
const register = async (signupData: GastroRegistration, district) => {
  const endpoint = `${getApiBase(district)}${generatePath(URL_POST_SIGNUP, {
    id: signupData.id,
    accessKey: signupData.access_key,
    campaign: district.name
  })}`;
  logger('api register', endpoint);
  // return ky.put(endpoint, { json: signupData }).json();
};

/**
 * Upload certificate file for registration
 */
const uploadCertificate = async (
  registrationData: GastroRegistration,
  district
) => {
  const formData = new FormData();
  const fileName = registrationData.certificate.name;
  formData.append('file', registrationData.certificate, fileName);
  const endpoint = `${getApiBase(district)}${generatePath(
    URL_POST_CERTIFICATE,
    {
      id: registrationData.id,
      accessKey: registrationData.access_key,
      campaign: district.name
    }
  )}`;
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
