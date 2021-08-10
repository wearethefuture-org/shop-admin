import { IActions } from '../../interfaces/actions';
import {
  GET_ROLES_REQUEST,
  GET_ROLES_ERROR,
  GET_ROLES_SUCCESS,
} from '../types';
import { IRolesData } from '../../interfaces/IRoles';

const initialState: IRolesData = {
  loading: false,
  list: [],
  error: null,
};

const roles = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    // GET ALL
    case GET_ROLES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case GET_ROLES_SUCCESS: {
      return {
        ...state,
        list: data,
        loading: false,
      };
    }

    case GET_ROLES_ERROR: {
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

export default roles;
