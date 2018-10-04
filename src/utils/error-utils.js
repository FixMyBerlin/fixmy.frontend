import { errorLabels } from '~/labels';

export function translateError(errorMsg) {
  return errorLabels[errorMsg] || errorMsg;
}

export default {
  translateError
};
