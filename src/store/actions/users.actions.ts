import { IActions } from '../../interfaces/actions';
import { IUserReqAdd, IUserReqUp, IUserItem, IUsersSearchResponse } from '../../interfaces/IUsers';
import {
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USERS_BY_QUERY_ERROR,
  GET_USERS_BY_QUERY_REQUEST,
  GET_USERS_BY_QUERY_SUCCESS,
  GET_USERS_DATE_RANGE_ERROR,
  GET_USERS_DATE_RANGE_REQUEST,
  GET_USERS_DATE_RANGE_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../types';

export const getUsersByQueryRequest = (
  searchValue: string,
  page: number,
  limit: number
): IActions => ({
  type: GET_USERS_BY_QUERY_REQUEST,
  data: { searchValue, page, limit },
});

export const getUsersByQuerySuccess = (users: IUsersSearchResponse): IActions => ({
  type: GET_USERS_BY_QUERY_SUCCESS,
  data: users,
});

export const getUsersByQueryError = (message: string): IActions => ({
  type: GET_USERS_BY_QUERY_ERROR,
  data: message,
});

export const getUsersRequest = (
  page = 1,
  limit = 10,
  sort = 'id',
  sortDirect = 'asc'
): IActions => ({
  type: GET_USERS_REQUEST,
  data: { page, limit, sort, sortDirect },
});

export const getUsersSuccess = (users: IUserItem[]): IActions => ({
  type: GET_USERS_SUCCESS,
  data: users,
});

export const getUsersError = (message: string): IActions => ({
  type: GET_USERS_ERROR,
  data: message,
});

export const getUsersDateRangeRequest = (datesArray: string[]): IActions => ({
  type: GET_USERS_DATE_RANGE_REQUEST,
  data: datesArray,
});

export const getUsersDateRangeSuccess = (users: any): IActions => ({
  type: GET_USERS_DATE_RANGE_SUCCESS,
  data: users,
});

export const getUsersDateRangeError = (message: string): IActions => ({
  type: GET_USERS_DATE_RANGE_ERROR,
  data: message,
});

export const addUserRequest = (userValues: IUserReqAdd): IActions => ({
  type: ADD_USER_REQUEST,
  data: { userValues },
});

export const addUserSuccess = (user: IUserItem): IActions => ({
  type: ADD_USER_SUCCESS,
  data: user,
});

export const addUserError = (message: string): IActions => ({
  type: ADD_USER_ERROR,
  data: message,
});
export const updateUserRequest = (
  id: number,
  userValues: IUserReqUp,
  currentPage: number
): IActions => ({
  type: UPDATE_USER_REQUEST,
  data: { id, userValues, currentPage },
});

export const updateUserSuccess = (user: IUserItem): IActions => ({
  type: UPDATE_USER_SUCCESS,
  data: user,
});

export const updateUserError = (message: string): IActions => ({
  type: UPDATE_USER_ERROR,
  data: message,
});
export const deleteUserRequest = (id: any): IActions => {
  return {
    type: DELETE_USER_REQUEST,
    data: id,
  };
};

export const deleteUserSuccess = (id: number): IActions => ({
  type: DELETE_USER_SUCCESS,
  data: id,
});

export const deleteUserError = (message: string): IActions => ({
  type: DELETE_USER_ERROR,
  data: message,
});
