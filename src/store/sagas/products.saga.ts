import { put, call } from 'redux-saga/effects';

import { fetchedProducts } from './services/products.service';
import { loadProducts } from '../actions';

export default function* sagaWorker() {
  const productsData = yield call(fetchedProducts);
  yield put(loadProducts(productsData));
}