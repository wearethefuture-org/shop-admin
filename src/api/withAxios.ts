import { FC } from 'react';
import instance from './axios-interceptors';
import { clearStorage } from '../services/local-storage-controller';
import { signOutUser } from '../store/actions/user.action';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface WithAxiosProps {
  children: any;
}

const WithAxios: FC<WithAxiosProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  instance.interceptors.response.use(
    (res) => {
    return res;
    },
    (err) => {
      if (err.response && err.response.data) {

        if(err.response.status === 401) {
         history.push('/login');
          dispatch(signOutUser());
          clearStorage();
    }
        return Promise.reject(err.response.data);
    }
    return Promise.reject(err);
    }
  );

  return children;
};

export default WithAxios;
