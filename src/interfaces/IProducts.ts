export interface IProductItem {
  id: number,
  name: string,
  price: string,
  discount: string,
  category: string,
}

export interface IProductsData {
  list?: Array<IProductItem>
}

