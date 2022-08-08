import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';

import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import {
  fetchUserError,
  fetchUserSuccess,
  signInUserError,
  signInUserSuccess,
  updateUserProfileSuccess,
  addAvatarSuccess,
  deleteAvatarSuccess,
} from '../actions/user.action';
import {
  apiSignIn,
  userFetch,
  updateProfileUser,
  deleteAvatar,
  addAvatar,
} from './services/user.service';
import { clearStorage, setToken, setUser } from '../../services/local-storage-controller';

export function* sigInUser(userValues: IActions): SagaIterator {
  try {
    const { email, password } = userValues.data?.payload;
    const user = yield call(apiSignIn, { email, password });

    setToken(user.token);
    setUser(user.user);

    yield put(signInUserSuccess(user));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(signInUserError(error.message));
  }
}

export function* signOutUser(): SagaIterator {
  try {
    clearStorage();
    const urlArr = window.location.href.split('/');
    if (urlArr[3] !== 'home') {
      yield put(successSnackBar());
    }
  } catch (error) {}
}

export function* fetchUser(): SagaIterator {
  try {
    const user = yield call(userFetch);
    setUser(user);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    const urlArr = window.location.href.split('/');
    if (urlArr[3] !== 'home') {
      yield put(failSnackBar(error.message));
    }
    yield put(fetchUserError(error.message));
  }
}

export function* updateProfileUserWorker(userData: IActions): SagaIterator {
  try {
    const user = yield call(updateProfileUser, userData.data);
    yield put(updateUserProfileSuccess(user));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}

export function* addAvatarWorker(action: IActions): SagaIterator {
  try {
    const link = yield call(addAvatar, action.data);
    yield put(addAvatarSuccess(link.message));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}

export function* deleteAvatarWorker(): SagaIterator {
  try {
    yield call(deleteAvatar);
    yield put(deleteAvatarSuccess());
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}
