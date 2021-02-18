import { api } from '../../../api/api';
import { IActions } from '../../../interfaces/actions';

export async function apiGetProducts() {
  const products = await api.products.get();
  return products.data;
}

export async function apiGetProductById(id: number) {
  const product = await api.products.getById(id);
  return product.data;
}

export async function apiAddProduct(data: any) {
  const product = await api.products.add(data);
  return product.data;
}

export async function apiUpdateProduct(data: any) {
  const product = await api.products.update(data.id, data.product);

  return product.data;
}

export async function apiUploadImages(formData: FormData) {
  const res = await api.products.updateImg(formData);
  console.log(res);
  return res;
}

export async function apiUploadMainImg(data: any) {
  const res = await api.products.updateMainImg(data);
  return res.data;
}

export async function apiDeleteProduct(id: IActions) {
  await api.products.deleteProduct(id);
  return id;
}
