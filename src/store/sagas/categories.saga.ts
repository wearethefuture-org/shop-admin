import { put, call, delay } from 'redux-saga/effects';

import {
  addCategories,
  apiGetCategoryById,
  apiUpdateCategory,
  fetchedCategories,
} from './services/category.service';
import {
  loadCategories,
  addCategory,
  updateCategorySuccess,
  updateCategoryError,
} from '../actions/categories.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';
import { getCategoryByIdError, getCategoryByIdSuccess } from '../actions/categories.actions';

export function* fetchCategoryWorker(): SagaIterator {
  try {
    const categoriesData = yield call(fetchedCategories);
    yield put(loadCategories(categoriesData));
  } catch (error) {
    yield put(failSnackBar(error.message));
    console.log(error);
  }
}

export function* addCategoryWorker({ data }: IActions): SagaIterator {
  try {
    const newCategory = yield call(addCategories, data);
    yield put(addCategory(newCategory));
  } catch (error) {
    yield put(failSnackBar(error.message));
    console.dir(error);
  }
}

export function* getCategoryByIdWorker({ data: id }: IActions): SagaIterator {
  try {
    const category = yield call(apiGetCategoryById, id);
    yield put(getCategoryByIdSuccess(category));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getCategoryByIdError(error.message));
  }
}

export function* updateCategoryWorker({ data }: IActions): SagaIterator {
  try {
    const category = yield call(apiUpdateCategory, data);

    yield put(updateCategorySuccess(category));
    yield delay(700);
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateCategoryError(error.message));
  }
}
