import { ICharResponse } from '../../../../interfaces/ITreeCategory';
import { ICharValue, Type } from '../../../../interfaces/IProducts';

export const getAddCharValuesObject = (subForm, chars: ICharResponse[]) => {
  const characteristicValues: ICharValue[] = Object.entries(subForm).reduce(
    (charArr: ICharValue[], [key, value]: [string, any]) => {
      const char = chars && chars.find((char) => char.name === key);

      if (!char) return [];

      const { name, type, id } = char;

      const basicValues: { name: string; characteristicId: number } = {
        name,
        characteristicId: id,
      };

      switch (type) {
        case Type.enum:
          value && charArr.push({ ...basicValues, enumValue: value ? value : null });
          break;

        case Type.boolean:
          value &&
            charArr.push({
              ...basicValues,
              booleanValue: value ? (value === 'true' ? true : false) : null,
            });
          break;

        case Type.json:
          Object.values(value).length &&
            charArr.push({ ...basicValues, jsonValue: value ? value : null });
          break;

        case Type.date:
          value &&
            charArr.push({
              ...basicValues,
              dateValue: value ? new Date(value).toISOString() : null,
            });
          break;

        case Type.string:
          value.trim() &&
            charArr.push({ ...basicValues, stringValue: value ? value.trim() : null });
          break;

        default:
          value && charArr.push({ ...basicValues, numberValue: value ? Number(value) : null });
          break;
      }

      return charArr;
    },
    []
  );

  return characteristicValues;
};
