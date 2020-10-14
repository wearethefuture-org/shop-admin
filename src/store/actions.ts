import { ICategoryItem } from "../interfaces/category-Item";
import { ADD_CATEGORY, LOAD_CATEGORIES, REQUEST_CATEGORIES, TOGGLE_MODAL } from "./types";

export const loadCategories = (categories: ICategoryItem[]) => ({type: LOAD_CATEGORIES, data: categories});
export const fetchCategories = () => ({type: REQUEST_CATEGORIES});
export const toggleModal = (state: boolean) => ({type: TOGGLE_MODAL, data: state});
export const addCategory = (category: ICategoryItem) => ({type: ADD_CATEGORY, data: category});