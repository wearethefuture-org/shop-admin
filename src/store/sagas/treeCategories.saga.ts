import { put, call, delay } from 'redux-saga/effects';

import { fetchedTreeCategories, apiGetTreeCategoriesById } from './services/treeCategories.service';

import {
	loadTreeCategories,
	getTreeCategoriesByIdSuccess,
	getTreeCategoriesByIdError,
} from '../actions/treeCategories.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';

export function* fetchTreeCategoryWorker(): SagaIterator {
	try {
		const treeCategoriesData = yield call(fetchedTreeCategories);
		yield put(loadTreeCategories(treeCategoriesData));
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
