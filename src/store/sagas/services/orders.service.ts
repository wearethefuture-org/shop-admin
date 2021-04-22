import { api } from '../../../api/api';

export async function apiGetOrders() {
  const orders = await api.orders.get();
  return orders.data;
}

export async function apiGetOrderById(id: number) {
  const order = await api.orders.getById(id);
  return order.data;
}

export async function apiUpdateOrderQuantity(orderId: number, productId: number, quantity: number) {
  const order = await api.orders.updateQuantity(orderId, productId, quantity);
  return order.data;
}

export async function apiUpdateOrderStatus(id: number, status) {
  const order = await api.orders.updateStatus(id, status);
  return order.data;
}
