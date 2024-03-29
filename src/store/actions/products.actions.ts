import { IActions } from '../../interfaces/actions';
import {
  IProductItem,
  ICharValue,
  IGetProducts,
  IProductsSearchResponse,
  IAddProduct,
  IUpdateProduct,
  IGetProductById,
  IUpdateAvailabilityProduct,
  IDisableProduct,
  IProductsFilter,
} from '../../interfaces/IProducts';
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  GET_PRODUCTS_BY_QUERY_REQUEST,
  GET_PRODUCTS_BY_QUERY_SUCCESS,
  GET_PRODUCTS_BY_QUERY_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  UPLOAD_MAIN_IMG_REQUEST,
  UPLOAD_MAIN_IMG_SUCCESS,
  UPLOAD_MAIN_IMG_ERROR,
  UPDATE_AVAILABILITY_PRODUCT_REQUEST,
  UPDATE_AVAILABILITY_PRODUCT_SUCCESS,
  UPDATE_AVAILABILITY_PRODUCT_ERROR,
  DISABLE_PRODUCT_REQUEST,
  DISABLE_PRODUCT_SUCCESS,
  DISABLE_PRODUCT_ERROR,
} from '../types';

// get all
export const getProductsRequest = (page: number, limit: number, sort: string, sortDirect: string, filter: IProductsFilter): IActions => ({
  type: GET_PRODUCTS_REQUEST,
  data: { page, limit, sort, sortDirect, filter },
});

export const getProductsSuccess = (products: IGetProducts[]): IActions => ({
  type: GET_PRODUCTS_SUCCESS,
  data: products,
});

export const getProductsError = (message: string): IActions => ({
  type: GET_PRODUCTS_ERROR,
  data: message,
});

// get by search query

export const getProductsByQueryRequest = (
  searchValue: string,
  page: number,
  limit: number
): IActions => ({
  type: GET_PRODUCTS_BY_QUERY_REQUEST,
  data: { searchValue, page, limit },
});

export const getProductsByQuerySuccess = (products: IProductsSearchResponse): IActions => ({
  type: GET_PRODUCTS_BY_QUERY_SUCCESS,
  data: products,
});

export const getProductsByQueryError = (message: string): IActions => ({
  type: GET_PRODUCTS_BY_QUERY_ERROR,
  data: message,
});

// get one by id
export const getProductByIdRequest = (id: number): IActions => ({
  type: GET_PRODUCT_BY_ID_REQUEST,
  data: id,
});

export const getProductByIdSuccess = (product: IProductItem): IActions => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  data: product,
});

export const getProductByIdError = (message: string): IActions => ({
  type: GET_PRODUCT_BY_ID_ERROR,
  data: message,
});

// add product
export const addProductRequest = (
  productValues: IAddProduct,
  characteristicValues: ICharValue[]
): IActions => ({
  type: ADD_PRODUCT_REQUEST,
  data: { productValues, characteristicValues },
});

export const addProductSuccess = (product: IProductItem): IActions => ({
  type: ADD_PRODUCT_SUCCESS,
  data: product,
});

export const addProductError = (message: string): IActions => ({
  type: ADD_PRODUCT_ERROR,
  data: message,
});

// upload main image
export const uploadMainImgRequest = (productId: number, imgName: string): IActions => ({
  type: UPLOAD_MAIN_IMG_REQUEST,
  data: { productId, imgName },
});

export const uploadMainImgSuccess = (product: IGetProductById): IActions => ({
  type: UPLOAD_MAIN_IMG_SUCCESS,
  data: product,
});

export const uploadMainImgError = (message: string): IActions => ({
  type: UPLOAD_MAIN_IMG_ERROR,
  data: message,
});

// update product
export const updateProductRequest = (
  id: number,
  productValues: IUpdateProduct,
  characteristicValues: {
    charsToAdd: ICharValue[];
    charsToEdit: ICharValue[];
    charsToDelete: number[];
  },
  imagesToDelete: string[]
): IActions => ({
  type: UPDATE_PRODUCT_REQUEST,
  data: { id, productValues, characteristicValues, imagesToDelete },
});

export const updateProductSuccess = (product: IProductItem): IActions => ({
  type: UPDATE_PRODUCT_SUCCESS,
  data: product,
});

export const updateProductError = (message: string): IActions => ({
  type: UPDATE_PRODUCT_ERROR,
  data: message,
});

// update availability product
export const updateAvailabilityProductRequest = (data: IUpdateAvailabilityProduct): IActions => ({
  type: UPDATE_AVAILABILITY_PRODUCT_REQUEST,
  data: data,
});

export const updateAvailabilityProductSuccess = (product: IProductItem): IActions => ({
  type: UPDATE_AVAILABILITY_PRODUCT_SUCCESS,
  data: product,
});

export const updateAvailabilityProductError = (message: string): IActions => ({
  type: UPDATE_AVAILABILITY_PRODUCT_ERROR,
  data: message,
});

// disable product
export const disableProductRequest = (data: IDisableProduct): IActions => ({
  type: DISABLE_PRODUCT_REQUEST,
  data,
});
export const disableProductSuccess = (product: IProductItem): IActions => ({
  type: DISABLE_PRODUCT_SUCCESS,
  data: product,
});
export const disableProductError = (message: string): IActions => ({
  type: DISABLE_PRODUCT_ERROR,
  data: message,
});

// delete product
export const deleteProductRequest = (product: IGetProductById): IActions => ({
  type: DELETE_PRODUCT_REQUEST,
  data: product,
});

export const deleteProductSuccess = (id: number): IActions => ({
  type: DELETE_PRODUCT_SUCCESS,
  data: id,
});

export const deleteProductError = (message: string): IActions => ({
  type: DELETE_PRODUCT_ERROR,
  data: message,
});
