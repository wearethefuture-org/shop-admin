import * as Yup from 'yup';

export const LotteryValidationShema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(50, 'Максимальна довжина 50 символів')
    .required('Обов`язкове поле'),
  description: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),
  start: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),

  finish: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),

  status: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),
});


