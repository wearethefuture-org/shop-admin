export interface ICategoryItem {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  products: [];
}

export interface ICategoriesData {
  list: Array<ICategoryItem>;
  loading: boolean;
  currentCategory: ICategoryItem | null;
  error: string | null;
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

export interface IFormValues {
  name: string;
  key: string;
  description: string;
}

export interface InnerCategoryFormProps {
  handleClose: () => void;
}
