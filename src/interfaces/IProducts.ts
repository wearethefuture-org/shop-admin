export interface IImg {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  url: string;
}

export interface ICategory {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  key: string;
  description: string;
  characteristics: any[];
}

export interface IProductItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  description: string;
  category: ICategory;
  files?: IImg[];
  key: string;
  mainImg?: IImg;
}

export interface IProductsData {
  list: Array<IProductItem>;
  loading: boolean;
  currentProduct: IProductItem | null;
  error: string | null;
}

export interface IProductFormData {
  name: string;
  price: string;
  description: string;
  categoryName: string;
  key: string;
  files: [] | string[] | FormData;
}
