import axios from 'axios';
import {OpenWeather, GoogleGeo} from './resourceURL';

/*
    ini adalah fungsi untuk menangani request GET API
    ketika request berhasil resolve dijalankan
    ketika request gagal reject dijalankan
*/
const Get = (url, path, token) => {
  // token = token.replace(/ /g,"");
  if (token) {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const promise = new Promise((resolve, reject) => {
      axios
        .get(
          `${
            url === 'weather'
              ? OpenWeather
              : url === 'gmaps-geo'
              ? GoogleGeo
              : null
          }/${path}`,
          config,
        )
        .then(
          result => {
            resolve(result.data);
          },
          err => {
            reject(err);
          },
        );
    });
    return promise;
  } else {
    const promise = new Promise((resolve, reject) => {
      axios
        .get(
          `${
            url === 'weather'
              ? OpenWeather
              : url === 'gmaps-geo'
              ? GoogleGeo
              : null
          }/${path}`,
        )
        .then(
          result => {
            resolve(result.data);
          },
          err => {
            reject(err);
          },
        );
    });
    return promise;
  }
};

export default Get;
