import { takeEvery } from 'redux-saga/effects';
import {
   REQUEST_CATEGORIES,
   REQUEST_ADD_CATEGORIES,
   REQUEST_PRODUCTS,
   REQUEST_SLIDERS,
   REQUEST_ADD_SLIDERS,
   REQUEST_DELETE_SLIDERS
} from '../types';
import { fetchCategoryWorker, addCategoryWorker } from './categories.saga';
import productsWorker from '../sagas/products.saga';
import {fetchSliderWorker, addSliderWorker, deleteSliderWorker} from './sliders.saga';
import { SagaIterator } from 'redux-saga';


export function* sagaCategoriesWatcher(): SagaIterator {
   yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
   yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
}

export function* sagaProductsWatcher(): SagaIterator {
   yield takeEvery(REQUEST_PRODUCTS, productsWorker);
}

export function* sagaSlidersWatcher(): SagaIterator {
   yield takeEvery(REQUEST_SLIDERS, fetchSliderWorker);
   yield takeEvery(REQUEST_ADD_SLIDERS, addSliderWorker);
   yield takeEvery(REQUEST_DELETE_SLIDERS, deleteSliderWorker);
}

