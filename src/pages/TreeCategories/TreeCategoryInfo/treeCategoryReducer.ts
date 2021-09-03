import { GroupToDisplay } from './treeCategoryToDisplayReducer';

export interface Char {
  id?: number;
  name?: string;
  description?: string;
  required?: boolean;
  type?: string;
  minValue?: number | string | null;
  maxValue?: number | string | null;
  defaultValues?: null | { values: string[] };
  categoryId?: number;
}

export interface Group {
  id?: number;
  name?: string;
  characteristics?: Char[];
}

export interface TreeCategory {
  id?: number;
  name?: string;
  key?: string;
  description?: string;
  parentCategory?: number | null;
  characteristicGroups?: Group[];
  removedCharacteristics?: RemovedChars;
}

interface RemovedChars {
  characteristicGroupIDs?: number[];
  characteristicIDs?: number[];
}

export enum TreeCategoryActionTypes {
  resetTreeCategory = 'resetTreeCategory',
  setTreeCategoryId = 'setTreeCategoryId',
  addGroup = 'addGroup',
  editGroup = 'editGroup',
  deleteGroup = 'deleteGroup',
  addChar = 'addChar',
  editChar = 'editChar',
  deleteChar = 'deleteChar',
}

interface ResetTreeCategory {
  type: TreeCategoryActionTypes.resetTreeCategory;
}

interface SetTreeCategoryId {
  type: TreeCategoryActionTypes.setTreeCategoryId;
  id: number;
}

interface AddGroupAction {
  type: TreeCategoryActionTypes.addGroup;
  groupName: string;
}

interface EditGroupAction {
  type: TreeCategoryActionTypes.editGroup;
  prevGroup: Group;
  editedGroup: Group;
}

interface DeleteGroupAction {
  type: TreeCategoryActionTypes.deleteGroup;
  prevGroup: GroupToDisplay;
}

interface AddCharAction {
  type: TreeCategoryActionTypes.addChar;
  group: GroupToDisplay;
  newChar: Char;
}

interface EditCharAction {
  type: TreeCategoryActionTypes.editChar;
  group: GroupToDisplay;
  prevChar: Char;
  editedChar: Char;
}

interface DeleteCharAction {
  type: TreeCategoryActionTypes.deleteChar;
  group: GroupToDisplay;
  char: Char;
}

export type TreeCategoryAction =
  | ResetTreeCategory
  | SetTreeCategoryId
  | AddGroupAction
  | EditGroupAction
  | DeleteGroupAction
  | AddCharAction
  | EditCharAction
  | DeleteCharAction;

