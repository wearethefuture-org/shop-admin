import { api } from '../../../api/api';
import { IAddProduct } from '../../../interfaces/IProducts';

export async function apiGetLotteries() {
  const lotteries = await api.lottery.getAllLottery();
  return lotteries.data
}

export async function apiGetProductById(id: number) {
  const product = await api.products.getById(id);
  return product.data;
}

export async function apiAddProduct(productValues: IAddProduct) {
  const product = await api.products.add(productValues);
  return product.data;
}

export async function apiUpdateProduct(productValues: any) {
  const updatedProduct = await api.products.update(productValues);
  return updatedProduct && updatedProduct.data;
}