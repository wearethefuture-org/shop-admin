import React from 'react';
import * as Yup from 'yup';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import EventIcon from '@material-ui/icons/Event';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

import { Type } from '../../../interfaces/IProducts';

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
        is: Type.range,
        then: Yup.number().required('Обов`язкове поле'),
      })
      .nullable(),
    maxValue: Yup.number()
      .when('type', {
        is: Type.range,
        then: Yup.number().required('Обов`язкове поле'),
      })
      .nullable(),
    defaultVal: Yup.string()
      .trim()
      .when('type', {
        is: Type.enum,
        then: Yup.string().required('Обов`язкове поле'),
      }),
  });

export const getIcon = (type) => {
  switch (type) {
    case Type.enum:
      return <FormatListBulletedIcon />;

    case Type.string:
      return <TextFieldsIcon />;

    case Type.number:
      return <LooksOneIcon />;

    case Type.boolean:
      return <CheckIcon />;

    case Type.json:
      return <NoteAddIcon />;

    case Type.date:
      return <EventIcon />;

    case Type.range:
      return <LinearScaleIcon />;
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