export const treeCategoryReducer = (
  state: TreeCategory,
  action: TreeCategoryAction
): TreeCategory => {
  switch (action.type) {
    case TreeCategoryActionTypes.resetTreeCategory:
      return {};

    case TreeCategoryActionTypes.setTreeCategoryId:
      if (!state.id) state.id = undefined;

      return {
        ...state,
        id: action.id,
      };

    case TreeCategoryActionTypes.addGroup:
      if (!state.characteristicGroups) state.characteristicGroups = [];

      return action.groupName
        ? {
            ...state,
            characteristicGroups: state.characteristicGroups.concat({
              name: action.groupName,
              characteristics: [],
            }),
          }
        : state;

    case TreeCategoryActionTypes.editGroup:
      if (!state.characteristicGroups) state.characteristicGroups = [];

      return {
        ...state,
        characteristicGroups: state.characteristicGroups.find(
          (group) => group.id === action.prevGroup.id || group.name === action.prevGroup.name
        )
          ? state.characteristicGroups.map((group) =>
              group.id === action.prevGroup.id || group.name === action.prevGroup.name
                ? {
                    id: action.editedGroup.id && action.editedGroup.id,
                    name: action.editedGroup.name,
                    characteristics: group.characteristics && group.characteristics,
                  }
                : group
            )
          : state.characteristicGroups.concat(action.editedGroup),
      };

    case TreeCategoryActionTypes.deleteGroup: {
      if (action.prevGroup.id) {
        if (!state.removedCharacteristics) {
          state.removedCharacteristics = {};
        }

        if (!state.removedCharacteristics.characteristicGroupIDs) {
          state.removedCharacteristics.characteristicGroupIDs = [];
        }

        state.removedCharacteristics.characteristicGroupIDs =
          state.removedCharacteristics.characteristicGroupIDs &&
          state.removedCharacteristics.characteristicGroupIDs.concat(action.prevGroup.id);

        const charIds = action.prevGroup.characteristic.reduce((acc: number[], char) => {
          if (char.id) {
            acc.push(char.id);
          }
          return acc;
        }, []);

        if (charIds?.length) {
          if (!state.removedCharacteristics.characteristicIDs) {
            state.removedCharacteristics.characteristicIDs = [];
          }

          state.removedCharacteristics.characteristicIDs =
            state.removedCharacteristics.characteristicIDs &&
            Array.from(new Set(state.removedCharacteristics.characteristicIDs.concat(charIds)));
        }
      }

      return {
        ...state,
        characteristicGroups:
          state.characteristicGroups &&
          state.characteristicGroups.filter(
            (group) => group.id !== action.prevGroup.id || group.name !== action.prevGroup.name
          ),
      };
    }

    case TreeCategoryActionTypes.addChar:
      if (!state.characteristicGroups) state.characteristicGroups = [];

      return {
        ...state,
        characteristicGroups: state.characteristicGroups.find(
          (group) => group.name === action.group.name
        )
          ? state.characteristicGroups.map((group) =>
              group.name === action.group.name
                ? {
                    ...group,
                    characteristics:
                      group.characteristics &&
                      group.characteristics.concat({
                        ...action.newChar,
                        categoryId: state.id,
                      }),
                  }
                : group
            )
          : state.characteristicGroups?.concat({
              id: action.group.id && action.group.id,
              name: action.group.name,
              characteristics: [
                {
                  ...action.newChar,
                  categoryId: state.id,
                },
              ],
            }),
      };

    case TreeCategoryActionTypes.editChar:
      if (!state.characteristicGroups) state.characteristicGroups = [];

      return {
        ...state,
        characteristicGroups: state.characteristicGroups.find(
          (group) => group.name === action.group.name
        )
          ? state.characteristicGroups.map((group) =>
              group.name === action.group.name
                ? {
                    ...group,
                    characteristics: group.characteristics?.find(
                      (char) => char.name === action.prevChar.name
                    )
                      ? group.characteristics.map((char) =>
                          char.name === action.prevChar.name
                            ? { ...action.editedChar, categoryId: state.id }
                            : char
                        )
                      : group.characteristics?.concat({
                          ...action.editedChar,
                          categoryId: state.id,
                        }),
                  }
                : group
            )
          : state.characteristicGroups.concat({
              id: action.group.id && action.group.id,
              name: action.group.name && action.group.name,
              characteristics: [
                {
                  id: action.prevChar.id && action.prevChar.id,
                  ...action.editedChar,
                  categoryId: state.id,
                },
              ],
            }),
      };

    case TreeCategoryActionTypes.deleteChar:
      if (action.char.id) {
        if (!state.removedCharacteristics) {
          state.removedCharacteristics = {};
        }

        if (!state.removedCharacteristics.characteristicIDs) {
          state.removedCharacteristics.characteristicIDs = [];
        }

        state.removedCharacteristics.characteristicIDs =
          state.removedCharacteristics.characteristicIDs &&
          Array.from(
            new Set(state.removedCharacteristics.characteristicIDs.concat(action.char.id))
          );
      }

      const filteredGroups =
        state.characteristicGroups &&
        state.characteristicGroups.map((group) =>
          group.id === action.group.id || group.name === action.group.name
            ? {
                ...group,
                characteristics:
                  group.characteristics &&
                  group.characteristics.filter(
                    (char) => char.id !== action.char.id || char.name !== action.char.name
                  ),
              }
            : group
        );

      return {
        ...state,
        characteristicGroups: filteredGroups?.length ? filteredGroups : undefined,
      };

    default:
      return state;
  }
};
