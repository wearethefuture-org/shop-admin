import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  fetchedProducts,
  fetchedProductById,
  fetchedDeleteProduct,
  fetchedAddProduct,
  fetchedUpdateProduct,
  fetchedUploadImages,
  fetchedUploadPrewies
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

  try {
    const productData = yield call(fetchedUpdateProduct, product.data);
    yield put(updateProduct(productData));
    yield put(loadProductById(productData))
  }
  catch (error) {
    console.log(error);
  }
}

export function* fetchUploadImagesProductWorker(data: IActions): SagaIterator {

  try {
    data.data.formData.append("productId", data.data.id)
    const productData = yield call(fetchedUploadImages, data.data.formData);
    const id = productData.data[0].product.id;
    const productById = yield call(fetchedProductById, id)
    yield put(loadProductById(productById))

  }
  catch (error) {
    console.log(error);
  }
}

export function* fetchUploadPrewiesProductWorker(data: IActions): SagaIterator {

  try {
    const productData = yield call(fetchedUploadPrewies, data.data);
    yield put(loadProductById(productData))

  }
  catch (error) {
    console.log(error);
  }
}