import { Char } from './categoryReducer';

export interface GroupToDisplay {
  id?: number;
  name?: string;
  characteristic: Char[];
}

export interface CategoryToDisplay {
  id: number;
  name?: string;
  key?: string;
  description?: string;
  mainCategory?: any,
  characteristicGroup?: GroupToDisplay[];
}

export enum CategoryToDisplayActionTypes {
  setCategory = 'setCategory',
  editCategory = 'editCategory',
  addGroup = 'addGroup',
  editGroup = 'editGroup',
  deleteGroup = 'deleteGroup',
  addChar = 'addChar',
  editChar = 'editChar',
  deleteChar = 'deleteChar',
}

interface SetCategoryAction {
  type: CategoryToDisplayActionTypes.setCategory;
  category: CategoryToDisplay;
}

interface EditCategoryAction {
  type: CategoryToDisplayActionTypes.editCategory;
  name: string;
  key: string;
  description: string;
  mainCategory: any;
}

interface AddGroupAction {
  type: CategoryToDisplayActionTypes.addGroup;
  groupName: string;
}

interface EditGroupAction {
  type: CategoryToDisplayActionTypes.editGroup;
  prevGroupName: string;
  editedGroup: GroupToDisplay;
}

interface DeleteGroupAction {
  type: CategoryToDisplayActionTypes.deleteGroup;
  groupName: string;
}

interface AddCharAction {
  type: CategoryToDisplayActionTypes.addChar;
  groupName: string;
  newChar: Char;
}

interface EditCharAction {
  type: CategoryToDisplayActionTypes.editChar;
  groupName: string;
  prevCharName: string;
  editedChar: Char;
}

interface DeleteCharAction {
  type: CategoryToDisplayActionTypes.deleteChar;
  groupName: string;
  charName: string;
}

export type CategoryToDispalayAction =
  | SetCategoryAction
  | EditCategoryAction
  | AddGroupAction
  | EditGroupAction
  | DeleteGroupAction
  | AddCharAction
  | EditCharAction
  | DeleteCharAction;

export const categoryDisplayReducer = (
  state: CategoryToDisplay,
  action: CategoryToDispalayAction
): CategoryToDisplay => {
  switch (action.type) {
    case CategoryToDisplayActionTypes.setCategory:
      return action.category;

    case CategoryToDisplayActionTypes.editCategory:
      return action.name || action.key || action.description || action.mainCategory
        ? {
            ...state,
            name: action.name,
            key: action.key,
            description: action.description,
            mainCategory: action.mainCategory,
          }
        : state;

    case CategoryToDisplayActionTypes.addGroup:
      return state.characteristicGroup && action.groupName
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.concat({
              name: action.groupName,
              characteristic: [],
            }),
          }
        : state;

    case CategoryToDisplayActionTypes.editGroup:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.map((group) =>
              group.name === action.prevGroupName ? action.editedGroup : group
            ),
          }
        : state;

    case CategoryToDisplayActionTypes.deleteGroup:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.filter(
              (group) => group.name !== action.groupName
            ),
          }
        : state;

    case CategoryToDisplayActionTypes.addChar:
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

    case CategoryToDisplayActionTypes.editChar:
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

    case CategoryToDisplayActionTypes.deleteChar:
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
