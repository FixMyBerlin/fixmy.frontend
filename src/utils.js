export async function getGeoLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, reject);
    } else {
      reject();
    }
  });
}

export function numberFormat(num) {
  return parseFloat(num).toFixed(1).toString().replace('.', ',');
}

export default {
  getGeoLocation,
  numberFormat
};
