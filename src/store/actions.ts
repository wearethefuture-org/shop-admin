import { ICategoryItem } from "../interfaces/category-Item";
import { ADD_CATEGORY, LOAD_CATEGORIES, REQUEST_CATEGORIES } from "./types";

export const loadCategories = (categories: ICategoryItem[]) => ({type: LOAD_CATEGORIES, data: categories});
export const fetchCategories = () => ({type: REQUEST_CATEGORIES});
export const addCategory = (category: ICategoryItem) => ({type: ADD_CATEGORY, data: category});