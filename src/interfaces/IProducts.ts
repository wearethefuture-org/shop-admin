import { Dispatch } from 'redux';

import { IActions } from './actions';

export interface IProductItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  description: string;
  category: any;
  files?: Array<any>;
  key: string | undefined;
  mainImg?: any;
}

export interface IProductsData {
  list: Array<IProductItem>;
  loading: boolean;
  currentProduct: IProductItem | null;
  error: string | null;
}

export interface ProductTableData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  description: string;
  category: any;
  key: string | undefined;
  mainImg?: any;
  files?: Array<any>;
}

export interface IProductFormData {
  name: string;
  price: number;
  description: string;
  categoryName: string;
  key: string | undefined;
  files: FormData;
  mainImg: any;
  // images: [];
  // images: FormData;
}
export interface InnerProductFormProps {
  currencies: Array<any>;
  handleClose: () => void;
  buttonName: string;
  id: number;
}

export interface ProductFormProps {
  dispatch: Dispatch;
  toggleModal: () => void;
  categories: Array<any>;
  editMode: boolean;
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName?: string;
  fetchFun: (...props: any) => IActions;
  files: FormData;
  url_key: string | undefined;
  mainImg: any | undefined;
}
