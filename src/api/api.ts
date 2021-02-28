import { root } from './config';
import axios, { AxiosResponse } from 'axios';

import { ICategoryItem } from '../interfaces/category-Item';
import {IActions, IActionsImage} from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { IProductItem } from '../interfaces/IProducts';
import { ISlideItem, ISlideUpdateValues, ISlideVisibility } from "../interfaces/ISlides";

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  categories: {
    get: () => FetchedDataType<ICategoryItem>;
    add: (category: IActions) => FetchedDataType<ICategoryItem>;
  };

  slides: {
    get: () => FetchedDataType<ISlideItem>;
    add: (slide: FormData) => FetchedDataType<ISlideItem>;
    update: (slide: ISlideUpdateValues) => FetchedDataType<ISlideItem>;
    updateVisibility: (slide: ISlideVisibility) => FetchedDataType<ISlideItem>;
    delete: (slide: IActionsImage) => FetchedDataType<ISlideItem>;
  };

  products: {
    get: () => FetchedDataType<IProductItem>;
    getById: (id: number) => FetchedDataType<IProductItem>;
    add: (product: IActions) => FetchedDataType<IProductItem>;
    update: (id: number, product: any) => FetchedDataType<IProductItem>;
    updateImg: (data: any) => FetchedDataType<JSON>;
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
  },
  slides: {
    get: () => axios.get(`${root}/slide`),
    add: (slide) =>  axios.post(`${root}/slide`, slide),
    update: (slide) => axios.patch(`${root}/slide/${slide.id}`, slide.body),
    updateVisibility: (slide) => axios.patch(`${root}/slide/visibility/${slide.id}`, {isShown: slide.isShown}),
    delete: (slide) => axios.delete(`${root}/slide/${slide.id}`),
  },

  products: {
    get: () => axios.get(`${root}/product`),
    add: (product) => axios.post(`${root}/product`, product),
    getById: (id) => axios.get(`${root}/product/${id}`),
    update: (id, product) => axios.patch(`${root}/product/${id}`, product),
    updateImg: (data) => axios.post(`${root}/product/multipleImages`, data),
    deleteProduct: (id) => axios.delete(`${root}/product/${id}`),
  },

  settings: {
    get: () => axios.get(`${root}/parameters`),
    put: (settings) => axios.put(`${root}/parameters`, settings),
  },
};
