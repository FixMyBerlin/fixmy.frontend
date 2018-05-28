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

export default {
  getGeoLocation
};
