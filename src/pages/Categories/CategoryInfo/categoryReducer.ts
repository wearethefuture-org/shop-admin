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
  prevGroupName: string;
  editedGroup: Group;
}

interface DeleteGroupAction {
  type: 'deleteGroup';
  prevGroup: GroupToDisplay;
}

interface AddCharAction {
  type: 'addChar';
  groupId?: number;
  groupName: string;
  newChar: Char;
}

interface EditCharAction {
  type: 'editChar';
  groupId?: number;
  groupName: string;
  prevCharName: string;
  editedChar: Char;
}

interface DeleteCharAction {
  type: 'deleteChar';
  groupName: string;
  charName: string;
  charId?: number;
}

export type CategoryAction =
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
          (group) => group.name === action.prevGroupName
        )
          ? state.characteristicGroups.map((group) =>
              group.name === action.prevGroupName ? action.editedGroup : group
            )
          : state.characteristicGroups.concat(action.editedGroup),
      };

    case 'deleteGroup': {
      if (action.prevGroup.id) {
        const removedCharacteristics = {} as RemovedChars;
        removedCharacteristics.characteristicGroupIDs = [];
        removedCharacteristics.characteristicGroupIDs = removedCharacteristics.characteristicGroupIDs.concat(
          action.prevGroup.id
        );

        const charIds = action.prevGroup.characteristic.reduce((acc: number[], char) => {
          if (char.id) {
            acc.push(char.id);
          }
          return acc;
        }, []);

        if (charIds?.length) {
          removedCharacteristics.characteristicIDs = [];
          removedCharacteristics.characteristicIDs = Array.from(
            new Set(removedCharacteristics.characteristicIDs.concat(charIds))
          );
        }

        return {
          ...state,
          removedCharacteristics,
        };
      }

      return {
        ...state,
        characteristicGroups:
          state.characteristicGroups &&
          state.characteristicGroups.filter((group) => group.name !== action.prevGroup.name),
      };
    }

    case 'addChar':
      if (!state.characteristicGroups) state.characteristicGroups = [];

      return {
        ...state,
        characteristicGroups: state.characteristicGroups.find(
          (group) => group.name === action.groupName
        )
          ? state.characteristicGroups.map((group) =>
              group.name === action.groupName && group.characteristics && state.id
                ? {
                    ...group,
                    characteristics: group.characteristics.concat({
                      ...action.newChar,
                      categoryId: state.id,
                    }),
                  }
                : group
            )
          : state.characteristicGroups.concat({
              id: action.groupId && action.groupId,
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
          (group) => group.name === action.groupName || group.id === action.groupId
        )
          ? state.characteristicGroups.map((group) =>
              group.name === action.groupName || group.id === action.groupId
                ? {
                    ...group,
                    characteristics: group.characteristics?.map((char) =>
                      char.name === action.prevCharName
                        ? { ...action.editedChar, categoryId: state.id }
                        : char
                    ),
                  }
                : group
            )
          : state.characteristicGroups.concat({
              id: action.groupId && action.groupId,
              characteristics: [
                {
                  ...action.editedChar,
                  categoryId: state.id,
                },
              ],
            }),
      };

    case 'deleteChar':
      if (action.charId) {
        const removedCharacteristics = {} as RemovedChars;

        removedCharacteristics.characteristicIDs = [];
        removedCharacteristics.characteristicIDs = Array.from(
          new Set(removedCharacteristics.characteristicIDs.concat(action.charId))
        );

        return {
          ...state,
          removedCharacteristics,
        };
      }

      return {
        ...state,
        characteristicGroups:
          state.characteristicGroups &&
          state.characteristicGroups.map((group) =>
            group.name === action.groupName
              ? {
                  ...group,
                  characteristics:
                    group.characteristics &&
                    group.characteristics.filter((char) => char.name !== action.charName),
                }
              : group
          ),
      };

    default:
      return state;
  }
};
