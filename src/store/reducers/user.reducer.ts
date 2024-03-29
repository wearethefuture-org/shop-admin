import {
  USER_FETCH_ERROR,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  UPDATE_PROFILE_USER_SUCCESS,
  DELETE_AVATAR_SUCCESS,
  ADD_AVATAR_SUCCESS,
  CONFIRM_CHANGE_EMAIL_SUCCES,
  CONFIRM_CHANGE_EMAIL_ERROR,
} from '../types';
import { IActions } from '../../interfaces/actions';
import { IUserState, IUserItem } from '../../interfaces/IUsers';
import { getUser } from '../../services/local-storage-controller';

const initialState: IUserState = {
  user: null,
  isFetching: true,
  isLoggedIn: !!getUser(),
  error: null,
  avatarLink: undefined,
  emailСhanged: false,
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
        avatarLink: data.user.avatar?.name,
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
        avatarLink: data.avatar?.name,
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: data,
      };
    case ADD_AVATAR_SUCCESS:
      return {
        ...state,
        avatarLink: data,
        user: { ...(state.user as IUserItem), avatar: { name: data } },
      };
    case DELETE_AVATAR_SUCCESS:
      return {
        ...state,
        avatarLink: undefined,
      };
    case UPDATE_PROFILE_USER_SUCCESS:
      return {
        ...state,
        user: data,
      };
    case CONFIRM_CHANGE_EMAIL_SUCCES:
      return {
        ...state,
        user: { ...(state.user as IUserItem), email: data },
        emailСhanged: true,
      };
    case CONFIRM_CHANGE_EMAIL_ERROR:
      return {
        ...state,
        error: data,
      };
    default:
      return state;
  }
};
export default user;
