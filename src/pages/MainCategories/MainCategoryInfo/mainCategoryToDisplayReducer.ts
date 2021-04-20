import { Char } from './mainCategoryReducer';

export interface GroupToDisplay {
  id?: number;
  name?: string;
  characteristic: Char[];
}

export interface MainCategoryToDisplay {
  id: number;
  name?: string;
  key?: string;
  description?: string;
  category?: any,
  characteristicGroup?: GroupToDisplay[];
}

export enum MainCategoryToDisplayActionTypes {
  setMainCategory = 'setMainCategory',
  editMainCategory = 'editMainCategory',
  addGroup = 'addGroup',
  editGroup = 'editGroup',
  deleteGroup = 'deleteGroup',
  addChar = 'addChar',
  editChar = 'editChar',
  deleteChar = 'deleteChar',
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

interface AddGroupAction {
  type: MainCategoryToDisplayActionTypes.addGroup;
  groupName: string;
}

interface EditGroupAction {
  type: MainCategoryToDisplayActionTypes.editGroup;
  prevGroupName: string;
  editedGroup: GroupToDisplay;
}

interface DeleteGroupAction {
  type: MainCategoryToDisplayActionTypes.deleteGroup;
  groupName: string;
}

interface AddCharAction {
  type: MainCategoryToDisplayActionTypes.addChar;
  groupName: string;
  newChar: Char;
}

interface EditCharAction {
  type: MainCategoryToDisplayActionTypes.editChar;
  groupName: string;
  prevCharName: string;
  editedChar: Char;
}

interface DeleteCharAction {
  type: MainCategoryToDisplayActionTypes.deleteChar;
  groupName: string;
  charName: string;
}

export type MainCategoryToDispalayAction =
  | SetMainCategoryAction
  | EditMainCategoryAction
  | AddGroupAction
  | EditGroupAction
  | DeleteGroupAction
  | AddCharAction
  | EditCharAction
  | DeleteCharAction;

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

    case MainCategoryToDisplayActionTypes.addGroup:
      return state.characteristicGroup && action.groupName
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.concat({
              name: action.groupName,
              characteristic: [],
            }),
          }
        : state;

    case MainCategoryToDisplayActionTypes.editGroup:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.map((group) =>
              group.name === action.prevGroupName ? action.editedGroup : group
            ),
          }
        : state;

    case MainCategoryToDisplayActionTypes.deleteGroup:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.filter(
              (group) => group.name !== action.groupName
            ),
          }
        : state;

    case MainCategoryToDisplayActionTypes.addChar:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.map((group) =>
              group.name === action.groupName && group.characteristic
                ? {
                    ...group,
                    characteristic: group.characteristic.concat(action.newChar),
                  }
                : group
            ),
          }
        : state;

    case MainCategoryToDisplayActionTypes.editChar:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.map((group) =>
              group.name === action.groupName
                ? {
                    ...group,
                    characteristic: group.characteristic?.map((char) =>
                      char.name === action.prevCharName ? action.editedChar : char
                    ),
                  }
                : group
            ),
          }
        : state;

    case MainCategoryToDisplayActionTypes.deleteChar:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.map((group) =>
              group.name === action.groupName
                ? {
                    ...group,
                    characteristic: group.characteristic.filter(
                      (char) => char.name !== action.charName
                    ),
                  }
                : group
            ),
          }
        : state;

    default:
      return state;
  }
};
