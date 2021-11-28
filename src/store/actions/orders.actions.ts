import { IActions } from '../../interfaces/actions';

import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
} from '../types';

export const getOrdersRequest = (page: number, limit: number): IActions => ({
  type: GET_ORDERS_REQUEST,
  data: {
    page,
    limit,
  },
});

export const getOrdersSuccess = (orders): IActions => ({
  type: GET_ORDERS_SUCCESS,
  data: orders,
});

export const getOrdersError = (message: string): IActions => ({
  type: GET_ORDERS_ERROR,
  data: message,
});

export const getOrderByIdRequest = (id): IActions => ({
  type: GET_ORDER_BY_ID_REQUEST,
  data: id,
});

export const getOrderByIdSuccess = (order): IActions => ({
  type: GET_ORDER_BY_ID_SUCCESS,
  data: order,
});

export const getOrderByIdError = (message: string): IActions => ({
  type: GET_ORDER_BY_ID_ERROR,
  data: message,
});

export const updateOrderStatusRequest = (id, status): IActions => ({
  type: UPDATE_ORDER_STATUS_REQUEST,
  data: { id, status },
});

export const updateOrderStatusSuccess = (id, status): IActions => ({
  type: UPDATE_ORDER_STATUS_SUCCESS,
  data: { id, status },
});

export const updateOrderStatusError = (message: string): IActions => ({
  type: UPDATE_ORDER_STATUS_ERROR,
  data: message,
});

export const updateOrderRequest = (orderId, productId, quantity): IActions => ({
  type: UPDATE_ORDER_REQUEST,
  data: {
    orderId,
    productId,
    quantity,
  },
});

export const updateOrderSuccess = (order): IActions => ({
  type: UPDATE_ORDER_SUCCESS,
  data: order,
});

export const updateOrderError = (message: string): IActions => ({
  type: UPDATE_ORDER_ERROR,
  data: message,
});
