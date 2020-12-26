import { IActions } from '../interfaces/actions';
import { ICategoryItem } from "../interfaces/category-Item";
import { ISliderItem } from "../interfaces/slider-item";
import { IProductItem } from "../interfaces/IProducts";
import {
  ADD_CATEGORY,
  LOAD_CATEGORIES,
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  LOAD_PRODUCTS,
  REQUEST_PRODUCTS,
  ADD_SLIDER,
  DELETE_SLIDER,
  LOAD_SLIDERS,
  REQUEST_SLIDERS,
  REQUEST_ADD_SLIDERS,
  SWITCH_DARK_MODE, REQUEST_DELETE_SLIDERS
} from "./types";

export const loadCategories = (categories: ICategoryItem[]): IActions => ({ type: LOAD_CATEGORIES, data: categories });
export const fetchCategories = (): IActions => ({ type: REQUEST_CATEGORIES });

export const fetchAddCategories = (name: string, description: string): IActions => ({
  type: REQUEST_ADD_CATEGORIES,
  data: { name, description },
});
export const addCategory = (category: ICategoryItem): IActions => ({
  type: ADD_CATEGORY,
  data: category,
});

export const loadProducts = (products: IProductItem[]): IActions => ({ type: LOAD_PRODUCTS, data: products });
export const fetchProducts = (): IActions => ({ type: REQUEST_PRODUCTS });

//SLIDER
export const loadSliders = (sliders: ISliderItem[]): IActions => ({ type: LOAD_SLIDERS, data: sliders });
export const fetchSliders = (): IActions => ({ type: REQUEST_SLIDERS });

export const fetchAddSliders = (name: string, text: string, image: string, href: string, isShown: boolean, priority: number): IActions => ({
  type: REQUEST_ADD_SLIDERS,
  data: { name, text, image, href, isShown, priority },
});
export const addSlider = (slider: ISliderItem): IActions => ({
  type: ADD_SLIDER,
  data: slider,
});

export const fetchDeleteSliders = (slider: ISliderItem): IActions => ({
  type: REQUEST_DELETE_SLIDERS,
  data: slider,
});

export const deleteSlider = (slider: ISliderItem): IActions => ({
  type: DELETE_SLIDER,
  data: slider,
});

export const switchDarkMode = (): IActions => ({ type: SWITCH_DARK_MODE })
