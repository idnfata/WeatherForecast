import axios from 'axios';
import {OpenWeather} from './resourceURL';

/*
    ini adalah fungsi untuk menangani request POST API
    ketika request berhasil resolve dijalankan
    ketika request gagal reject dijalankan
*/
const Post = (url, path, data, token) => {
  if (token) {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const promise = new Promise((resolve, reject) => {
      axios
        .post(`${url === 'weather' ? OpenWeather : null}/${path}`, data, config)
        .then(
          result => {
            resolve(result);
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
        .post(`${url === 'weather' ? OpenWeather : null}/${path}`, data)
        .then(
          result => {
            resolve(result);
          },
          err => {
            reject(err);
          },
        );
    });

    return promise;
  }
};

export default Post;
