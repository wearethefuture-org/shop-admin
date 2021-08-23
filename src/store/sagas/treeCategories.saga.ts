import { put, call, delay } from 'redux-saga/effects';

import {
	fetchedTreeCategories,
	apiGetTreeCategoriesByKey,
} from './services/treeCategories.service';

import {
	loadTreeCategories,
	getTreeCategoriesByKeySuccess,
	getTreeCategoriesByKeyError,
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

export function* getTreeCategoriesByKeyWorker({ data: key }: IActions): SagaIterator {
	try {
		const treeCategories = yield call(apiGetTreeCategoriesByKey, key);
		yield put(getTreeCategoriesByKeySuccess(treeCategories));
	} catch (error) {
		yield put(failSnackBar(error.message));
		yield put(getTreeCategoriesByKeyError(error.message));
	}
}
