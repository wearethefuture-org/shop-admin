import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  fetchedProducts,
  fetchedProductById,
  fetchedDeleteProduct,
  fetchedAddProduct,
  fetchedUpdateProduct
} from './services/products.service';
import {
  loadProducts,
  loadProductById,
  deleteProduct,
  addProduct,
  updateProduct
} from '../actions';
import { IActions } from '../../interfaces/actions';

export function* fetchProductWorker(): SagaIterator {
  try {
    const productsData = yield call(fetchedProducts);
    yield put(loadProducts(productsData));
  }
  catch (error) {
    console.log(error);
  }
}

export function* fetchProductByIdWorker(data: IActions): SagaIterator {
  try {
    const productData = yield call(fetchedProductById, data.data);
    yield put(loadProductById(productData));
  }
  catch (error) {
    console.log(error);
  }
}

export function* fetchDeleteProductWorker(action: IActions): SagaIterator {
  try {
    const productData = yield call(fetchedDeleteProduct, action.data);
    yield put(deleteProduct(productData));
  }
  catch (error) {
    console.log(error);
  }
}

export function* fetchAddProductWorker(product: IActions): SagaIterator {
  try {
    const productData = yield call(fetchedAddProduct, product.data);
    yield put(addProduct(productData));
  }
  catch (error) {
    console.log(error);
  }
}

export function* fetchUpdateProductWorker(product: IActions): SagaIterator {
  console.log(product.data)
  try {
    const productData = yield call(fetchedUpdateProduct, product.data);
    yield put(updateProduct(productData));
    yield call(fetchedProductById, productData.id);
    yield put(loadProductById(productData))
  }
  catch (error) {
    console.log(error);
  }
}