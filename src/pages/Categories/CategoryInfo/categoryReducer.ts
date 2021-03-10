import { GroupToDisplay } from './categoryToDisplayReducer';

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

export interface Category {
  id?: number;
  name?: string;
  key?: string;
  description?: string;
  characteristicGroups?: Group[];
  removedCharacteristics?: RemovedChars;
}

interface RemovedChars {
  characteristicGroupIDs?: number[];
  characteristicIDs?: number[];
}

interface ResetCategory {
  type: 'resetCategory';
}

interface SetCategoryId {
  type: 'setCategoryId';
  id: number;
}

interface EditCategoryAction {
  type: 'editCategory';
  name: string;
  key: string;
  description: string;
}

interface AddGroupAction {
  type: 'addGroup';
  groupName: string;
}

interface EditGroupAction {
  type: 'editGroup';
  prevGroup: Group;
  editedGroup: Group;
}

interface DeleteGroupAction {
  type: 'deleteGroup';
  prevGroup: GroupToDisplay;
}

interface AddCharAction {
  type: 'addChar';
  group: GroupToDisplay;
  newChar: Char;
}

interface EditCharAction {
  type: 'editChar';
  group: GroupToDisplay;
  prevChar: Char;
  editedChar: Char;
}

interface DeleteCharAction {
  type: 'deleteChar';
  group: GroupToDisplay;
  char: Char;
}

export type CategoryAction =
  | ResetCategory
  | SetCategoryId
  | EditCategoryAction
  | AddGroupAction
  | EditGroupAction
  | DeleteGroupAction
  | AddCharAction
  | EditCharAction
  | DeleteCharAction;

export const categoryReducer = (state: Category, action: CategoryAction): Category => {
  switch (action.type) {
    case 'resetCategory':
      return {};

    case 'setCategoryId':
      if (!state.id) state.id = undefined;

      return {
        ...state,
        id: action.id,
      };

    case 'editCategory':
      return action.name || action.key || action.description
        ? {
            ...state,
            name: action.name,
            key: action.key,
            description: action.description,
          }
        : state;

    case 'addGroup':
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

    case 'editGroup':
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

    case 'deleteGroup': {
      if (action.prevGroup.id) {
        if (!state.removedCharacteristics) {
          state.removedCharacteristics = { characteristicGroupIDs: [] };
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

    case 'addChar':
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

    case 'editChar':
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

    case 'deleteChar':
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
