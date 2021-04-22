import { IActions } from '../../interfaces/actions';
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_ERROR,
  UPDATE_ORDER_QUANTITY_REQUEST,
  UPDATE_ORDER_QUANTITY_SUCCESS,
  UPDATE_ORDER_QUANTITY_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
} from '../types';
import { IOrdersData } from '../../interfaces/IOrders';

const initialState: IOrdersData = {
  loading: false,
  list: [],
  currentOrder: null,
  error: null,
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
          ...state.list.slice(0, idx),
          { ...state.list[idx], status: data.status.status },
          ...state.list.slice(idx + 1),
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

    case UPDATE_ORDER_QUANTITY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_ORDER_QUANTITY_SUCCESS: {
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

    case UPDATE_ORDER_QUANTITY_ERROR: {
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
