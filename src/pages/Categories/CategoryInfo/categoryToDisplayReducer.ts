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
  characteristicGroup?: GroupToDisplay[];
}

interface SetCategoryAction {
  type: 'setDisplayCategory';
  category: CategoryToDisplay;
}

interface EditCategoryAction {
  type: 'editDisplayCategory';
  name: string;
  key: string;
  description: string;
}

interface AddGroupAction {
  type: 'addDisplayGroup';
  groupName: string;
}

interface EditGroupAction {
  type: 'editDisplayGroup';
  prevGroupName: string;
  editedGroup: GroupToDisplay;
}

interface DeleteGroupAction {
  type: 'deleteDisplayGroup';
  groupName: string;
}

interface AddCharAction {
  type: 'addDisplayChar';
  groupName: string;
  newChar: Char;
}

interface EditCharAction {
  type: 'editDisplayChar';
  groupName: string;
  prevCharName: string;
  editedChar: Char;
}

interface DeleteCharAction {
  type: 'deleteDisplayChar';
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
    case 'setDisplayCategory':
      return action.category;

    case 'editDisplayCategory':
      return action.name || action.key || action.description
        ? {
            ...state,
            name: action.name,
            key: action.key,
            description: action.description,
          }
        : state;

    case 'addDisplayGroup':
      return state.characteristicGroup && action.groupName
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.concat({
              name: action.groupName,
              characteristic: [],
            }),
          }
        : state;

    case 'editDisplayGroup':
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.map((group) =>
              group.name === action.prevGroupName ? action.editedGroup : group
            ),
          }
        : state;

    case 'deleteDisplayGroup':
      return state.characteristicGroup
        ? {
            ...state,
            characteristicGroup: state.characteristicGroup.filter(
              (group) => group.name !== action.groupName
            ),
          }
        : state;

    case 'addDisplayChar':
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

    case 'editDisplayChar':
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

    case 'deleteDisplayChar':
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
