import * as Yup from 'yup';

export const treeCategoryValidationShema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(50, 'Максимальна довжина 50 символів')
    .required('Обов`язкове поле'),
  key: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(30, 'Максимальна довжина 30 символів')
    .matches(
      /(^[a-z0-9-]+$)/,
      'Може містити латинські літери в нижньому регістрі (a-z), цифри (0-9), знак тире (-)'
    )
    .required('Обов`язкове поле'),
  description: Yup.string()
    .trim()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),
  icon: Yup.mixed()
    .required('Потрібно додати зображення')
    .test('fileSize', 'Занадто великий файл', (value) => {
      return value && (typeof value === 'string' || value.size <= 10000000);
    })
    .test('fileFormat', 'Формат не підтримується', (value) => {
      return value && (typeof value === 'string' || 'image/svg+xml'.includes(value.type));
    }),
});
