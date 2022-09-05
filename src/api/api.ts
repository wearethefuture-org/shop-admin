import { AxiosResponse } from 'axios';

import { IResponseMessage, IUsersStatistic } from './../interfaces/IUsers';
import { root } from './config';

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
    get: () => instance.get(`${root}/category/tree`),
    getById: (id) => instance.get(`${root}/category/tree/${id}`),
    add: (category) => instance.post(`${root}/category/tree`, category),
    delete: (id) => instance.delete(`${root}/category/tree/${id}`),
    update: (data) => instance.patch(`${root}/category/tree`, data),
    disableEnable: (data) => instance.patch(`${root}/category/tree/disablecategories`, data),
  },

  products: {
    get: (page, limit, sort, sortDirect, filter) =>
      instance.get(
        `${root}/product/admin?page=${page}&limit=${limit}&sort=${sort}&sortDirect=${sortDirect}&filterId=${filter.id}&filterName=${filter.name}&filterCategory=${filter.category}&filterPrice=${filter.price}&filterShop=${filter.shop}`
      ),
    add: (product) => instance.post(`${root}/product`, product),
    getById: (id) => instance.get(`${root}/product/${id}`),
    update: ({ id, ...product }) => instance.patch(`${root}/product/${id}`, product),
    updateImg: (data) => instance.post(`${root}/product/multipleimages`, data),
    updateMainImg: (data) => instance.patch(`${root}/product/img/preview`, data),
    deleteImg: (imgName) => instance.delete(`${root}/product/img/${imgName}`),
    deleteProduct: (id) => instance.delete(`${root}/product/${id}`),
    addProductCharValues: (data) => instance.post(`${root}/characteristics-values`, data),
    updateProductCharValues: (data) => instance.patch(`${root}/characteristics-values`, data),
    deleteProductCharValues: (data) => instance.delete(`${root}/characteristics-values`, { data }),

    updateAvailabilityProduct: ({ productId, ...product }) =>
      instance.patch(`${root}/product/${productId}`, product),
    disableProduct: ({ productId, ...product }) => instance.patch(`${root}/product/${productId}`, product),
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
    update: (orderId, productId, data) => instance.put(`${root}/orders/${orderId}/${productId}`, data),
    getByParams: (page, limit, searchValue) =>
      instance.get(`${root}/orders/params?page=${page}&limit=${limit}&searchValue=${searchValue}`),
    getByDatesRange: (datesArray: string[]) =>
      instance.get(`${root}/orders/statistic?dateRange[0]=${datesArray[0]}&dateRange[1]=${datesArray[1]}`),
    updateProductInOrder: (data) => instance.put(`${root}/orders/product/`, data),
  },

  users: {
    get: (page, limit, sort, sortDirect) => instance.get(`${root}/users?page=${page}&limit=${limit}&sort=${sort}&sortDirect=${sortDirect}`),
    getByDatesRange: (datesArray: string[]) =>
      instance.get(`${root}/users/statistic?dateRange[0]=${datesArray[0]}&dateRange[1]=${datesArray[1]}`),
  },

  user: {
    auth: (user) => instance.post(`${root}/auth/admin/login`, user),
    get: () => instance.get(`${root}/users/profile`),
    update: ({ id, ...user }) => instance.put(`${root}/users/${id}`, user),
    delete: (id) => instance.delete(`${root}/users/${id}`),
    add: (user) => instance.post(`${root}/auth/register-through-admin`, user),
    requestPasswordInstall: (email) => instance.post(`${root}/users/password/reset`, email),
    updateUserData: (userData) => instance.patch(`${root}/users/update`, userData),
    deleteAvatar: () => instance.delete('users/avatar'),
    addAvatar: (data) => instance.post('users/avatar', data),
    confirmEmail: (data) => instance.post('users/changeEmail', data),
  },
  comments: {
    get: (page, limit) => instance.get(`${root}/comments?page=${page}&limit=${limit}`),
    getByDatesRange: (datesArray: string[]) =>
      instance.get(`${root}/comments/statistic?dateRange[0]=${datesArray[0]}&dateRange[1]=${datesArray[1]}`),
    delete: (id) => instance.delete(`${root}/comments/admin/${id}`),
  },
  feedbacks: {
    get: (page, limit) => instance.get(`${root}/feedbacks?page=${page}&limit=${limit}`),
    delete: (id) => instance.delete(`${root}/feedbacks/admin/${id}`),
  },
  roles: {
    get: () => instance.get(`${root}/roles`),
  },
  search: {
    getSearchItems: (fields) =>
      instance.get(
        `${root}/search/admin?${fields.option}=${fields.query}&page=${fields.page}&limit=${fields.limit}`
      ),
  },
  sliderAnimations: {
    getSliderAnimations: () => instance.get(`${root}/slider-animations`),
    getActiveSliderAnimation: () => instance.get(`${root}/slider-animations/active`),
    changeActiveSliderAnimation: (id: number, isActive: boolean) =>
      instance.patch(`${root}/slider-animations/change-active/${id}/${isActive}`),
  },
  invoice: {
    getInvoicesList: () => instance.get(`${root}/invoice/all`),
    removeInvoice: (name: string) => instance.delete(`${root}/invoice/${name}`),
    generateInvoice: (invoiceDateRange: IInvoiceDateRange) =>
      instance.post(`${root}/invoice`, invoiceDateRange),
    getInvoiceFile: (name: string) =>
      instance.get(`${root}/invoice/${name}`, {
        responseType: 'blob',
      }),
  },
};
