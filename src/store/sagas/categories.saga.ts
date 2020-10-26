import {put, call} from 'redux-saga/effects';

import { addCategories, fetchedCategories } from './services/category.service';
import { loadCategories, addCategory } from '../actions';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';

export function* fetchCategoryWorker (): SagaIterator {
   const categoriesData = yield call(fetchedCategories);
   yield put(loadCategories(categoriesData));
}

export function* addCategoryWorker ({data}: IActions): SagaIterator {
   const newCategory = yield call(addCategories, data);
   yield put(addCategory(newCategory));
}