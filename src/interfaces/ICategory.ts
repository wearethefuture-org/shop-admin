import { IBasicProduct } from './IProducts';

export interface IGetCategoriesResponse {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  products: IBasicProduct[];
}

export interface IAddCategory {
  name: string;
  description: string;
  key: string;
}

export interface IAddCategoryResponse {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
}

export interface ICharResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  required: boolean;
  type: string;
  minValue: number | null;
  maxValue: number | null;
  defaultValues: null | { values: string[] };
}

export interface ICategoryResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  key: string;
  description: string;
  characteristicGroup: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    characteristic: ICharResponse[];
  }[];
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

export interface CategoryTableData {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description?: string;
  products: number;
}

export interface InnerCategoryFormProps {
  handleClose: () => void;
}
