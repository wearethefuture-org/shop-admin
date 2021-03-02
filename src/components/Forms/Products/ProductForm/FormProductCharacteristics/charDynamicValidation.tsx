import * as Yup from 'yup';

const dataTypeValidation = ({ type, minValue, maxValue }, validationRule) => {
  let typeValidation = validationRule;

  if (type === 'number') {
    typeValidation = Yup.number().positive().nullable();
  } else if (type === 'range') {
    typeValidation = Yup.number()
      .positive()
      .min(minValue, 'Значення поза межами діапазону')
      .max(maxValue, 'Значення поза межами діапазону')
      .nullable();
  } else if (type === 'date') {
    typeValidation = Yup.date().nullable();
  } else if (type === 'json') {
    typeValidation = Yup.object().shape({});
  } else {
    typeValidation = Yup.string();
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
