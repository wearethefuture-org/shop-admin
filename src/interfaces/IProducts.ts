import { IActions } from './actions';
import { Dispatch } from 'redux';

export interface IProductItem {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  price: number,
  description: string,
  category: any,
  files?: Array<any>,
  key: string | undefined,
  mainImg: any,
}

export interface IProductsData {
  list: Array<IProductItem>,
  loading: boolean
}

export interface ProductTableData {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
  price: number,
  description: string,
  category: any,
  key: string | undefined,
  mainImg: any,
  files?: Array<any>,
};

export interface IProductFormData {
  name: string,
  price: number,
  description: string,
  categoryName: string,
  key: string | undefined,
  files?: Array<any>,
  mainImg: any,
  url_key: string | undefined;
  images: FileList;
}
export interface InnerProductFormProps {
  currencies: Array<any>;
  handleClose: () => void;
  buttonName: string;
  id: number;
}


export interface ProductFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  currencies: Array<any>;
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName?: string;
  buttonName: string;
  fetchFun: (...props: any) => IActions;
  files?: Array<any>;
  url_key: string | undefined;
  mainImg: any;
  images: FileList;
}