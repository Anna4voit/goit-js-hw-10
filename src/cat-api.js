import axios from 'axios';
const api_key =
  'live_LwmXPBazxBTX0QiOVtoBM5AJOQb9av8ZkkOGeUZQeH2aYftFeSaNbUgVyTjlrAir';
axios.defaults.headers.common['x-api-key'] = api_key;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': api_key,
      },
    })
    .then(resp => {
      return resp;
    });
}

const url = 'https://api.thecatapi.com/v1/';

export function fetchCatByBreed(elId) {
  return fetch(`${url}images/search?breed_ids=${elId}`, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

// export function fetchBreeds() {
//   return fetch(`${url}breeds`, {
//     headers: {
//       'x-api-key': api_key,
//     },
//   }).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.status);
//     }
//     return resp.json();
//   });
// }
