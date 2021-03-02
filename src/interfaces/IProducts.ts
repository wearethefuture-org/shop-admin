import { IAddCategoryResponse, ICharResponse } from './ICategory';

export interface IBasicProduct {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  key: string;
  description: string;
  price: number;
}

export interface IGetProducts {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  key: string;
  description: string;
  price: number;
  category: IAddCategoryResponse;
  files: IImg[];
  mainImg: IImg | null;
}

export interface IImg {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  url: string;
}

export interface IGetProductById {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  key: string;
  description: string;
  price: number;
  category: IAddCategoryResponse;
  files: IImg[];
  mainImg: IImg | null;
  characteristicValue: ICharResponse[];
}

export interface IAddCharResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: string;
  stringValue: string | null;
  numberValue: number | null;
  enumValue: string[] | null;
  booleanValue: boolean | null;
  jsonValue: object | null;
  dateValue: string | null;
  characteristic: ICharResponse;
  group: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  };
  product: IBasicProduct;
}

export interface IAddProduct {
  name: string;
  description: string;
  price: number;
  categoryName: string;
  key: string;
  files?: [] | FormData;
  subForm?: object;
}

export interface IUpdateProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  key: string;
  files: IImg[] | {};
  subForm?: object;
}

export interface IProductItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  description: string;
  category: IAddCategoryResponse;
  files?: IImg[];
  key: string;
  mainImg?: IImg;
}

export interface IProductsData {
  list: Array<IGetProducts>;
  loading: boolean;
  currentProduct: IGetProductById | null;
  error: string | null;
}

export interface ICharValue {
  id?: number;
  name: string;
  stringValue?: string;
  numberValue?: number;
  enumValue?: string[];
  rangeValue?: number[];
  booleanValue?: boolean;
  jsonValue?: object;
  dateValue?: string;
  characteristicId: number;
}

export interface IProductCharResponse {
  id: number;
  name: string;
  stringValue?: string | null;
  numberValue?: number | null;
  enumValue?: string[] | null;
  rangeValue?: number[] | null;
  booleanValue?: boolean | null;
  jsonValue?: object | null;
  dateValue?: string | null;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductCharRequest {
  productId: number;
  characteristicValues: ICharValue[];
}

export interface IAddImgResponse {
  name: string;
  product: IBasicProduct;
  url: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductsInCart {
  id: number;
  createdAt: string;
  updatedAt: string;
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
