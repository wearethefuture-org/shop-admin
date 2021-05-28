import { IBasicProduct } from './IProducts';

export interface Common {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBasicOrder extends Common {
  userId: number;
  status: string;
  amount: number;
}

export interface IProductToOrder {
  id: number;
  product: IBasicProduct;
}

export interface IGetOrders extends IBasicOrder {
  productToOrder: Array<IProductToOrder>;
  user: object;
}

export interface IOrdersData {
  list: Array<IGetOrders>;
  loading: boolean;
  currentOrder: IGetOrders | any;
  error: string | null;
  count: number,
  totalPages: number,
}
