import axios from 'axios';

import { clearStorage, getToken } from '../services/local-storage-controller';
import { root as apiUrl } from './config';

axios.defaults.baseURL = apiUrl;

const instance = axios.create({
  baseURL: `${apiUrl}`,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return error.data.message;
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      clearStorage();
    }

    throw new Error(err.response.data.message);
  }
);

export default instance;
