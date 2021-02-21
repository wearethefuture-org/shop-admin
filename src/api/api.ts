import { root } from './config';
import axios, { AxiosResponse } from 'axios';

import { ICategoryItem } from '../interfaces/category-Item';
import {IActions, IActionsImage} from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { IProductItem } from '../interfaces/IProducts';
import { ISliderItem, ISliderUpdateValues, ISliderVisibility } from "../interfaces/ISliders";

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  categories: {
    get: () => FetchedDataType<ICategoryItem>;
    add: (category: IActions) => FetchedDataType<ICategoryItem>;
  };

  sliders: {
    get: () => FetchedDataType<ISliderItem>;
    add: (slider: FormData) => FetchedDataType<ISliderItem>;
    update: (slider: ISliderUpdateValues) => FetchedDataType<ISliderItem>;
    updateVisibility: (slider: ISliderVisibility) => FetchedDataType<ISliderItem>;
    delete: (slider: IActionsImage) => FetchedDataType<ISliderItem>;
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
  sliders: {
    get: () => axios.get(`${root}/slider`),
    add: (slider) =>  axios.post(`${root}/slider`, slider),
    update: (slider) => axios.patch(`${root}/slider/${slider.id}`, slider.body),
    updateVisibility: (slider) => axios.patch(`${root}/slider/visibility/${slider.id}`, {isShown: slider.isShown}),
    delete: (slider) => axios.delete(`${root}/slider/${slider.id}`),
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
