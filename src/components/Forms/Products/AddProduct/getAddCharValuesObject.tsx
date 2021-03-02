import { ICharResponse } from '../../../../interfaces/ICategory';
import { ICharValue } from '../../../../interfaces/IProducts';

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

      if (type === 'number' || type === 'range') {
        value && charArr.push({ ...basicValues, numberValue: Number(value) });
      } else if (type === 'enum') {
        value.length && charArr.push({ ...basicValues, enumValue: value });
      } else if (type === 'boolean') {
        value && charArr.push({ ...basicValues, booleanValue: value === 'true' ? true : false });
      } else if (type === 'json') {
        Object.keys(value).length && charArr.push({ ...basicValues, jsonValue: value });
      } else if (type === 'date') {
        value && charArr.push({ ...basicValues, dateValue: new Date(value).toISOString() });
      } else if (type === 'string') {
        value && charArr.push({ ...basicValues, stringValue: value });
      }
      return charArr;
    },
    []
  );

  return characteristicValues;
};
