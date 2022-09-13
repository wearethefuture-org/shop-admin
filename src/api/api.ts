import { AxiosResponse } from 'axios';

import { IResponseMessage, IUsersStatistic } from './../interfaces/IUsers';

import {
  IGetTreeCategoriesResponse,
  ITreeCategory,
  IAddTreeCategory,
  IDisableEnableCategory,
} from '../interfaces/ITreeCategory';

import {
  IAddCharResponse,
  IAddImgResponse,
  IAddProduct,
  IGetProductById,
  IGetProducts,
  IProductCharRequest,
  IUpdateProduct,
  IUpdateAvailabilityProduct,
  IDisableProduct,
  IDeleteProductChars,
  IProductsFilter,
} from '../interfaces/IProducts';
import { ISearchItems, ISearchItemsResponse } from '../interfaces/ISearch';
import { IBasicOrder, IStatisticOrders } from '../interfaces/IOrders';
import { TreeCategory } from '../pages/TreeCategories/TreeCategoryInfo/treeCategoryReducer';

import { IActions, IActionsImage } from '../interfaces/actions';
import { ISettingsItem } from '../interfaces/ISettings';
import { ISlideItem, ISlideUpdateValues, ISlideVisibility } from '../interfaces/ISlides';
import { ICommentResponse, ICommentsDateRange } from '../interfaces/IComment';
import { IFeedbackResponse } from '../interfaces/IFeedback';
import {
  IUserReqAdd,
  IAuthResponse,
  IUserReqUp,
  IUserCreeds,
  IUserItem,
  IUsersData,
  IuserConfirmEmail,
} from '../interfaces/IUsers';
import instance from './axios-interceptors';
import { Status } from '../enums/orderStatus';
import { IRole } from '../interfaces/IRoles';
import { ISliderAnimation, ISliderAnimations } from '../interfaces/ISliderAnimations';
import { IInvoice, IInvoiceDateRange } from '../interfaces/IInvoice';

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  treeCategories: {
    get: () => FetchedDataType<IGetTreeCategoriesResponse>;
    getById: (id: number) => FetchedDataType<IGetTreeCategoriesResponse>;
    add: (category: IAddTreeCategory) => FetchedDataType<ITreeCategory>;
    delete: (id: number) => FetchedDataType<JSON>;
    update: (data: TreeCategory) => FetchedDataType<IGetTreeCategoriesResponse>;
    disableEnable: (data: IDisableEnableCategory) => FetchedDataType<ITreeCategory>;
  };

  products: {
    get: (
      page: number,
      limit: number,
      sort: string,
      sortDirect: string,
      filter: IProductsFilter
    ) => FetchedDataType<IGetProducts>;
    getById: (id: number) => FetchedDataType<IGetProductById>;
    add: (product: IAddProduct) => FetchedDataType<IGetProductById>;
    update: (product: IUpdateProduct) => FetchedDataType<IGetProductById>;
    updateImg: (data: FormData) => FetchedDataType<IAddImgResponse>;
    updateMainImg: (data: { productId: number; imgName: string }) => FetchedDataType<IGetProductById>;
    deleteImg: (imgName: string) => FetchedDataType<IGetProductById>;
    deleteProduct: (id: number) => FetchedDataType<JSON>;
    addProductCharValues: (data: IProductCharRequest) => FetchedDataType<IAddCharResponse>;
    updateProductCharValues: (data: IProductCharRequest) => FetchedDataType<IAddCharResponse>;
    deleteProductCharValues: (data: IDeleteProductChars) => FetchedDataType<JSON>;
    updateAvailabilityProduct: (data: IUpdateAvailabilityProduct) => FetchedDataType<IAddCharResponse>;
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
    update: (
      orderId: number,
      productId: number,
      data: { quantity?: number; color?: string; size?: string }
    ) => FetchedDataType<IBasicOrder>;
    getById: (id: number) => FetchedDataType<IBasicOrder>;
    getByParams: (page: number, limit: number, searchValue: string) => FetchedDataType<IBasicOrder>;
    getByDatesRange: (datesArray: string[]) => FetchedDataType<IStatisticOrders[]>;
    updateProductInOrder: (data) => FetchedDataType<IBasicOrder>;
  };

  comments: {
    get: (page: number, limit: number) => FetchedDataType<ICommentResponse>;
    getByDatesRange: (datesArray: string[]) => FetchedDataType<ICommentsDateRange[]>;
    delete: (id: number) => FetchedDataType<JSON>;
  };

  feedbacks: {
    get: (page: number, limit: number) => FetchedDataType<IFeedbackResponse>;
    delete: (id: number) => FetchedDataType<JSON>;
  };

  users: {
    get: (page: number, limit: number, sort: string, sortDirect: string) => FetchedDataType<IUsersData>;
    getByDatesRange: (datesArray: string[]) => FetchedDataType<IUsersStatistic>;
  };
  user: {
    auth: (user: IUserCreeds) => FetchedDataType<IAuthResponse>;
    get: () => FetchedDataType<IUsersData>;
    add: (user: IUserReqAdd) => FetchedDataType<IUserItem>;
    update: (user: IUserReqUp) => FetchedDataType<IUserItem>;
    delete: (id: number) => FetchedDataType<JSON>;
    requestPasswordInstall: (data: { email: string }) => FetchedDataType<IResponseMessage>;
    updateUserData: (userData: IUserReqUp) => FetchedDataType<IUserReqUp>;
    deleteAvatar: () => FetchedDataType<IResponseMessage>;
    addAvatar: (data) => FetchedDataType<IResponseMessage>;
    confirmEmail: (data: IuserConfirmEmail) => FetchedDataType<JSON>;
  };
  roles: {
    get: () => FetchedDataType<IRole[]>;
  };
  search: {
    getSearchItems: (fields: ISearchItems) => FetchedDataType<ISearchItemsResponse>;
  };
  sliderAnimations: {
    getSliderAnimations: () => FetchedDataType<ISliderAnimations>;
    getActiveSliderAnimation: () => FetchedDataType<ISliderAnimation>;
    changeActiveSliderAnimation: (id: number, isActive: boolean) => FetchedDataType<ISliderAnimation>;
  };

  invoice: {
    getInvoicesList: () => FetchedDataType<IInvoice[]>;
    removeInvoice: (name: string) => FetchedDataType<JSON>;
    generateInvoice: (invoiceDateRange: IInvoiceDateRange) => FetchedDataType<JSON>;
    getInvoiceFile: (name: string) => FetchedDataType<Blob>;
  };
};

