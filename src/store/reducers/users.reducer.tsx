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
  GET_USERS_BY_QUERY_REQUEST,
  GET_USERS_BY_QUERY_SUCCESS,
  GET_USERS_BY_QUERY_ERROR,
  GET_USERS_DATE_RANGE_REQUEST,
  GET_USERS_DATE_RANGE_SUCCESS,
  GET_USERS_DATE_RANGE_ERROR,
} from '../types';
import { IUsersData } from '../../interfaces/IUsers';

const initialState: IUsersData = {
  loading: false,
  list: [],
  isSearch: false,
  currentUser: null,
  rangeUsers: null,
  error: null,
  count: 0,
  totalPages: 0,
  paginationPage: 1,
  paginationLimit: 10,
  sort: 'id',
  sortDirect: 'asc',
  searchValue: null,
  paginationPageSearch: 1,
  currentPage: 1,
};

const users = (state = initialState, { type, data }: IActions): IUsersData => {
  switch (type) {
    // GET ALL
    case GET_USERS_REQUEST: {
      return {
        ...state,
        currentUser: null,
        loading: true,
        error: null,
        isSearch: false,
        searchValue: null,
        paginationPage: data.page,
        paginationLimit: data.limit,
        sort: data.sort,
        sortDirect: data.sortDirect,
      };
    }

    case GET_USERS_SUCCESS: {
      return {
        ...state,
        list: data.length ? data.length : data.data,
        loading: false,
        count: data.count,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      };
    }

    case GET_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case GET_USERS_BY_QUERY_REQUEST: {
      return {
        ...state,
        loading: true,
        isSearch: true,
        error: null,
        searchValue: data.searchValue,
        paginationPageSearch: data.page,
      };
    }

    case GET_USERS_BY_QUERY_SUCCESS: {
      return {
        ...state,
        list: data.length ? data.length : data.data,
        count: data.count,
        totalPages: data.totalPages,
        loading: false,
      };
    }

    case GET_USERS_BY_QUERY_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case GET_USERS_DATE_RANGE_REQUEST: {
      return {
        ...state,
        rangeUsers: null,
        loading: true,
        error: null,
      };
    }

    case GET_USERS_DATE_RANGE_SUCCESS: {
      return {
        ...state,
        rangeUsers: data,
        loading: false,
      };
    }

    case GET_USERS_DATE_RANGE_ERROR: {
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
        currentUser: data,
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
        count: state.count - 1,
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
