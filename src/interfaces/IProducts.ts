import { GeneralCategory, ICharResponse } from './ICategory';

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
}

export interface GeneralProductInfo {
  name: string;
  description: string;
  price: number | string;
  categoryName: string;
  key: string;
}

export interface IGetProducts extends IBasicProduct {
  category: GeneralCategory;
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
  category: GeneralCategory;
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

export interface ProductsTableProps {
  list: IGetProducts[];
  activeColumns: string[];
  isSearchEnabled: boolean;
  searchValue: string;
}

export interface IUpdateAvailabilityProduct {
  productId: number;
  availability: boolean;
  categoryName: string;
}

export interface IDisableProduct {
  productId: number;
  disabled: boolean;
  categoryName: string;
}
