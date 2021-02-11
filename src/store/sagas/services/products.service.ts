import { api } from '../../../api/api';
import { IActions } from '../../../interfaces/actions';

export async function fetchedProducts() {
  const products = await api.products.get();
  return products.data;
}

export async function fetchedProductById(id: number) {
  const product = await api.products.getById(id);
  return product.data;
}

export async function fetchedDeleteProduct(id: IActions) {
  await api.products.deleteProduct(id);
  return id;
}

export async function fetchedAddProduct(data: any) {
  const product = await api.products.add(data);
  return product.data;
}

export async function fetchedUpdateProduct(data: any) {
  const product = await api.products.update(data.id, data.product);

  return product.data;
}

export async function fetchedUploadImages(formData: FormData) {
  const res = await api.products.updateImg(formData)
  console.log(res)
  return res
}
export async function fetchedUploadPrewies(data: any) {
  const res = await api.products.updateMainImg(data)
  return res.data
}