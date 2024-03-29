import { ITreeCategory, ICharResponse } from './ITreeCategory';

export interface Common {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBasicProduct extends Common {
  name: string;
  key: string;
  description: string;
  price: number;
  availability: boolean;
  disabled: boolean;
  characteristicValue: ICharResponse[];
}

export interface GeneralProductInfo {
  name: string;
  description: string;
  price: number | string;
  categoryName: string;
  categoryId: number | string;
  key: string;
}

export interface IGetProducts extends IBasicProduct {
  category: ITreeCategory;
  files: IImg[];
  mainImg: IImg | null;
}

export interface IImg extends Common {
  name: string;
  url: string;
}

export interface IGetProductById extends IGetProducts {
  characteristicValue: ICharResponse[];
}

export interface IProductsSearchResponse {
  data: IGetProducts[];
  count: number;
  totalPages: number;
}

interface GroupChar extends Common {
  name: string;
}

export interface IAddCharResponse extends Common {
  name: string;
  type: string;
  stringValue: string | null;
  numberValue: number | null;
  enumValue: string[] | null;
  booleanValue: boolean | null;
  jsonValue: object | null;
  dateValue: string | null;
  characteristic: ICharResponse;
  group: GroupChar;
  product: IBasicProduct;
}

export interface IAddProduct extends GeneralProductInfo {
  files?: [] | FormData;
  subForm?: object;
}

export interface IUpdateProduct {
  id?: number;
  files: IImg[] | {};
  subForm?: object;
}

export interface IProductItem extends IBasicProduct {
  category: ITreeCategory;
  files?: IImg[];
  mainImg?: IImg;
}

export interface IProductsData {
  list: Array<IGetProducts>;
  loading: boolean;
  currentProduct: IGetProductById | null;
  error: string | null;
  count: number;
  totalPages: number;
  isSearch: boolean;
  paginationPage: number;
  paginationLimit: number;
  searchValue: null | string;
  paginationPageSearch: number;
  sort: string;
  sortDirect: string;
  findPrice: number[];
  filter: IProductsFilter;
}

export interface CharValues {
  name: string;
  stringValue?: string | null;
  numberValue?: number | null;
  enumValue?: string[] | null;
  rangeValue?: number[] | null;
  booleanValue?: boolean | null;
  jsonValue?: object | null;
  dateValue?: string | null;
}

export interface ICharValue extends CharValues {
  id?: number;
  characteristicId: number;
}

export interface IProductCharResponse extends Common, CharValues {
  type: string;
}

export interface IProductCharRequest {
  productId: number;
  characteristicValues: ICharValue[];
}

export interface IDeleteProductChars {
  characteristicValuesIds: string[];
}

export interface IAddImgResponse extends Common {
  name: string;
  product: IBasicProduct;
  url: string;
}

export interface IProductsInCart extends Common {
  quantity: number;
  productId: number;
  ordersId: number;
  orders: {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    status: string;
    notcall: boolean;
  }[];
  product: IGetProducts;
}

export enum Type {
  enum = 'enum',
  json = 'json',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  range = 'range',
  date = 'date',
}

export interface IProductsFilter {
  id?: null | number
  name?: string
  shop?: string
  price: number[]
  category?: string
}

export interface ProductsTableProps {
  list: IGetProducts[];
  activeColumns: string[];
  isSearch: boolean;
  count: number;
  paginationPage: number;
  paginationLimit: number;
  sort: string;
  sortDirect: string;
  filter: IProductsFilter;
}

export interface IUpdateAvailabilityProduct {
  productId: number;
  availability: boolean;
  categoryId: number;
}

export interface IDisableProduct {
  productId: number;
  disabled: boolean;
  categoryId: number;
}
