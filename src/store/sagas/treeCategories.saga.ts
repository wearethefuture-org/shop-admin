import { put, call, delay } from 'redux-saga/effects';

import { fetchedTreeCategories } from './services/treeCategories.service';

import { loadTreeCategories } from '../actions/treeCategories.actions';
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
