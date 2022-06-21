import { Char } from './treeCategoryReducer';
import { Common } from '../../../interfaces/IProducts';
import { IChildren } from '../../../interfaces/ITreeCategory';

export interface GroupToDisplay {
  id?: number;
  name?: string;
  characteristic: Char[];
}

export interface IParent extends Common {
  description?: string;
  key?: string;
  mpath?: string;
  name?: string;
}

export interface TreeCategoryToDisplay extends Common {
  id: number;
  name: string;
  key: string;
  description?: string;
  parent?: IParent | null;
  characteristicGroup?: GroupToDisplay[];
  children: IChildren[] | [];
  disabledByAdmin: boolean;
}

export enum TreeCategoryToDisplayActionTypes {
  setTreeCategory = 'setTreeCategory',
  editTreeCategory = 'editTreeCategory',
  addGroup = 'addGroup',
  editGroup = 'editGroup',
  deleteGroup = 'deleteGroup',
  addChar = 'addChar',
  editChar = 'editChar',
  deleteChar = 'deleteChar',
}

interface SetTreeCategoryAction {
  type: TreeCategoryToDisplayActionTypes.setTreeCategory;
  category: TreeCategoryToDisplay;
}

interface EditTreeCategoryAction {
  type: TreeCategoryToDisplayActionTypes.editTreeCategory;
  name: string;
  key: string;
  description: string;
}

interface AddGroupAction {
  type: TreeCategoryToDisplayActionTypes.addGroup;
  groupName: string;
}

interface EditGroupAction {
  type: TreeCategoryToDisplayActionTypes.editGroup;
  prevGroupName: string;
  editedGroup: GroupToDisplay;
}

interface DeleteGroupAction {
  type: TreeCategoryToDisplayActionTypes.deleteGroup;
  groupName: string;
}

interface AddCharAction {
  type: TreeCategoryToDisplayActionTypes.addChar;
  groupName: string;
  newChar: Char;
}

interface EditCharAction {
  type: TreeCategoryToDisplayActionTypes.editChar;
  groupName: string;
  prevCharName: string;
  editedChar: Char;
}

interface DeleteCharAction {
  type: TreeCategoryToDisplayActionTypes.deleteChar;
  groupName: string;
  charName: string;
}

export type TreeCategoryToDispalayAction =
  | SetTreeCategoryAction
  | EditTreeCategoryAction
  | AddGroupAction
  | EditGroupAction
  | DeleteGroupAction
  | AddCharAction
  | EditCharAction
  | DeleteCharAction;

export const treeCategoryDisplayReducer = (
  state: TreeCategoryToDisplay,
  action: TreeCategoryToDispalayAction
): TreeCategoryToDisplay => {
  switch (action.type) {
    case TreeCategoryToDisplayActionTypes.setTreeCategory:
      return action.category;

    case TreeCategoryToDisplayActionTypes.editTreeCategory:
      return action.name || action.key || action.description
        ? {
            ...state,
            name: action.name,
            key: action.key,
            description: action.description,
          }
        : state;

    case TreeCategoryToDisplayActionTypes.addGroup:
      return state.characteristicGroup && action.groupName
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.concat({
              name: action.groupName,
              characteristic: [],
            }),
          }
        : state;

    case TreeCategoryToDisplayActionTypes.editGroup:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.map((group) =>
              group.name === action.prevGroupName ? action.editedGroup : group
            ),
          }
        : state;

    case TreeCategoryToDisplayActionTypes.deleteGroup:
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.filter(
              (group) => group.name !== action.groupName
            ),
          }
        : state;

    case TreeCategoryToDisplayActionTypes.addChar:
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

    case TreeCategoryToDisplayActionTypes.editChar:
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

    case TreeCategoryToDisplayActionTypes.deleteChar:
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
