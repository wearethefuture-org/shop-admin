import { IBasicProduct } from './IProducts';
import { UserTableData, IOrderUser } from './IUsers';

export interface Common {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBasicOrder extends Common {
  userId: number;
  status: string;
  amount: number;
  delivery: IDelivery;
}

export interface IProductToOrder extends Common {
  quantity: number;
  amount: number;
  product: IBasicProduct;
  delivery: IDelivery;
}

export interface IDelivery {
  areaName: string;
  cityFullName: string;
  cityName: string;
  cityRef: string;
  streetName: string;
  streetRef: string;
  notcall: boolean;
}

export interface IGetOrders extends IBasicOrder {
  productToOrder: Array<IProductToOrder>;
  user: UserTableData;
  delivery: IDelivery;
  additionalNumber: string;
  notcall: boolean;
}

export interface IOrdersData {
  list: Array<IGetOrders>;
  loading: boolean;
  currentOrder: ICurrentOrder | null;
  error: string | null;
  count: number;
  totalPages: number;
}

export interface ICurrentOrder extends Common {
  status: string;
  amount: number;
  productToOrder: Array<IProductToOrder>;
  user: IOrderUser;
  additionalFirstName?: string;
  additionalLastName?: string;
  additionalEmail?: string;
  additionalNumber?: string;
  comment?: string;
  notcall?: boolean;
  delivery: IDelivery;
}
