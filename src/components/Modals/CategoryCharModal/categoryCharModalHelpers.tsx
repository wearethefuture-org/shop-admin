import React from 'react';
import * as Yup from 'yup';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import EventIcon from '@material-ui/icons/Event';

import yesNoIcon from '../../../assets/icons/yesNo.svg';
import jsonIcon from '../../../assets/icons/json.svg';
import rangeIcon from '../../../assets/icons/range.svg';

export const charValidationSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Мінімальна довжина 2 символа')
      .max(50, 'Максимальна довжина 50 символів')
      .required('Обов`язкове поле'),
    description: Yup.string()
      .trim()
      .min(2, 'Мінімальна довжина 2 символа')
      .max(250, 'Максимальна довжина 250 символів')
      .required('Обов`язкове поле'),
    required: Yup.boolean(),
    type: Yup.string().required('Обов`язкове поле'),
    minValue: Yup.number()
      .when('type', {
        is: 'range',
        then: Yup.number().required('Обов`язкове поле'),
      })
      .nullable(),
    maxValue: Yup.number()
      .when('type', {
        is: 'range',
        then: Yup.number().required('Обов`язкове поле'),
      })
      .nullable(),
    defaultVal: Yup.string()
      .trim()
      .when('type', {
        is: 'enum',
        then: Yup.string().required('Обов`язкове поле'),
      }),
  });

export const getIcon = (type) => {
  switch (type) {
    case 'enum':
      return <FormatListBulletedIcon />;
    case 'string':
      return <TextFieldsIcon />;
    case 'number':
      return <LooksOneIcon />;
    case 'boolean':
      return (
        <img
          src={yesNoIcon}
          alt="yesNoIcon"
          width={30}
          height={30}
          style={{ transform: 'translateY(-3px)' }}
        />
      );
    case 'json':
      return <img src={jsonIcon} alt="jsonIcon" width={20} height={20} />;
    case 'date':
      return <EventIcon />;
    case 'range':
      return (
        <img
          src={rangeIcon}
          alt="jsonIcon"
          width={30}
          height={30}
          style={{ transform: 'translateY(-2px)' }}
        />
      );
    default:
      return;
  }
};

export enum charTypes {
  enum = 'Список',
  string = 'Текстове поле',
  number = 'Число',
  boolean = 'Так / Ні',
  json = "Об'єкт",
  date = 'Дата',
  range = 'Діапазон',
}
