import { root } from "./config";
import axios, { AxiosResponse } from "axios";
import { ICategoryItem } from "../interfaces/category-Item";
import { IActions } from "../interfaces/actions";
import { ISettingsItem } from "../interfaces/ISettings";

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  categories: {
    get: () => FetchedDataType<ICategoryItem>;
    add: (category: IActions) => FetchedDataType<ICategoryItem>;
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

  settings: {
    get: () => axios.get(`${root}/parameters`),
    put: (settings) => axios.put(`${root}/parameters`, settings),
  },
};
