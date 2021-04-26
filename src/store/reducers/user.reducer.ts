import {
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../types';
import { IActions } from '../../interfaces/actions';
import { IUserState } from '../../interfaces/IUsers';
import { getUser } from '../../services/local-storage-controller';

const initialState: IUserState = {
  user: getUser(),
  isFetching: false,
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
    default:
      return state;
  }
};
export default user;
