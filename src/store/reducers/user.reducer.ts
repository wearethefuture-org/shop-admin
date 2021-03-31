import {
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  USER_REINITIALIZATION,
} from '../types';
import { IActions } from '../../interfaces/actions';
import { IUserState } from '../../interfaces/IUsers';

const initialState: IUserState = {
  user: null,
  isFetching: false,
  isLoggedIn: false,
  error: null,
};

export const userReducer = (state = initialState, { type, data }: IActions): IUserState => {
  switch (type) {
    case USER_SIGN_IN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case USER_REINITIALIZATION:
      return {
        ...state,
        user: data.user,
        isLoggedIn: true,
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
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
export default userReducer;
