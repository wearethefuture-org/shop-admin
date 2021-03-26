import axios from 'axios';


import {clearStorage, getToken} from '../services/local-storage-controller';
import {root as apiUrl} from './config';


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
        return error;
    }
);

instance.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err.response.status === 404) {
            throw err;
        }
        if (err.response.status === 401) {
            clearStorage();
            window.location.reload();
            throw err;
        }
        throw err;
    }
);

export default instance;
