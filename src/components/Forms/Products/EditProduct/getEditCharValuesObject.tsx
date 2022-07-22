import { FormikProps } from 'formik';

import { ICharResponse } from '../../../../interfaces/ITreeCategory';
import {
  ICharValue,
  IGetProductById,
  IProductCharResponse,
  IUpdateProduct,
  Type,
} from '../../../../interfaces/IProducts';

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
            switch (type) {
              case Type.enum:
                if (value) {
                  acc.push({ ...basicValues, enumValue: value });
                }
                break;

              case Type.json:
                const { newEntry } = value;
                let colorSizeObject = {};

                if (newEntry?.key) {
                  const newValue = newEntry.value.split(',').map((val) => val.trim());
                  colorSizeObject = { ...colorSizeObject, [newEntry.key.trim()]: newValue };
                }

                if (colorSizeObject && Object.values(colorSizeObject).length) {
                  acc.push({
                    ...basicValues,
                    jsonValue: colorSizeObject,
                  });
                }
                break;

              case Type.string:
                value.trim() && acc.push({ ...basicValues, stringValue: value.trim() });
                break;

              case Type.date:
                value && acc.push({ ...basicValues, dateValue: value });
                break;

              case Type.boolean:
                value &&
                  acc.push({
                    ...basicValues,
                    booleanValue: value === 'true' ? true : false,
                  });
                break;

              default:
                value.trim() &&
                  acc.push({
                    ...basicValues,
                    numberValue: Number(value.trim()),
                  });
                break;
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
            const basicValues = {
              id,
              name: characteristicName,
              characteristicId,
            };

            switch (type) {
              case Type.enum:
                if (value) {
                  acc.push({ ...basicValues, enumValue: value });
                }
                break;

              case Type.json:
                let { newEntry, ...rest } = value;

                if (newEntry?.key) {
                  const newValue = newEntry.value.split(',').map((val) => val.trim());
                  rest = { ...rest, [newEntry.key.trim()]: newValue };
                }

                const entries: [string, string | string[]][] = Object.entries(rest);

                const formattedValues = entries.map((item) => {
                  if (!Array.isArray(item[1])) {
                    item[1] = item[1].split(',').map((val) => val.trim());
                    return item;
                  }
                  return item;
                });

                const resultObject: object = Object.fromEntries(formattedValues);

                const valuesEqual =
                  arrayEquals(Object.keys(initialValue), Object.keys(resultObject)) &&
                  arrayEquals(Object.values(initialValue), Object.values(resultObject));

                if (!valuesEqual && resultObject) {
                  acc.push({
                    ...basicValues,
                    jsonValue: resultObject,
                  });
                }
                break;

              case Type.string:
                if (initialValue !== value) {
                  acc.push({ ...basicValues, stringValue: value });
                }
                break;

              case Type.date:
                if (value && initialValue !== value) {
                  acc.push({ ...basicValues, dateValue: value });
                }
                break;

              case Type.boolean:
                if (value && initialValue !== value) {
                  acc.push({
                    ...basicValues,
                    booleanValue: value === 'true' ? true : false,
                  });
                }
                break;

              default:
                if (value && Number(initialValue) !== Number(value)) {
                  acc.push({ ...basicValues, numberValue: value });
                }
                break;
            }
          }

          return acc;
        }, [])
      : [];

  const charsToDelete =
    chars && chars.length
      ? chars.reduce((acc: number[], char) => {
          const productChar: IProductCharResponse | undefined = product.characteristicValue.find(
            ({ name }) => name === char.name
          );
          const value =
            productChar && formik.values.subForm && formik.values.subForm[productChar.name];

          if (productChar) {
            if (productChar.enumValue && !value.length) {
              acc.push(productChar.id);
            } else if (productChar.jsonValue) {
              const values: string[] = Object.values(value);
              const filteredValues: string[] = values.filter((value) => value);

              !filteredValues.length && acc.push(productChar.id);
            } else if (!value) {
              acc.push(productChar.id);
            }
          }

          return acc;
        }, [])
      : [];

  return { charsToAdd, charsToEdit, charsToDelete };
};
