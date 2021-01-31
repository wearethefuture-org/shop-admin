import { root } from './config';
import axios, { AxiosResponse } from 'axios';
import { ICategoryItem } from '../interfaces/category-Item';
import { IActions } from '../interfaces/actions';
import { IProductItem } from '../interfaces/IProducts';

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  categories: {
    get: () => FetchedDataType<ICategoryItem>;
    add: (category: IActions) => FetchedDataType<ICategoryItem>;
  };
  products: {
    get: () => FetchedDataType<IProductItem>;
    getById: (id: number) => FetchedDataType<IProductItem>;
    add: (product: IActions) => FetchedDataType<IProductItem>;
    update: (id: number, product: any) => FetchedDataType<IProductItem>;
    updateImg: (data: any) => FetchedDataType<JSON>;
    deleteProduct: (id: IActions) => FetchedDataType<JSON>;
  };
};

export const api: ApiFetchedDataType = {
  categories: {
    get: () => axios.get(`${root}/category`),
    add: (category) => axios.post(`${root}/category`, category),
  },
  products: {
    get: () => axios.get(`${root}/product`),
    add: (product) => axios.post(`${root}/product`, product),
    getById: (id) => axios.get(`${root}/product/${id}`),
    update: (id, product) => axios.patch(`${root}/product/${id}`, product),
    updateImg: (data) => axios.post(`${root}/product/multipleImages`, data),
    deleteProduct: (id) => axios.delete(`${root}/product/${id}`),
  },
};
