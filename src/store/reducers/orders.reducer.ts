import { IActions } from '../../interfaces/actions';
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  UPDATE_PRODUCT_IN_ORDER_REQUEST,
  UPDATE_PRODUCT_IN_ORDER_SUCCESS,
  UPDATE_PRODUCT_IN_ORDER_ERROR,
} from '../types';
import { IOrdersData } from '../../interfaces/IOrders';

const initialState: IOrdersData = {
  loading: false,
  list: [],
  currentOrder: null,
  error: null,
  count: 0,
  totalPages: 0,
};

const orders = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case GET_ORDERS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        list: data.data,
        count: data.count,
        totalPages: data.totalPages,
        loading: false,
      };
    }

    case GET_ORDERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case GET_ORDER_BY_ID_REQUEST: {
      return {
        ...state,
        currentOrder: null,
        loading: true,
        error: null,
      };
    }

    case GET_ORDER_BY_ID_SUCCESS: {
      return {
        ...state,
        currentOrder: data,
        loading: false,
      };
    }

    case GET_ORDER_BY_ID_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case UPDATE_ORDER_STATUS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_ORDER_STATUS_SUCCESS: {
      const idx = state.list.findIndex((item) => item.id === data.id);
      return {
        ...state,
        list: [
          ...state.list.map((item) => {
            if (item.id === data.id) return { ...item, status: data.status.status };
            return item;
          }),
        ],
        loading: false,
        error: null,
      };
    }

    case UPDATE_ORDER_STATUS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case UPDATE_ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_ORDER_SUCCESS: {
      if (state.currentOrder) {
        return {
          ...state,
          loading: false,
          error: null,
          currentOrder: {
            ...state.currentOrder,
            productToOrder: state.currentOrder.productToOrder.map((item) =>
              item.id === data.id ? data : item
            ),
          },
        };
      }
    }

    case UPDATE_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case UPDATE_PRODUCT_IN_ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
   
    case UPDATE_PRODUCT_IN_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: data,
        loading: false,
      };
    }
   
    case UPDATE_PRODUCT_IN_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default orders;
