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
  IDisableProduct,
} from '../interfaces/IProducts';
import { IBasicOrder } from '../interfaces/IOrders';
import { MainCategory } from '../pages/MainCategories/MainCategoryInfo/mainCategoryReducer';
import { Category } from '../pages/Categories/CategoryInfo/categoryReducer';

import { IActions, IActionsImage } from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { ISlideItem, ISlideUpdateValues, ISlideVisibility } from '../interfaces/ISlides';
import { ICommentResponse } from '../interfaces/IComment';
import { IFeedbackResponse } from '../interfaces/IFeedback';
import {
  IUserReqAdd,
  IAuthResponse,
  IUserReqUp,
  IUserCreeds,
  IUserItem,
  IUsersData,
} from '../interfaces/IUsers';
import instance from './axios-interceptors';
import { Status } from '../enums/orderStatus';
import { IRole } from '../interfaces/IRoles';

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
    get: (page: number, limit: number) => FetchedDataType<IGetProducts>;
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
    updateAvailabilityProduct: (
      data: IUpdateAvailabilityProduct
    ) => FetchedDataType<IAddCharResponse>;
    disableProduct: (data: IDisableProduct) => FetchedDataType<IAddCharResponse>;
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
    get: (page: number, limit: number) => FetchedDataType<IBasicOrder>;
    updateStatus: (id: number, status: Status) => FetchedDataType<IBasicOrder>;
    updateQuantity: (
      orderId: number,
      productId: number,
      quantity: number
    ) => FetchedDataType<IBasicOrder>;
    getById: (id: number) => FetchedDataType<IBasicOrder>;
  };

  comments: {
    get: (page: number, limit: number) => FetchedDataType<ICommentResponse>;
    delete: (id: number) => FetchedDataType<JSON>;
  };

  feedbacks: {
    get: (page: number, limit: number) => FetchedDataType<IFeedbackResponse>;
    delete: (id: number) => FetchedDataType<JSON>;
  };

  users: {
    get: (page: number, limit: number) => FetchedDataType<IUsersData>;
  };
  user: {
    auth: (user: IUserCreeds) => FetchedDataType<IAuthResponse>;
    get: () => FetchedDataType<IUsersData>;
    add: (user: IUserReqAdd) => FetchedDataType<IUserItem>;
    update: (user: IUserReqUp) => FetchedDataType<IUserItem>;
    delete: (id: number) => FetchedDataType<JSON>;
  };
  roles: {
    get: () => FetchedDataType<IRole[]>;
  };
};

export const api: ApiFetchedDataType = {
  mainCategories: {
    get: () => instance.get(`${root}/mainCategory`),
    add: (mainCategory) => instance.post(`${root}/mainCategory`, mainCategory),
    getById: (id) => instance.get(`${root}/mainCategory/${id}`),
    update: (data) => instance.patch(`${root}/mainCategory`, data),
  },

  categories: {
    get: () => instance.get(`${root}/category`),
    add: (category) => instance.post(`${root}/category`, category),
    getById: (id) => instance.get(`${root}/category/${id}`),
    update: (data) => instance.patch(`${root}/category`, data),
  },

  products: {
    get: (page, limit) => instance.get(`${root}/product/admin?page=${page}&limit=${limit}`),
    add: (product) => instance.post(`${root}/product`, product),
    getById: (id) => instance.get(`${root}/product/${id}`),
    update: ({ id, ...product }) => instance.patch(`${root}/product/${id}`, product),
    updateImg: (data) => instance.post(`${root}/product/multipleimages`, data),
    updateMainImg: (data) => instance.patch(`${root}/product/img/preview`, data),
    deleteImg: (imgName) => instance.delete(`${root}/product/img/${imgName}`),
    deleteProduct: (id) => instance.delete(`${root}/product/${id}`),
    getProductsInCart: () => instance.get(`${root}/products-in-cart`),
    addProductCharValues: (data) => instance.post(`${root}/characteristics-values`, data),
    updateProductCharValues: (data) => instance.patch(`${root}/characteristics-values`, data),
    updateAvailabilityProduct: ({ productId, ...product }) =>
      instance.patch(`${root}/product/${productId}`, product),
    disableProduct: ({ productId, ...product }) =>
      instance.patch(`${root}/product/${productId}`, product),
  },

  slides: {
    get: () => instance.get(`${root}/slide`),
    add: (slide) => instance.post(`${root}/slide`, slide),
    update: (slide) => instance.patch(`${root}/slide/${slide.id}`, slide.body),
    updateVisibility: (slide) =>
      instance.patch(`${root}/slide/visibility/${slide.id}`, { isShown: slide.isShown }),
    delete: (slide) => instance.delete(`${root}/slide/${slide.id}`),
  },

  settings: {
    get: () => instance.get(`${root}/parameters`),
    put: (settings) => instance.put(`${root}/parameters`, settings),
  },

  orders: {
    get: (page, limit) => instance.get(`${root}/orders?page=${page}&limit=${limit}`),
    getById: (id) => instance.get(`${root}/orders/${id}`),
    updateStatus: (id, status) => instance.patch(`${root}/orders/status/${id}`, status),
    updateQuantity: (orderId, productId, quantity) =>
      instance.put(`${root}/orders/${orderId}/${productId}`, quantity),
  },

  users: {
    get: (page, limit) => instance.get(`${root}/users?page=${page}&limit=${limit}`),
  },

  user: {
    auth: (user) => instance.post(`${root}/auth/admin/login`, user),
    get: () => instance.get(`${root}/users/profile`),
    update: ({ id, ...user }) => instance.put(`${root}/users/${id}`, user),
    delete: (id) => instance.delete(`${root}/users/${id}`),
    add: (user) => instance.post(`${root}/auth/register-through-admin`, user),
  },
  comments: {
    get: (page, limit) => instance.get(`${root}/comments?page=${page}&limit=${limit}`),
    delete: (id) => instance.delete(`${root}/comments/admin/${id}`),
  },
  feedbacks: {
    get: (page, limit) => instance.get(`${root}/feedbacks?page=${page}&limit=${limit}`),
    delete: (id) => instance.delete(`${root}/feedbacks/admin/${id}`),
  },
  roles: {
    get: () => instance.get(`${root}/roles`),
  },
};
