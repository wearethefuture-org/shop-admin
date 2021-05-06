import { Common } from './IProducts';
import { ICategory } from "./ICategory";

export interface GeneralMainCategory extends Common {
  key: string;
  name: string;
  description?: string;
  category: ICategory[];
}

export interface IGetMainCategoriesResponse extends GeneralMainCategory {
  category: ICategory[];
}

export interface IAddMainCategory {
  name: string;
  description: string;
  key: string;
}

export interface IMainCategoryResponse extends GeneralMainCategory {
  category: ICategory[];
}

export interface InnerMainCategoryFormProps {
  handleClose: () => void;
}
