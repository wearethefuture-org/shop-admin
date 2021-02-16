import { root } from './config';
import axios, { AxiosResponse } from 'axios';

import { ICategoryItem } from '../interfaces/category-Item';
import {IActions, IActionsImage} from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { IProductItem } from '../interfaces/IProducts';
import {ISliderItem} from "../interfaces/ISliders";

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  categories: {
    get: () => FetchedDataType<ICategoryItem>;
    add: (category: IActions) => FetchedDataType<ICategoryItem>;
  };

  sliders: {
      get: () => FetchedDataType<ISliderItem>;
      add: (slider: IActionsImage) => FetchedDataType<ISliderItem>;
      update: (slider: IActionsImage) => FetchedDataType<ISliderItem>;
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
    add: async (slider) => {

      if (slider.image instanceof File) {
        const formData = new FormData()
        formData.append("image", slider.image)
        const serverImage = await axios.post(`${root}/slider/images`, formData)
        slider.image = `${root}/slider/img/${serverImage.data.name}`
      }
      return axios.post(`${root}/slider`, slider)
    },
    update: async (slider) => {

      if (slider.image instanceof File) {
         const formData = new FormData()
         formData.append("image", slider.image)
         const serverImage = await axios.post(`${root}/slider/images`, formData)
         slider.image = `${root}/slider/img/${serverImage.data.name}`
      }
      return axios.patch(`${root}/slider/${slider.id}`, slider)
    },
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
