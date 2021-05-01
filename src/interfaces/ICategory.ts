import { GeneralMainCategory } from './IMainCategory';
import { Common, IBasicProduct } from './IProducts';

export interface GeneralCategory extends Common {
  key: string;
  name: string;
  description?: string;
  mainCategory: any | null;
  
}

export interface IGetCategoriesResponse extends GeneralCategory {
  products: IBasicProduct[];
  mainCategory: any;
  
  
}

export interface IAddCategory {
  name: string;
  description: string;
  key: string;
  mainCategory: any;
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
  mainCategory: any;
  
  
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

export interface CategoryTableData extends GeneralCategory {
  description?: string;
  products: number;
  mainCategory: any;
  
  
}

export interface InnerCategoryFormProps {
  handleClose: () => void;
}
