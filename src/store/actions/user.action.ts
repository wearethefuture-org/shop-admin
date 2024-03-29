import { IActions } from '../../interfaces/actions';
import {
  USER_FETCH_ERROR,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  UPDATE_PROFILE_USER_REQUEST,
  UPDATE_PROFILE_USER_SUCCESS,
  ADD_AVATAR_REQUEST,
  ADD_AVATAR_SUCCESS,
  DELETE_AVATAR_REQUEST,
  DELETE_AVATAR_SUCCESS,
  CONFIRM_CHANGE_EMAIL_REQUEST,
  CONFIRM_CHANGE_EMAIL_SUCCES,
  CONFIRM_CHANGE_EMAIL_ERROR,
} from '../types';
import { IUserCreeds, IUserItem, ProfileUserUpI } from '../../interfaces/IUsers';

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

export const fetchUserRequest = (): IActions => ({ type: USER_FETCH_REQUEST });

export const fetchUserSuccess = (user: IUserItem): IActions => ({
  type: USER_FETCH_SUCCESS,
  data: user,
});

export const fetchUserError = (message: string): IActions => ({
  type: USER_FETCH_ERROR,
  data: message,
});

export const updateProfileUserReq = (userData: ProfileUserUpI): IActions => ({
  type: UPDATE_PROFILE_USER_REQUEST,
  data: userData,
});

export const updateUserProfileSuccess = (user: IUserItem): IActions => ({
  type: UPDATE_PROFILE_USER_SUCCESS,
  data: user,
});

export const addAvatarRequest = (data) => {
  return {
    type: ADD_AVATAR_REQUEST,
    data: data,
  };
};
export const addAvatarSuccess = (link: string) => {
  return {
    type: ADD_AVATAR_SUCCESS,
    data: link,
  };
};
export const deleteAvatarRequest = { type: DELETE_AVATAR_REQUEST };

export const deleteAvatarSuccess = () => {
  return {
    type: DELETE_AVATAR_SUCCESS,
  };
};

export const confirmChangeEmail = (token: string, email: string, userId: number) => ({
  type: CONFIRM_CHANGE_EMAIL_REQUEST,
  data: { token, email, userId },
});

export const setConfirmedEmail = (email: string) => ({
  type: CONFIRM_CHANGE_EMAIL_SUCCES,
  data: email,
});

export const confirmEmailErorr = (message: string) => ({
  type: CONFIRM_CHANGE_EMAIL_ERROR,
  data: message,
});
