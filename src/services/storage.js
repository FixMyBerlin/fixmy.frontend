import store from 'store/dist/store.modern';

const PREFIX = 'fixmy:';

export function set(key, data) {
  store.set(`${PREFIX}${key}`, data);
}

export function get(key) {
  return store.get(`${PREFIX}${key}`);
}

export function remove(key) {
  store.remove(`${PREFIX}${key}`);
}

export default {
  set,
  get,
  remove
};
