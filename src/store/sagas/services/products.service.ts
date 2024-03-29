import { api } from '../../../api/api';
import {
  IAddProduct,
  IDeleteProductChars,
  IDisableProduct,
  IProductCharRequest,
  IProductsFilter,
  IUpdateAvailabilityProduct,
} from '../../../interfaces/IProducts';

export async function apiGetProducts(page: number, limit: number, sort: string, sortDirect: string, filter: IProductsFilter) {
  const products = await api.products.get(page, limit, sort, sortDirect, filter);
  return products.data;
}

export async function apiGetProductById(id: number) {
  const product = await api.products.getById(id);
  return product.data;
}

export async function apiGetProductsByQuery(searchValue: string, page: number, limit: number) {
  const product = await api.search.getSearchItems({
    query: searchValue,
    option: 'products',
    page,
    limit,
  });
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

export async function apiUploadImages(formData: FormData) {
  const res = await api.products.updateImg(formData);
  return res;
}

export async function apiUploadMainImg(data: { productId: number; imgName: string }) {
  const res = await api.products.updateMainImg(data);
  return res.data;
}

export async function apiDeleteImg(imgName: string) {
  const res = await api.products.deleteImg(imgName);
  return res.data;
}

export async function apiDeleteProduct(id: number) {
  await api.products.deleteProduct(id);
  return id;
}

export async function apiAddProductCharValues(data: IProductCharRequest) {
  const res = await api.products.addProductCharValues(data);
  return res.data;
}

export async function apiUpdateProductCharValues(data: IProductCharRequest) {
  const res = await api.products.updateProductCharValues(data);
  return res.data;
}

export async function apiUpdateAvailabilityProduct(data: IUpdateAvailabilityProduct) {
  const res = await api.products.updateAvailabilityProduct(data);
  return res.data;
}

export async function disableProduct(data: IDisableProduct) {
  const res = await api.products.disableProduct(data);
  return res.data;
}

export async function deleteProductCharValues(data :IDeleteProductChars) {
  const res = await api.products.deleteProductCharValues(data);
  return res.data
}

// export const apiDeleteChar = (
//   config: AxiosRequestConfig,
//   data: { characteristicValuesIds: string[] }
// ): Promise<string> => {
//   console.log(temporaryToken)
//   return axios({
//     method: 'delete',
//     url: root && root + config.url,
//     headers: { 'Content-Type': 'application/json',
//                'Authorization' : temporaryToken
    
    
  
//   },
//     data: JSON.stringify(data),
//   }).then((res: AxiosResponse) => res.data);
// };
