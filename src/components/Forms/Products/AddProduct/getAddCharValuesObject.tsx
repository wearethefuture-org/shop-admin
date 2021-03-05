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
        value && charArr.push({ ...basicValues, numberValue: value ? Number(value) : null });
      } else if (type === 'enum') {
        value.length && charArr.push({ ...basicValues, enumValue: value ? value : null });
      } else if (type === 'boolean') {
        value &&
          charArr.push({
            ...basicValues,
            booleanValue: value ? (value === 'true' ? true : false) : null,
          });
      } else if (type === 'json') {
        Object.keys(value).length &&
          charArr.push({ ...basicValues, jsonValue: value ? value : null });
      } else if (type === 'date') {
        value &&
          charArr.push({ ...basicValues, dateValue: value ? new Date(value).toISOString() : null });
      } else if (type === 'string') {
        value && charArr.push({ ...basicValues, stringValue: value ? value : null });
      }
      return charArr;
    },
    []
  );

  return characteristicValues;
};
