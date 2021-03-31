import { IActions } from '../../interfaces/actions';
import {
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../types';
import { IUserCreeds, IUserItem } from '../../interfaces/IUsers';

export const signInUserRequest = (creeds: IUserCreeds): IActions => {
  return {
    type: USER_SIGN_IN_FETCHING,
    data: { payload: creeds },
  };
};

export const signInUserSuccess = (user: IUserItem): IActions => {
  return {
    type: USER_SIGN_IN_SUCCESS,
    data: user,
  };
};

export const signInUserError = (message: string): IActions => ({
  type: USER_SIGN_IN_ERROR,
  data: message,
});

export const signOutUser = (): IActions => {
  return {
    type: USER_SIGN_OUT,
  };
};
