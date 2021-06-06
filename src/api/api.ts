import { root } from './config';
import { AxiosResponse } from 'axios';

import {
  IAddMainCategory,
  GeneralMainCategory,
  IMainCategoryResponse,
  IGetMainCategoriesResponse,
} from '../interfaces/IMainCategory';

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
  IUpdateAvailabilityProduct,
} from '../interfaces/IProducts';

import { MainCategory } from '../pages/MainCategories/MainCategoryInfo/mainCategoryReducer';
import { Category } from '../pages/Categories/CategoryInfo/categoryReducer';

import { IActions, IActionsImage } from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { ISlideItem, ISlideUpdateValues, ISlideVisibility } from '../interfaces/ISlides';
import { ICommentResponse } from '../interfaces/IComment';
import {
  IUserReqAdd,
  IAuthResponse,
  IUserReqUp,
  IUserCreeds,
  IUserItem,
  IUsersData,
} from '../interfaces/IUsers';
import instance from './axios-interceptors';

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  mainCategories: {
    get: () => FetchedDataType<IGetMainCategoriesResponse>;
    add: (mainCategory: IAddMainCategory) => FetchedDataType<GeneralMainCategory>;
    getById: (id: number) => FetchedDataType<IMainCategoryResponse>;
    update: (data: MainCategory) => FetchedDataType<IMainCategoryResponse>;
  };

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
    updateAvailabilityProduct: (data: IUpdateAvailabilityProduct) => FetchedDataType<IAddCharResponse>;
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

  comments: {
    get: (page: number, limit: number) => FetchedDataType<ICommentResponse>;
    delete: (id: number) => FetchedDataType<JSON>;
  };
  users: {
    get: () => FetchedDataType<IUsersData>;
  };
  user: {
    auth: (user: IUserCreeds) => FetchedDataType<IAuthResponse>;
    get: () => FetchedDataType<IUsersData>;
    add: (user: IUserReqAdd) => FetchedDataType<IUserItem>;
    update: (user: IUserReqUp) => FetchedDataType<IUserItem>;
    delete: (id: number) => FetchedDataType<JSON>;
  };
};

export const api: ApiFetchedDataType = {
  mainCategories: {
    get: () => instance.get(`${ root }/mainCategory`),
    add: (mainCategory) => instance.post(`${ root }/mainCategory`, mainCategory),
    getById: (id) => instance.get(`${ root }/mainCategory/${ id }`),
    update: (data) => instance.patch(`${ root }/mainCategory`, data),
  },

  categories: {
    get: () => instance.get(`${ root }/category`),
    add: (category) => instance.post(`${ root }/category`, category),
    getById: (id) => instance.get(`${ root }/category/${ id }`),
    update: (data) => instance.patch(`${ root }/category`, data),
  },

  products: {
    get: () => instance.get(`${ root }/product`),
    add: (product) => instance.post(`${ root }/product`, product),
    getById: (id) => instance.get(`${ root }/product/${ id }`),
    update: ({ id, ...product }) => instance.patch(`${ root }/product/${ id }`, product),
    updateImg: (data) => instance.post(`${ root }/product/multipleimages`, data),
    updateMainImg: (data) => instance.patch(`${ root }/product/img/preview`, data),
    deleteImg: (imgName) => instance.delete(`${ root }/product/img/${ imgName }`),
    deleteProduct: (id) => instance.delete(`${ root }/product/${ id }`),
    getProductsInCart: () => instance.get(`${ root }/products-in-cart`),
    addProductCharValues: (data) => instance.post(`${ root }/characteristics-values`, data),
    updateProductCharValues: (data) => instance.patch(`${ root }/characteristics-values`, data),
    updateAvailabilityProduct: (data) => instance.post(`${ root }/product/updateAvailabilityProduct`, data),
  },

  slides: {
    get: () => instance.get(`${ root }/slide`),
    add: (slide) => instance.post(`${ root }/slide`, slide),
    update: (slide) => instance.patch(`${ root }/slide/${ slide.id }`, slide.body),
    updateVisibility: (slide) =>
      instance.patch(`${ root }/slide/visibility/${ slide.id }`, { isShown: slide.isShown }),
    delete: (slide) => instance.delete(`${ root }/slide/${ slide.id }`),
  },

  settings: {
    get: () => instance.get(`${ root }/parameters`),
    put: (settings) => instance.put(`${ root }/parameters`, settings),
  },

  users: {
    get: () => instance.get(`${ root }/users`),
  },

  user: {
    auth: (user) => instance.post(`${ root }/auth/admin/login`, user),
    get: () => instance.get(`${ root }/users/profile`),
    update: ({ id, ...user }) => instance.patch(`${ root }/users/${ id }`, user),
    delete: (id) => instance.delete(`${ root }/users/${ id }`),
    add: (user) => instance.post(`${ root }/auth/register`, user),
  },
  comments: {
    get: (page, limit) => instance.get(`${ root }/comments?page=${ page }&limit=${ limit }`),
    delete: (id) => instance.delete(`${ root }/comments/admin/${ id }`),
  },
};
