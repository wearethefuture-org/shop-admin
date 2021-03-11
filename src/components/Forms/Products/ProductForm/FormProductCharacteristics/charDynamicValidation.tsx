import * as Yup from 'yup';

import { Type } from '../../../../../interfaces/IProducts';

const dataTypeValidation = ({ type, minValue, maxValue }, validationRule) => {
  let typeValidation = validationRule;

  switch (type) {
    case Type.number:
      typeValidation = Yup.number().positive().nullable();
      break;

    case Type.range:
      typeValidation = Yup.number()
        .positive()
        .min(minValue, 'Значення поза межами діапазону')
        .max(maxValue, 'Значення поза межами діапазону')
        .nullable();
      break;

    case Type.date:
      typeValidation = Yup.date().nullable();
      break;

    case Type.json:
      typeValidation = Yup.object().shape({});
      break;

    default:
      typeValidation = Yup.string();
      break;
  }

  return typeValidation;
};

const requiredValidation = (charRequired, validationRule) => {
  let requireValidation = validationRule;
  return charRequired ? requireValidation.required('Обов`язкове поле') : requireValidation;
};

const getValidationRule = (char) => {
  let fieldValidationRule = null;
  fieldValidationRule = dataTypeValidation(char, fieldValidationRule);
  fieldValidationRule = requiredValidation(char.required, fieldValidationRule);
  return fieldValidationRule;
};

export const getValidationSchema = (charArr) => {
  let schemaObject = {};

  charArr.forEach((char) => {
    schemaObject[char.name] = getValidationRule(char);
  });

  return { subForm: Yup.object().shape(schemaObject) };
};
