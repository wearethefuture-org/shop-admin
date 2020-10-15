import { takeEvery } from 'redux-saga/effects';

import { REQUEST_CATEGORIES, REQUEST_PRODUCTS } from '../types';
import categoriesWorker from '../sagas/categories.saga';
import productsWorker from '../sagas/products.saga';


export function* sagaCategoriesWatcher() {
   yield takeEvery(REQUEST_CATEGORIES, categoriesWorker);
}

export function* sagaProductsWatcher() {
   yield takeEvery(REQUEST_PRODUCTS, productsWorker);
}
