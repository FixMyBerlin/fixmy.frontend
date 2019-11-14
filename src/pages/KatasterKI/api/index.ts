import {
  ProfileRequest,
  ProfileResponse,
  PerspectiveRequest,
  PerspectiveResponse,
  AnswerRequest
} from '../types';
import handleSubmitProfile, { marshallProfile } from './profile';
import handleSubmitPerspective from './perspective';
import handleSubmitAnswer from './answer';
import { getEndpointURL } from './utils';

async function submitAnswer(answerRequest: AnswerRequest): Promise<void> {
  if (process.env.NODE_ENV === 'testing') {
    console.log('Submitted rating');
  } else {
    return handleSubmitAnswer({
      json: answerRequest,
      sessionID: answerRequest.sessionID,
      sceneID: answerRequest.sceneID
    });
  }
}

async function submitProfile(
  profileRequest: ProfileRequest
): Promise<ProfileResponse> {
  if (process.env.NODE_ENV === 'testing') {
    return {
      ratings_total: 54,
      scenes: ['01_MS_C_139', '01_MS_C_27']
    };
  } else {
    return handleSubmitProfile({
      json: profileRequest,
      sessionID: profileRequest.sessionID
    });
  }
}

async function submitPerspective(
  perspectiveRequest: PerspectiveRequest
): Promise<PerspectiveResponse> {
  if (process.env.NODE_ENV === 'testing') {
    return {
      ratings_total: 115,
      scenes: ['01_MS_C_73']
    };
  } else {
    return handleSubmitPerspective({
      json: perspectiveRequest,
      sessionID: perspectiveRequest.sessionID
    });
  }
}

export default {
  submitAnswer,
  submitProfile,
  marshallProfile,
  submitPerspective,
  getEndpointURL
};
