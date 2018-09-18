import ky from 'ky';

export async function likeDetail(apiUrl, token) {
  let response = {};

  const headers = { Authorization: `JWT ${token}` };

  try {
    response = await ky.post(`${apiUrl}/likes`, { headers }).json();
  } catch (e) {
    const error = await e.response.json();
    response.error = error;
  }

  return response;
}

export async function getLikes(apiUrl, token) {
  let response = {};

  const headers = { Authorization: `JWT ${token}` };

  try {
    response = await ky.get(`${apiUrl}/likes`, { headers }).json();
  } catch (e) {
    const error = await e.response.json();
    response.error = error;
  }

  return response;
}

export default {
  likeDetail
};
