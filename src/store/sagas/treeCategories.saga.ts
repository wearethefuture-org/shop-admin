import { put, call, delay } from 'redux-saga/effects';

import {
	fetchedTreeCategories,
	addTreeCategory,
	deleteTreeCategory,
	apiGetTreeCategoriesById,
} from './services/treeCategories.service';

import {
	getTreeCategoriesRequest,
	getTreeCategoriesSuccess,
	getTreeCategoriesByIdSuccess,
	getTreeCategoriesByIdError,
} from '../actions/treeCategories.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';

export function* fetchTreeCategoryWorker(): SagaIterator {
	try {
		const treeCategoriesData = yield call(fetchedTreeCategories);
		yield put(getTreeCategoriesSuccess(treeCategoriesData));
	} catch (error) {
		yield put(failSnackBar(error.message));
	}
}

export function* addTreeCategoryWorker({ data }: IActions): SagaIterator {
	try {
		yield call(addTreeCategory, data);
		yield put(getTreeCategoriesRequest());
		const treeCategoriesData = yield call(fetchedTreeCategories);
		yield put(getTreeCategoriesSuccess(treeCategoriesData));
		yield put(successSnackBar());
	} catch (error) {
		yield put(failSnackBar(error.message));
	}
}

export function* deleteTreeCategoryWorker({ data: id }: IActions): SagaIterator {
	try {
		yield call(deleteTreeCategory, id);
		yield put(getTreeCategoriesRequest());
		const treeCategoriesData = yield call(fetchedTreeCategories);
		yield put(getTreeCategoriesSuccess(treeCategoriesData));
		yield put(successSnackBar());
	} catch (error) {
		yield put(failSnackBar(error.message));
	}
}

export function* getTreeCategoriesByIdWorker({ data: id }: IActions): SagaIterator {
	try {
		const treeCategories = yield call(apiGetTreeCategoriesById, id);
		yield put(getTreeCategoriesByIdSuccess(treeCategories));
	} catch (error) {
		yield put(failSnackBar(error.message));
		yield put(getTreeCategoriesByIdError(error.message));
	}
}
