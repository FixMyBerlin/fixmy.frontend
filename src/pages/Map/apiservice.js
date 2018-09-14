import ky from 'ky';

export async function likeDetail(id, token, model = 'plannings') {
  let response = {};

  const headers = { Authorization: `JWT ${token}` };

  try {
    response = await ky.post(`${config.apiUrl}/${model}/${id}/likes/`, { headers }).json();
  } catch (e) {
    const error = await e.response.json();
    response.error = error;
  }
  return response;
}

export default {
  likeDetail
};
