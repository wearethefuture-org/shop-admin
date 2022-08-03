import {
  USER_FETCH_ERROR,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../types';
import { IActions } from '../../interfaces/actions';
import { IUserState } from '../../interfaces/IUsers';
import { getUser } from '../../services/local-storage-controller';

const initialState: IUserState = {
  user: null,
  isFetching: true,
  isLoggedIn: !!getUser(),
  error: null,
};

const user = (state = initialState, { type, data }: IActions): IUserState => {
  switch (type) {
    case USER_SIGN_IN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: data.user,
        isLoggedIn: true,
      };
    case USER_SIGN_IN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        user: null,
        isFetching: false,
        isLoggedIn: false,
        error: null,
      };
    case USER_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: data,
        isLoggedIn: true,
        error: null,
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: data,
      };
    default:
      return state;
  }
};
export default user;
