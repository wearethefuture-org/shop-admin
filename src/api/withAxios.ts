import { FC } from 'react';
import instance from './axios-interceptors';
import { clearStorage } from '../services/local-storage-controller';
import { signOutUser } from '../store/actions/user.action';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

interface WithAxiosProps {
  children: any;
}

const WithAxios: FC<WithAxiosProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      switch (err.response.status) {
        case 401: {
          dispatch(signOutUser());
          clearStorage();
          throw new Error(err.response.data.message);
        }

        default: {
          throw new Error(err.response.data.message);
        }
      }
    }
  );

  return children;
};

export default WithAxios;
