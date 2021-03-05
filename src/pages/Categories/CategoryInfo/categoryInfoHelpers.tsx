import * as Yup from 'yup';
import { IGroup } from '../../../interfaces/ICategory';

export const categoryValidationShema = Yup.object().shape({
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
});

export const getFilteredKeys = (charGroup: IGroup[]): IGroup[] =>
  //@ts-ignore
  charGroup.map((group) =>
    Object.fromEntries(
      Object.entries(group)
        .filter(([key, value]) => key !== 'tempId')
        .map(([key, value]) => {
          let updatedValue = value;

          if (key === 'characteristics') {
            updatedValue =
              value && value.length
                ? value.map((v) =>
                    Object.fromEntries(
                      Object.entries(v).filter(
                        ([key, value]) =>
                          key !== 'updatedAt' && key !== 'createdAt' && key !== 'tempId'
                      )
                    )
                  )
                : [];
          }

          return [key, updatedValue];
        })
    )
  );

export const getEditedChar = (charGroup, group, char) =>
  charGroup.map((g) => {
    let resGroup = g;

    if (g.id && g.id === group.id) {
      resGroup = {
        ...g,
        characteristics:
          g.characteristics &&
          g.characteristics.map((c) => {
            let resChar = c;

            if (c.id && c.id === char.id) {
              resChar = char;
            }

            if (c.tempId && c.tempId === char.tempId) {
              resChar = char;
            }

            return resChar;
          }),
      };
    }

    if (g.tempId && g.tempId === group.tempId) {
      resGroup = {
        ...g,
        characteristics:
          g.characteristics &&
          g.characteristics.map((c) => {
            let resChar = c;

            if (c.tempId && c.tempId === char.tempId) {
              resChar = char;
            }

            return resChar;
          }),
      };
    }

    return resGroup;
  });
