export interface MainCategoryToDisplay {
  id: number;
  name?: string;
  key?: string;
  description?: string;
  category?: any,
}

export enum MainCategoryToDisplayActionTypes {
  setMainCategory = 'setMainCategory',
  editMainCategory = 'editMainCategory',
}

interface SetMainCategoryAction {
  type: MainCategoryToDisplayActionTypes.setMainCategory;
  mainCategory: MainCategoryToDisplay;
}

interface EditMainCategoryAction {
  type: MainCategoryToDisplayActionTypes.editMainCategory;
  name: string;
  key: string;
  description: string;
  categories: any;
}

export type MainCategoryToDispalayAction =
  | SetMainCategoryAction
  | EditMainCategoryAction

export const mainCategoryDisplayReducer = (
  state: MainCategoryToDisplay,
  action: MainCategoryToDispalayAction
): MainCategoryToDisplay => {
  switch (action.type) {
    case MainCategoryToDisplayActionTypes.setMainCategory:
      return action.mainCategory;

    case MainCategoryToDisplayActionTypes.editMainCategory:
      return action.name || action.key || action.description || action.categories
        ? {
          ...state,
          name: action.name,
          key: action.key,
          description: action.description,
          category: action.categories,
        }
        : state;

    default:
      return state;
  }
};
