import { Common, IBasicProduct } from './IProducts';

export interface GeneralMainCategory extends Common {
  key: string;
  name: string;
  description?: string;
  category: any;
  
}

export interface IGetMainCategoriesResponse extends GeneralMainCategory {
  //products: IBasicProduct[];
  category: any;
  
}

export interface IAddMainCategory {
  name: string;
  description: string;
  key: string;
  
}

/*export interface ICharResponse extends Common {
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
}*/

export interface IMainCategoryResponse extends GeneralMainCategory {
 // characteristicGroup: IGroupResponse[];
 category: any;
  
  
}

/*export interface ICharToAdd {
  name: string;
  description?: string;
  required?: boolean;
  type?: string;
  minValue?: number | string | null;
  maxValue?: number | string | null;
  defaultVal?: string;
  defaultValues: null | { values: string[] };
  categoryId?: number;
}*/

export interface MainCategoryTableData extends GeneralMainCategory {
  description?: string;
  category: number;
  
  
  
}

export interface InnerMainCategoryFormProps {
  handleClose: () => void;
}
