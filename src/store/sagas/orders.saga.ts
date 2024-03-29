import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  apiGetOrders,
  apiGetOrderById,
  apiUpdateOrder,
  apiUpdateOrderStatus,
  apiGetOrdersByParams,
  apiUpdateProductInOrder,
  apiGetOrderByRange,
} from './services/orders.service';

import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import {
  getOrdersSuccess,
  getOrdersError,
  getOrderByIdSuccess,
  getOrderByIdError,
  updateOrderSuccess,
  updateOrderError,
  updateOrderStatusSuccess,
  updateOrderStatusError,
  getOrdersByParamsSuccess,
  getOrdersByParamsError,
  updateProductInOrderSuccess,
  updateProductInOrderError,
  getOrderByRangeSuccess,
  getOrderByRangeError,
} from '../actions/orders.actions';
import { IActions } from '../../interfaces/actions';

export function* getOrdersWorker({ data: { page, limit } }: IActions): SagaIterator<void> {
  try {
    const orders = yield call(apiGetOrders, page, limit);
    yield put(getOrdersSuccess(orders));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getOrdersError(error.message));
  }
}

export function* getOrdersByIdWorker({ data: id }: IActions): SagaIterator {
  try {
    const order = yield call(apiGetOrderById, id);
    yield put(getOrderByIdSuccess(order));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getOrderByIdError(error.message));
  }
}

export function* getOrdersByDateRangeWorker({ data: datesArray }: IActions): SagaIterator {
  try {
    const order = yield call(apiGetOrderByRange, datesArray);
    yield put(getOrderByRangeSuccess(order));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getOrderByRangeError(error.message));
  }
}

export function* updateOrderWorker({
  data: { orderId, productId, quantity },
}: IActions): SagaIterator<void> {
  try {
    if (Number(quantity.quantity) > 0) {
      const order = yield call(apiUpdateOrder, orderId, productId, quantity);
      yield put(updateOrderSuccess(order));
      yield put(successSnackBar());
    } else {
      throw new Error('Значення повинно бути більше нуля!');
    }
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateOrderError(error.message));
  }
}

export function* updateOrderStatusWorker({ data: { id, status } }: IActions): SagaIterator {
  try {
    yield call(apiUpdateOrderStatus, id, status);
    yield put(updateOrderStatusSuccess(id, status));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateOrderStatusError(error.message));
  }
}

export function* getOrdersByParamsWorker({
  data: { page, limit, searchValue },
}: IActions): SagaIterator<void> {
  try {
    const orders = yield call(apiGetOrdersByParams, page, limit, searchValue);
    yield put(getOrdersByParamsSuccess(orders));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getOrdersByParamsError(error.message));
  }
}

export function* updateProductInOrderWorker({ data }: IActions): SagaIterator {
  try {
    const newOrder = yield call(apiUpdateProductInOrder, data);
    yield put(updateProductInOrderSuccess(newOrder));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateProductInOrderError(error.message));
  }
}
