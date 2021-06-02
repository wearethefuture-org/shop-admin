import { ICategory } from "../../../interfaces/ICategory";

export interface MainCategory {
  id?: number;
  name?: string;
  key?: string;
  description?: string;
  category?: ICategory;
}

export enum MainCategoryActionTypes {
  resetMainCategory = 'resetMainCategory',
  setMainCategoryId = 'setMainCategoryId',
  addChar = 'addChar',
  editChar = 'editChar',
  deleteChar = 'deleteChar',
}

interface ResetMainCategory {
  type: MainCategoryActionTypes.resetMainCategory;
}

interface SetMainCategoryId {
  type: MainCategoryActionTypes.setMainCategoryId;
  id: number;
}


export type MainCategoryAction =
  | ResetMainCategory
  | SetMainCategoryId

export const mainCategoryReducer = (state: MainCategory, action: MainCategoryAction): MainCategory => {
  switch (action.type) {
    case MainCategoryActionTypes.resetMainCategory:
      return {};

    case MainCategoryActionTypes.setMainCategoryId:
      if (!state.id) state.id = undefined;

      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};
