import axios from 'axios';

import { getToken } from '../services/local-storage-controller';
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

export const temporaryToken = 'Bearer ' + getToken()

export default instance;
