import axios from 'axios';

import { clearStorage, getToken } from '../services/local-storage-controller';
import { root as apiUrl } from './config';
import { History } from 'history';

const AxiosInitiation = (history: History) => {
  axios.defaults.baseURL = apiUrl;
  const token = getToken();
  if (token) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + token;
  }
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return error;
    }
  );
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 404) {
        throw err;
      }
      if (err.response.status === 401) {
        clearStorage();
        history.push('/home');
        throw err;
      }
      throw err;
    }
  );
};

export default AxiosInitiation;
