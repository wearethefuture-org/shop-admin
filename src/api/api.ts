import { root } from './config';
import axios, { AxiosResponse } from 'axios';

import { ICategoryItem } from '../interfaces/ICategory';
import { IActions } from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { IProductItem } from '../interfaces/IProducts';

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  categories: {
    get: () => FetchedDataType<ICategoryItem>;
    add: (category: IActions) => FetchedDataType<ICategoryItem>;
    getById: (id: number) => FetchedDataType<ICategoryItem>;
    update: (data: IActions) => FetchedDataType<ICategoryItem>;
  };

  products: {
    get: () => FetchedDataType<IProductItem>;
    getById: (id: number) => FetchedDataType<IProductItem>;
    add: (product: IActions) => FetchedDataType<IProductItem>;
    update: (id: number, product: any) => FetchedDataType<IProductItem>;
    updateImg: (data: FormData) => FetchedDataType<JSON>;
    updateMainImg: (data: IActions) => FetchedDataType<JSON>;
    deleteImg: (imgName: string) => FetchedDataType<IProductItem>;
    deleteProduct: (id: IActions) => FetchedDataType<JSON>;
  };

  settings: {
    get: () => FetchedDataType<ISettingsItem>;
    put: (settings: IActions) => FetchedDataType<ISettingsItem>;
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
    update: (id, product) => axios.patch(`${root}/product/${id}`, product),
    updateImg: (data) => axios.post(`${root}/product/multipleimages`, data),
    updateMainImg: (data) => axios.patch(`${root}/product/img/preview`, data),
    deleteImg: (imgName) => axios.delete(`${root}/product/img/${imgName}`),
    deleteProduct: (id) => axios.delete(`${root}/product/${id}`),
  },

  settings: {
    get: () => axios.get(`${root}/parameters`),
    put: (settings) => axios.put(`${root}/parameters`, settings),
  },
};
