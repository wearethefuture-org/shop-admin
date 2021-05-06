import { Common, IBasicProduct } from './IProducts';
import { GeneralMainCategory } from "./IMainCategory";

export interface ICategory extends Common {
  key: string;
  name: string;
  description: string;
}

export interface GeneralCategory extends Common {
  key: string;
  name: string;
  description?: string;
  mainCategory: GeneralMainCategory | null;
}

export interface IGetCategoriesResponse extends GeneralCategory {
  products: IBasicProduct[];
  mainCategory: any;
}

export interface IAddCategory {
  name: string;
  description: string;
  key: string;
  mainCategory: string;
}

export interface ICharResponse extends Common {
  name: string;
  description: string;
  required: boolean;
  type: string;
  minValue: number | null;
  maxValue: number | null;
  defaultValues: null | { values: string[] };

}

export interface IGroupResponse extends Common {
  name: string;
  characteristic: ICharResponse[];
}

export interface ICategoryResponse extends GeneralCategory {
  characteristicGroup: IGroupResponse[];
  mainCategory: GeneralMainCategory;
}

export interface ICharToAdd {
  name: string;
  description?: string;
  required?: boolean;
  type?: string;
  minValue?: number | string | null;
  maxValue?: number | string | null;
  defaultVal?: string;
  defaultValues: null | { values: string[] };
  categoryId?: number;
}

export interface InnerCategoryFormProps {
  handleClose: () => void;
}

export interface CategoriesTableProps {
  list: IGetCategoriesResponse[];
  activeColumns: string[];
}
