import { IActions } from '../../interfaces/actions';
import { IProductItem, IProductFormData } from '../../interfaces/IProducts';
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
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
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_ERROR,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_ERROR,
  DELETE_IMAGE_SUCCESS,
} from '../types';

// get all
export const getProductsRequest = (): IActions => ({
  type: GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (products: IProductItem[]): IActions => ({
  type: GET_PRODUCTS_SUCCESS,
  data: products,
});

export const getProductsError = (message: string): IActions => ({
  type: GET_PRODUCTS_ERROR,
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
export const addProductRequest = (product: IProductFormData): IActions => ({
  type: ADD_PRODUCT_REQUEST,
  data: product,
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

export const uploadMainImgSuccess = (mainImg: string): IActions => ({
  type: UPLOAD_MAIN_IMG_SUCCESS,
  data: mainImg,
});

export const uploadMainImgError = (message: string): IActions => ({
  type: UPLOAD_MAIN_IMG_ERROR,
  data: message,
});

// upload images
export const uploadImagesRequest = (images: string[]): IActions => ({
  type: UPLOAD_IMAGES_REQUEST,
  data: images,
});

export const uploadImagesSuccess = (images: string): IActions => ({
  type: UPLOAD_IMAGES_SUCCESS,
  data: images,
});

export const uploadImagesError = (message: string): IActions => ({
  type: UPLOAD_IMAGES_ERROR,
  data: message,
});

// delete image
export const deleteImageRequest = (imgName: string, id: string): IActions => ({
  type: DELETE_IMAGE_REQUEST,
  data: { imgName, id },
});

export const deleteImageSuccess = (product: IProductItem): IActions => ({
  type: DELETE_IMAGE_SUCCESS,
  data: product,
});

export const deleteImageError = (message: string): IActions => ({
  type: DELETE_IMAGE_ERROR,
  data: message,
});

// update product
export const updateProductRequest = (data): IActions => ({
  type: UPDATE_PRODUCT_REQUEST,
  data,
});

export const updateProductSuccess = (product: IProductItem): IActions => ({
  type: UPDATE_PRODUCT_SUCCESS,
  data: product,
});

export const updateProductError = (message: string): IActions => ({
  type: UPDATE_PRODUCT_ERROR,
  data: message,
});

// delete product
export const deleteProductRequest = (id: number): IActions => ({
  type: DELETE_PRODUCT_REQUEST,
  data: id,
});

export const deleteProductSuccess = (): IActions => ({
  type: DELETE_PRODUCT_SUCCESS,
});

export const deleteProductError = (message: string): IActions => ({
  type: DELETE_PRODUCT_ERROR,
  data: message,
});
