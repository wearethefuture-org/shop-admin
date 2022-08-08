import * as Yup from 'yup';

import { Type } from '../../../../../interfaces/IProducts';

const dataTypeValidation = ({ type, minValue, maxValue, value }, validationRule) => {
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
      const shapes = {};

      const data_object = Object.entries(value);

      data_object.forEach((item) => {
        if (item && typeof item[1] === 'string') {
          shapes[item[0]] = Yup.string()
            .trim()
            .matches(
              /(^[0-9-,]+$)/,
              'Використовуйте цифри (0-9), знак тире (-), кома(,), без пробілів'
            );
        } else if (value['newEntry']) {
          const newEntrySchema = Yup.object().shape({
            key: Yup.string()
              .trim()
              .matches(
                /(^[АБВГДЕЄЖІЇЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдежзийклмнопрстуфхцчшщьюяіїє+/-]+$)/,
                'Може містити українські літери, знаки(- + /)'
              )
              .required('Обов`язкове поле'),
            value: Yup.string()
              .trim()
              .matches(/(^[0-9-,]+$)/, 'Використовуйте цифри (0-9), знак тире (-), кома(,)'),
          });
          shapes['newEntry'] = newEntrySchema;
        }
      });

      typeValidation = Yup.object().shape(shapes);
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
