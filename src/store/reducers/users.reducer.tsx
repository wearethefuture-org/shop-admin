import { IActions } from '../../interfaces/actions';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from '../types';
import { IUsersData } from '../../interfaces/IUsers';

const initialState: IUsersData = {
  loading: false,
  list: [],
  currentUser: null,
  error: null,
};

const users = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    // GET ALL
    case GET_USERS_REQUEST: {
      return {
        ...state,
        currentUSER: null,
        loading: true,
        error: null,
      };
    }

    case GET_USERS_SUCCESS: {
      return {
        ...state,
        list: data.length ? data.length : data.data,
        loading: false,
      };
    }

    case GET_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }
    case ADD_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case ADD_USER_SUCCESS: {
      return {
        ...state,
        list: [...state.list, data],
        loading: false,
      };
    }

    case ADD_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        currentUSER: data,
        loading: false,
      };
    }

    case UPDATE_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        list: state.list.filter((USER) => USER.id !== data),
        loading: false,
      };
    }

    case DELETE_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    default:
      return state;
  }
};

export default users;
