import {
  NewsletterRequest,
  NewsletterResponse,
  ProfileRequest,
  ProfileResponse,
  PerspectiveRequest,
  PerspectiveResponse,
  AnswerRequest
} from '../types';
import handleSubmitProfile, { marshallProfile } from './profile';
import handleSubmitPerspective from './perspective';
import handleSubmitAnswer from './answer';
import handleSubmitNewsletter from './newsletter';
import { getEndpointURL } from './utils';

const MOCK_RESPONSES = false;

async function submitAnswer(answerRequest: AnswerRequest): Promise<void> {
  if (MOCK_RESPONSES) {
    console.log('Submitted rating');
  } else {
    return handleSubmitAnswer({
      json: answerRequest,
      sessionID: answerRequest.sessionID,
      sceneID: answerRequest.sceneID
    });
  }
}

async function submitNewsletter(
  newsletterRequest: NewsletterRequest
): Promise<NewsletterResponse> {
  if (MOCK_RESPONSES) {
    return {
      email: 'test-fmc@abgeordnetenwatch.de',
      username: 'test8589340-5@abgeordnetenwatch.de',
      id: 277
    };
  } else {
    return handleSubmitNewsletter({ json: newsletterRequest });
  }
}

async function submitProfile(
  profileRequest: ProfileRequest
): Promise<ProfileResponse> {
  if (MOCK_RESPONSES) {
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
  if (MOCK_RESPONSES) {
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
  submitNewsletter,
  getEndpointURL
};
