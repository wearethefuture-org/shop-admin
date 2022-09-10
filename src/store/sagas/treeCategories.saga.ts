import { put, call, delay } from 'redux-saga/effects';

import {
  fetchedTreeCategories,
  addTreeCategory,
  deleteTreeCategory,
  apiUpdateTreeCategory,
  apiGetTreeCategoriesById,
  disableEnableCategory,
} from './services/treeCategories.service';

import {
  getTreeCategoriesRequest,
  getTreeCategoriesSuccess,
  getTreeCategoriesByIdSuccess,
  getTreeCategoriesByIdError,
  updateTreeCategorySuccess,
  updateTreeCategoryError,
  disableEnableCategorySuccess,
  addTreeCategoryError,
  addTreeCategorySuccess,
} from '../actions/treeCategories.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';

export function* fetchTreeCategoryWorker(): SagaIterator {
  try {
    const treeCategoriesData = yield call(fetchedTreeCategories);
    yield put(getTreeCategoriesSuccess(treeCategoriesData));
  } catch (error: any) {
    yield put(failSnackBar(error.message));
  }
}

export function* addTreeCategoryWorker({ data }: IActions): SagaIterator {
  try {
    const newCategory = yield call(addTreeCategory, data);
    yield put(addTreeCategorySuccess(newCategory))
    yield put(successSnackBar());
  } catch (error: any) {
    yield put(failSnackBar(error.message));
    yield put(addTreeCategoryError(error.message));
  }
}

export function* deleteTreeCategoryWorker({ data: id }: IActions): SagaIterator {
  try {
    yield call(deleteTreeCategory, id);
    yield put(getTreeCategoriesRequest());
    const treeCategoriesData = yield call(fetchedTreeCategories);

    yield put(getTreeCategoriesSuccess(treeCategoriesData));
    yield put(successSnackBar());
  } catch (error: any) {
    yield put(failSnackBar(error.message));
  }
}

export function* disableEnableCategoryWorker({ data }: IActions): SagaIterator {
  try {
    yield call(disableEnableCategory, data);
    const treeCategoriesData = yield call(apiGetTreeCategoriesById, data.id);
    yield put(disableEnableCategorySuccess(treeCategoriesData));
    yield put(successSnackBar());
  } catch (error: any) {
    yield put(failSnackBar(error.message));
  }
}

export function* updateTreeCategoryWorker({ data }: IActions): SagaIterator {
  try {
    const updatedCategory = yield call(apiUpdateTreeCategory, data);
    yield put(getTreeCategoriesRequest());
    const treeCategoriesData = yield call(fetchedTreeCategories);
    yield put(getTreeCategoriesSuccess(treeCategoriesData));

    yield put(updateTreeCategorySuccess(updatedCategory));
    yield delay(700);
    yield put(successSnackBar());
  } catch (error: any) {
    yield put(failSnackBar(error.message));
    yield put(updateTreeCategoryError(error.message));
  }
}

export function* getTreeCategoriesByIdWorker({ data: id }: IActions): SagaIterator {
  try {
    const treeCategories = yield call(apiGetTreeCategoriesById, id);
    yield put(getTreeCategoriesByIdSuccess(treeCategories));
  } catch (error: any) {
    yield put(failSnackBar(error.message));
    yield put(getTreeCategoriesByIdError(error.message));
  }
}
