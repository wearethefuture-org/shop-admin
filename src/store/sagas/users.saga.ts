import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IActions } from '../../interfaces/actions';
import { apiGetUsers, apiAddUser, apiUpdateUser, apiDeleteUser } from './services/users.service';
import {
  addUserError,
  addUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  getUsersError, getUsersRequest,
  getUsersSuccess,
  updateUserError,
  updateUserSuccess,
} from '../actions/users.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';

export function* getUsersWorker(
  {
    data: { page, limit },
  }: IActions): SagaIterator {
  try {
    const user = yield call(apiGetUsers, page, limit);
    yield put(getUsersSuccess(user));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getUsersError(error.message));
  }
}

export function* addUserWorker({ data: { userValues } }: IActions): SagaIterator {
  try {
    const user = yield call(apiAddUser, userValues);
    yield put(addUserSuccess(user));
    yield put(successSnackBar());
    yield put(getUsersRequest(1, 10));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(addUserError(error.message));
  }
}

export function* updateUserWorker({ data: { userValues } }: IActions): SagaIterator {
  try {
    const user = yield call(apiUpdateUser, userValues);
    yield put(updateUserSuccess(user));
    yield put(successSnackBar());
    yield put(getUsersRequest(1, 10));

  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateUserError(error.message));
  }
}

export function* deleteUserWorker({ data: id }: IActions): SagaIterator {
  try {
    yield call(apiDeleteUser, id);
    yield put(deleteUserSuccess(id));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteUserError(error.message));
  }
}
