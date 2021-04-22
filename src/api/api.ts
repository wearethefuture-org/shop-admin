import { root } from './config';
import axios, { AxiosResponse } from 'axios';

import {
  IAddCategory,
  GeneralCategory,
  ICategoryResponse,
  IGetCategoriesResponse,
} from '../interfaces/ICategory';

import {
  IAddCharResponse,
  IAddImgResponse,
  IAddProduct,
  IGetProductById,
  IGetProducts,
  IProductCharRequest,
  IProductsInCart,
  IUpdateProduct,
} from '../interfaces/IProducts';
import { IBasicOrder } from '../interfaces/IOrders';
import { Category } from '../pages/Categories/CategoryInfo/categoryReducer';

import { IActions, IActionsImage } from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { ISlideItem, ISlideUpdateValues, ISlideVisibility } from '../interfaces/ISlides';

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  categories: {
    get: () => FetchedDataType<IGetCategoriesResponse>;
    add: (category: IAddCategory) => FetchedDataType<GeneralCategory>;
    getById: (id: number) => FetchedDataType<ICategoryResponse>;
    update: (data: Category) => FetchedDataType<ICategoryResponse>;
  };

  products: {
    get: () => FetchedDataType<IGetProducts>;
    getById: (id: number) => FetchedDataType<IGetProductById>;
    add: (product: IAddProduct) => FetchedDataType<IGetProductById>;
    update: (product: IUpdateProduct) => FetchedDataType<IGetProductById>;
    updateImg: (data: FormData) => FetchedDataType<IAddImgResponse>;
    updateMainImg: (data: {
      productId: number;
      imgName: string;
    }) => FetchedDataType<IGetProductById>;
    deleteImg: (imgName: string) => FetchedDataType<IGetProductById>;
    deleteProduct: (id: number) => FetchedDataType<JSON>;
    getProductsInCart: () => FetchedDataType<IProductsInCart>;
    addProductCharValues: (data: IProductCharRequest) => FetchedDataType<IAddCharResponse>;
    updateProductCharValues: (data: IProductCharRequest) => FetchedDataType<IAddCharResponse>;
  };

  settings: {
    get: () => FetchedDataType<ISettingsItem>;
    put: (settings: IActions) => FetchedDataType<ISettingsItem>;
  };

  slides: {
    get: () => FetchedDataType<ISlideItem>;
    add: (slide: FormData) => FetchedDataType<ISlideItem>;
    update: (slide: ISlideUpdateValues) => FetchedDataType<ISlideItem>;
    updateVisibility: (slide: ISlideVisibility) => FetchedDataType<ISlideItem>;
    delete: (slide: IActionsImage) => FetchedDataType<ISlideItem>;
  };

  orders: {
    get: () => FetchedDataType<IBasicOrder>;
    updateStatus: (id: number, status: any) => FetchedDataType<IBasicOrder>;
    updateQuantity: (
      orderId: number,
      productId: number,
      quantity: number
    ) => FetchedDataType<IBasicOrder>;
    getById: (id: number) => FetchedDataType<IBasicOrder>;
  };
};

export const api: ApiFetchedDataType = {
  categories: {
    get: () => axios.get(`${root}/category`),
    add: (category) => axios.post(`${root}/category`, category),
    getById: (id) => axios.get(`${root}/category/${id}`),
    update: (data) => axios.patch(`${root}/category`, data),
  },

  products: {
    get: () => axios.get(`${root}/product`),
    add: (product) => axios.post(`${root}/product`, product),
    getById: (id) => axios.get(`${root}/product/${id}`),
    update: ({ id, ...product }) => axios.patch(`${root}/product/${id}`, product),
    updateImg: (data) => axios.post(`${root}/product/multipleimages`, data),
    updateMainImg: (data) => axios.patch(`${root}/product/img/preview`, data),
    deleteImg: (imgName) => axios.delete(`${root}/product/img/${imgName}`),
    deleteProduct: (id) => axios.delete(`${root}/product/${id}`),
    getProductsInCart: () => axios.get(`${root}/products-in-cart`),
    addProductCharValues: (data) => axios.post(`${root}/characteristics-values`, data),
    updateProductCharValues: (data) => axios.patch(`${root}/characteristics-values`, data),
  },

  slides: {
    get: () => axios.get(`${root}/slide`),
    add: (slide) => axios.post(`${root}/slide`, slide),
    update: (slide) => axios.patch(`${root}/slide/${slide.id}`, slide.body),
    updateVisibility: (slide) =>
      axios.patch(`${root}/slide/visibility/${slide.id}`, { isShown: slide.isShown }),
    delete: (slide) => axios.delete(`${root}/slide/${slide.id}`),
  },

  settings: {
    get: () => axios.get(`${root}/parameters`),
    put: (settings) => axios.put(`${root}/parameters`, settings),
  },

  orders: {
    get: () => axios.get(`${root}/orders`),
    getById: (id) => axios.get(`${root}/orders/${id}`),
    updateStatus: (id, status) => axios.patch(`${root}/orders/status/${id}`, status),
    updateQuantity: (orderId, productId, quantity) =>
      axios.put(`${root}/orders/${orderId}/${productId}`, quantity),
  },
};
