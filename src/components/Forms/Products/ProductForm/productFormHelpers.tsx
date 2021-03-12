import * as Yup from 'yup';

export const productValidationShema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(50, 'Максимальна довжина 50 символів')
    .required('Обов`язкове поле'),
  price: Yup.number()
    .positive('Число повинно бути більше нуля')
    .nullable()
    .required('Обов`язкове поле'),
  description: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),
  categoryName: Yup.string().trim().required('Обов`язкове поле'),
  key: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(30, 'Максимальна довжина 30 символів')
    .matches(
      /(^[a-z0-9-]+$)/,
      'Може містити латинські літери в нижньому регістрі (a-z), цифри (0-9), знак тире (-)'
    )
    .required('Обов`язкове поле'),
  subForm: Yup.object(),
});

export const formatKey = (string: string) =>
  string
    .toLowerCase()
    .split(/\W/ || ' ')
    .join('-');
