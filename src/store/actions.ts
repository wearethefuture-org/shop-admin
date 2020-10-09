import { ICategoryItem } from "../interfaces/category-Item";
import { LOAD_CATEGORIES } from "./types";

export const loadCategories = (categories: ICategoryItem[]) => ({type: LOAD_CATEGORIES, data: categories});