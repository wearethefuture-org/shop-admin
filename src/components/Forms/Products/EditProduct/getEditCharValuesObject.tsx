import { FormikProps } from 'formik';

import { ICharResponse } from '../../../../interfaces/ICategory';
import { ICharValue, IGetProductById, IUpdateProduct } from '../../../../interfaces/IProducts';

const arrayEquals = (a: string[], b: string[]) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const getEditCharValuesObject = (
  chars: ICharResponse[],
  product: IGetProductById,
  formik: FormikProps<IUpdateProduct>
) => {
  const charsToAdd =
    chars && chars.length
      ? chars.reduce((acc: ICharValue[], char) => {
          const { id: characteristicId, type, name } = char;

          const productChar = product.characteristicValue.find((char) => char.name === name);

          const value = characteristicId && formik.values.subForm && formik.values.subForm[name];

          const basicValues = { name, characteristicId };

          if (!productChar && value) {
            if (type === 'enum' && value.length) {
              acc.push({ ...basicValues, enumValue: value });
            } else if (type === 'json') {
              const entries: [string, string][] = Object.entries(value);

              if (value && entries.length) {
                const filteredValue = entries.filter(([key, value]) => key && value.trim());

                const resultObject: object = Object.fromEntries(filteredValue);

                acc.push({ ...basicValues, jsonValue: resultObject });
              }
            } else if (type === 'string') {
              acc.push({ ...basicValues, stringValue: value });
            } else if (type === 'number') {
              acc.push({ ...basicValues, numberValue: value });
            } else if (type === 'range') {
              acc.push({ ...basicValues, numberValue: value });
            } else if (type === 'date') {
              acc.push({ ...basicValues, dateValue: value });
            } else if (type === 'boolean') {
              acc.push({ ...basicValues, booleanValue: value === 'true' ? true : false });
            }
          }

          return acc;
        }, [])
      : [];

  const charsToEdit =
    chars && chars.length
      ? chars.reduce((acc: ICharValue[], char) => {
          const { id: characteristicId, type, name: characteristicName } = char;

          const productChar = product.characteristicValue.find(
            ({ name }) => name === characteristicName
          );

          const initialValue =
            characteristicId &&
            formik.initialValues.subForm &&
            formik.initialValues.subForm[characteristicName];

          const value =
            characteristicId && formik.values.subForm && formik.values.subForm[characteristicName];

          if (productChar && value) {
            const { id } = productChar;
            const basicValues = { id, name: characteristicName, characteristicId };

            if (type === 'enum') {
              const valuesEqual = arrayEquals(initialValue, value);

              if (!valuesEqual) {
                acc.push({ ...basicValues, enumValue: value });
              }
            } else if (type === 'json') {
              const entries: [string, string][] = Object.entries(value);

              const filteredValue = entries.filter(([key, value]) => key && value.trim());

              const resultObject: object = Object.fromEntries(filteredValue);

              const valuesEqual =
                arrayEquals(Object.keys(initialValue), Object.keys(resultObject)) &&
                arrayEquals(Object.values(initialValue), Object.values(resultObject));

              if (!valuesEqual) {
                acc.push({ ...basicValues, jsonValue: resultObject });
              }
            } else if (type === 'string') {
              if (initialValue !== value) {
                acc.push({ ...basicValues, stringValue: value });
              }
            } else if (type === 'number') {
              if (Number(initialValue) !== Number(value)) {
                acc.push({ ...basicValues, numberValue: value });
              }
            } else if (type === 'range') {
              if (Number(initialValue) !== Number(value)) {
                acc.push({ ...basicValues, numberValue: value });
              }
            } else if (type === 'date') {
              if (initialValue !== value) {
                acc.push({ ...basicValues, dateValue: value });
              }
            } else if (type === 'boolean') {
              if (initialValue !== value) {
                acc.push({ ...basicValues, booleanValue: value === 'true' ? true : false });
              }
            }
          }

          return acc;
        }, [])
      : [];

  const charsToDelete =
    chars && chars.length
      ? chars.reduce((acc: number[], char) => {
          const productChar = product.characteristicValue.find(({ name }) => name === char.name);
          const value = char.id && formik.values.subForm && formik.values.subForm[char.name];

          if (productChar && !value) {
            acc.push(productChar.id);
          }

          return acc;
        }, [])
      : [];

  return { charsToAdd, charsToEdit, charsToDelete };
};
