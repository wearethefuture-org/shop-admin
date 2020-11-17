import { ICategoryItem } from "../interfaces/category-Item";
import { IProductItem } from "../interfaces/IProducts";
import { LOAD_CATEGORIES, REQUEST_CATEGORIES, LOAD_PRODUCTS, REQUEST_PRODUCTS, SWITCH_DARK_MODE } from "./types";

export const loadCategories = (categories: ICategoryItem[]) => ({ type: LOAD_CATEGORIES, data: categories });
export const fetchCategories = () => ({ type: REQUEST_CATEGORIES });

export const loadProducts = (products: IProductItem[]) => ({ type: LOAD_PRODUCTS, data: products });
export const fetchProducts = () => ({ type: REQUEST_PRODUCTS });

export const switchDarkMode = () => ({ type: SWITCH_DARK_MODE })