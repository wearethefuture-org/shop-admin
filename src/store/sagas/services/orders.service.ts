import { api } from '../../../api/api';

export async function apiGetOrders(page: number, limit: number) {
  const orders = await api.orders.get(page, limit);
  return orders.data;
}

export async function apiGetOrderById(id: number) {
  const order = await api.orders.getById(id);
  return order.data;
}

export async function apiGetOrderByRange(datesArray: string[]) {
  const order = await api.orders.getByDatesRange(datesArray);
  return order.data;
}

export async function apiUpdateOrder(orderId: number, productId: number, data) {
  const order = await api.orders.update(orderId, productId, data);
  return order.data;
}

export async function apiUpdateOrderStatus(id: number, status) {
  const order = await api.orders.updateStatus(id, status);
  return order.data;
}

export async function apiGetOrdersByParams(page: number, limit: number, searchValue: string) {
  const order = await api.orders.getByParams(page, limit, searchValue);
  return order.data;
}

export async function apiUpdateProductInOrder(data) {
  const order = await api.orders.updateProductInOrder(data);
  return order.data;
}
