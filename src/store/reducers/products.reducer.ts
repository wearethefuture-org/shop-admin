import { IActions } from '../../interfaces/actions';
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  GET_PRODUCTS_BY_QUERY_REQUEST,
  GET_PRODUCTS_BY_QUERY_SUCCESS,
  GET_PRODUCTS_BY_QUERY_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  UPLOAD_MAIN_IMG_REQUEST,
  UPLOAD_MAIN_IMG_SUCCESS,
  UPLOAD_MAIN_IMG_ERROR,
  UPDATE_AVAILABILITY_PRODUCT_REQUEST,
  UPDATE_AVAILABILITY_PRODUCT_ERROR,
  UPDATE_AVAILABILITY_PRODUCT_SUCCESS,
  DISABLE_PRODUCT_REQUEST,
  DISABLE_PRODUCT_SUCCESS,
  DISABLE_PRODUCT_ERROR,
} from '../types';
import { IProductsData } from '../../interfaces/IProducts';

const initialState: IProductsData = {
  loading: false,
  list: [],
  currentProduct: null,
  error: null,
  count: 0,
  totalPages: 0,
};

const products = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    // GET ALL
    case GET_PRODUCTS_REQUEST: {
      return {
        ...state,
        currentProduct: null,
        loading: true,
        error: null,
      };
    }

    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        list: data.data,
        loading: false,
        count: data.count,
        totalPages: data.totalPages,
      };
    }

    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    // GET BY SEARCH QUERY

    case GET_PRODUCTS_BY_QUERY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case GET_PRODUCTS_BY_QUERY_SUCCESS: {
      return {
        ...state,
        list: data.data,
        count: data.count,
        totalPages: data.totalPages,
        loading: false,
      };
    }

    case GET_PRODUCTS_BY_QUERY_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    // GET ONE BY ID
    case GET_PRODUCT_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case GET_PRODUCT_BY_ID_SUCCESS: {
      return {
        ...state,
        currentProduct: data,
        loading: false,
      };
    }

    case GET_PRODUCT_BY_ID_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    // ADD PRODUCT
    case ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        list: [...state.list, data],
        loading: false,
      };
    }

    case ADD_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    // UPLOAD MAIN IMG
    case UPLOAD_MAIN_IMG_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPLOAD_MAIN_IMG_SUCCESS: {
      return {
        ...state,
        currentProduct: data,
        loading: false,
      };
    }

    case UPLOAD_MAIN_IMG_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    // UPDATE PRODUCT
    case UPDATE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        currentProduct: data,
        loading: false,
      };
    }

    case UPDATE_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case UPDATE_AVAILABILITY_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case UPDATE_AVAILABILITY_PRODUCT_SUCCESS: {
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          availability: data.availability,
        },
        loading: false,
      };
    }

    case UPDATE_AVAILABILITY_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case DISABLE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DISABLE_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          disabled: data.disabled,
        },
        loading: false,
      };

    case DISABLE_PRODUCT_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };

    // DELETE PRODUCT
    case DELETE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        list: state.list.filter((product) => product.id !== data),
        loading: false,
      };
    }

    case DELETE_PRODUCT_ERROR: {
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

export default products;
