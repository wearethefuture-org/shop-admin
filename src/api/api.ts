import { root } from './config';
import axios, { AxiosResponse } from 'axios';
import { ICategoryItem } from '../interfaces/category-Item';
import { IActions } from '../interfaces/actions';

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
	categories: {
      get: () => FetchedDataType<ICategoryItem>;
      add: (category: IActions) => FetchedDataType<ICategoryItem>;
   }
};

export const api: ApiFetchedDataType = {
	categories: {
      get: () => axios.get(`${root}/category`),
      add: (category) => axios.post(`${root}/category`, category)
      },
};
