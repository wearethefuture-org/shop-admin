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
  file?: Array<any>
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
  file?: Array<any>
};

export interface IProductFormData {
  name: string,
  price: number,
  description: string,
  categoryName: string
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
}