export const api: ApiFetchedDataType = {
  treeCategories: {
    get: () => instance.get('/category/tree'),
    getById: (id) => instance.get(`/category/tree/${id}`),
    add: (category) => instance.post('/category/tree', category),
    update: (data) => instance.patch('/category/tree', data),
    disableEnable: (data) => instance.patch('/category/tree/disablecategories', data),
    delete: (id) => instance.delete(`/category/tree/${id}`),
  },

  products: {
    get: (page, limit, sort, sortDirect, filter) =>
      instance.get(
        `/product/admin?page=${page}&limit=${limit}&sort=${sort}&sortDirect=${sortDirect}&filterId=${filter.id}&filterName=${filter.name}&filterCategory=${filter.category}&filterPrice=${filter.price}&filterShop=${filter.shop}`
      ),
    getById: (id) => instance.get(`/product/${id}`),
    add: (product) => instance.post('/product', product),
    updateImg: (data) => instance.post('/product/multipleimages', data),
    addProductCharValues: (data) => instance.post('/characteristics-values', data),
    update: ({ id, ...product }) => instance.patch(`/product/${id}`, product),
    updateMainImg: (data) => instance.patch('/product/img/preview', data),
    updateProductCharValues: (data) => instance.patch('/characteristics-values', data),
    updateAvailabilityProduct: ({ productId, ...product }) =>
      instance.patch(`/product/${productId}`, product),
    disableProduct: ({ productId, ...product }) => instance.patch(`/product/${productId}`, product),
    deleteProductCharValues: (data) => instance.delete('/characteristics-values', { data }),
    deleteImg: (imgName) => instance.delete(`/product/img/${imgName}`),
    deleteProduct: (id) => instance.delete(`/product/${id}`),
  },

  slides: {
    get: () => instance.get('/slide'),
    add: (slide) => instance.post('/slide', slide),
    update: (slide) => instance.patch(`/slide/${slide.id}`, slide.body),
    updateVisibility: (slide) => instance.patch(`/slide/visibility/${slide.id}`, { isShown: slide.isShown }),
    delete: (slide) => instance.delete(`/slide/${slide.id}`),
  },

  settings: {
    get: () => instance.get('/parameters'),
    put: (settings) => instance.put('/parameters', settings),
  },

  orders: {
    get: (page, limit) => instance.get(`/orders?page=${page}&limit=${limit}`),
    getById: (id) => instance.get(`/orders/${id}`),
    getByParams: (page, limit, searchValue) =>
      instance.get(`/orders/params?page=${page}&limit=${limit}&searchValue=${searchValue}`),
    getByDatesRange: (datesArray: string[]) =>
      instance.get(`/orders/statistic?dateRange[0]=${datesArray[0]}&dateRange[1]=${datesArray[1]}`),
    updateStatus: (id, status) => instance.patch(`/orders/status/${id}`, status),
    update: (orderId, productId, data) => instance.put(`/orders/${orderId}/${productId}`, data),
    updateProductInOrder: (data) => instance.put('/orders/product/', data),
  },

  users: {
    get: (page, limit, sort, sortDirect) =>
      instance.get(`/users?page=${page}&limit=${limit}&sort=${sort}&sortDirect=${sortDirect}`),
    getByDatesRange: (datesArray: string[]) =>
      instance.get(`/users/statistic?dateRange[0]=${datesArray[0]}&dateRange[1]=${datesArray[1]}`),
  },

  user: {
    get: () => instance.get('/users/profile'),
    auth: (user) => instance.post('/auth/admin/login', user),
    add: (user) => instance.post('/auth/register-through-admin', user),
    addAvatar: (data) => instance.post('users/avatar', data),
    confirmEmail: (data) => instance.post('users/changeEmail', data),
    requestPasswordInstall: (email) => instance.post('/users/password/reset', email),
    updateUserData: (userData) => instance.patch('/users/update', userData),
    update: ({ id, ...user }) => instance.put(`/users/${id}`, user),
    delete: (id) => instance.delete(`/users/${id}`),
    deleteAvatar: () => instance.delete('users/avatar'),
  },
  comments: {
    get: (page, limit) => instance.get(`/comments?page=${page}&limit=${limit}`),
    getByDatesRange: (datesArray: string[]) =>
      instance.get(`/comments/statistic?dateRange[0]=${datesArray[0]}&dateRange[1]=${datesArray[1]}`),
    delete: (id) => instance.delete(`/comments/admin/${id}`),
  },
  feedbacks: {
    get: (page, limit) => instance.get(`/feedbacks?page=${page}&limit=${limit}`),
    delete: (id) => instance.delete(`/feedbacks/admin/${id}`),
  },
  roles: {
    get: () => instance.get('/roles'),
  },
  search: {
    getSearchItems: (fields) =>
      instance.get(
        `/search/admin?${fields.option}=${fields.query}&page=${fields.page}&limit=${fields.limit}`
      ),
  },
  sliderAnimations: {
    getSliderAnimations: () => instance.get('/slider-animations'),
    getActiveSliderAnimation: () => instance.get('/slider-animations/active'),
    changeActiveSliderAnimation: (id: number, isActive: boolean) =>
      instance.patch(`/slider-animations/change-active/${id}/${isActive}`),
  },
  invoice: {
    getInvoicesList: () => instance.get('/invoice/all'),
    getInvoiceFile: (name: string) => instance.get(`/invoice/${name}`, { responseType: 'blob' }),
    generateInvoice: (invoiceDateRange: IInvoiceDateRange) => instance.post('/invoice', invoiceDateRange),
    removeInvoice: (name: string) => instance.delete(`/invoice/${name}`),
  },
};
