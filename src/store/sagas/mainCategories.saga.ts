import { put, call, delay } from 'redux-saga/effects';

import {
  addMainCategories,
  apiGetMainCategoryById,
  apiUpdateMainCategory,
  fetchedMainCategories,
} from './services/mainCategory.service';

import {
  loadMainCategories,
  addMainCategory,
  updateMainCategorySuccess,
  updateMainCategoryError,
} from '../actions/mainCategories.actions';

import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';
import { getMainCategoryByIdError, getMainCategoryByIdSuccess } from '../actions/mainCategories.actions';

export function* fetchMainCategoryWorker(): SagaIterator {
  try {
    const mainCategoriesData = yield call(fetchedMainCategories);
    yield put(loadMainCategories(mainCategoriesData));
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}

export function* addMainCategoryWorker({ data }: IActions): SagaIterator {
  try {
    const newMainCategory = yield call(addMainCategories, data);
    yield put(addMainCategory(newMainCategory));
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}

export function* getMainCategoryByIdWorker({ data: id }: IActions): SagaIterator {
  try {
    const mainCategory = yield call(apiGetMainCategoryById, id);
    yield put(getMainCategoryByIdSuccess(mainCategory));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getMainCategoryByIdError(error.message));
  }
}

export function* updateMainCategoryWorker({ data }: IActions): SagaIterator {
  try {
    const mainCategory = yield call(apiUpdateMainCategory, data);

    yield put(updateMainCategorySuccess(mainCategory));
    yield delay(700);
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateMainCategoryError(error.message));
  }
}
