import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  apiGetOrders,
  apiGetOrderById,
  apiUpdateOrderQuantity,
  apiUpdateOrderStatus,
} from './services/orders.service';

import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import {
  getOrdersSuccess,
  getOrdersError,
  getOrderByIdSuccess,
  getOrderByIdError,
  updateOrderQuantitySuccess,
  updateOrderQuantityError,
  updateOrderStatusSuccess,
  updateOrderStatusError,
} from '../actions/orders.actions';
import { IActions } from '../../interfaces/actions';

export function* getOrdersWorker(): SagaIterator {
  try {
    const orders = yield call(apiGetOrders);
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

export function* updateOrderQuantityWorker({
  data: { orderId, productId, quantity },
}: IActions): SagaIterator<void> {
  try {
    const order = yield call(apiUpdateOrderQuantity, orderId, productId, quantity);
    yield put(updateOrderQuantitySuccess(order));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateOrderQuantityError(error.message));
  }
}

export function* updateOrderStatusWorker({ data: { id, status } }: IActions): SagaIterator<void> {
  try {
    yield call(apiUpdateOrderStatus, id, status);
    yield put(updateOrderStatusSuccess(id, status));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateOrderStatusError(error.message));
  }
}
