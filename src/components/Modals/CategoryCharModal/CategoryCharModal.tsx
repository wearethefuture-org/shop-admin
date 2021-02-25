import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, MenuItem } from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import EventIcon from '@material-ui/icons/Event';

import yesNoIcon from '../../../assets/icons/yesNo.svg';
import jsonIcon from '../../../assets/icons/json.svg';
import rangeIcon from '../../../assets/icons/range.svg';
import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { updateCategoryRequest } from '../../../store/actions/categories.actions';
import { RootState } from '../../../store/store';
import styles from './CategoryCharModal.module.scss';

const validationSchema = () =>
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
    minValue: Yup.number().when('type', {
      is: 'range',
      then: Yup.number().required('Обов`язкове поле'),
    }),
    maxValue: Yup.number().when('type', {
      is: 'range',
      then: Yup.number().required('Обов`язкове поле'),
    }),
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

enum charTypes {
  enum = 'Список',
  string = 'Текстове поле',
  number = 'Число',
  boolean = 'Так / Ні',
  json = "Об'єкт",
  date = 'Дата',
  range = 'Діапазон',
}

interface ICharValues {
  name: string;
  description: string;
  required: boolean;
  type: string;
  defaultVal: string;
  defaultValues: { values: string[] } | null;
  minValue: number;
  maxValue: number;
}

interface IModalProps {
  openCharModal: boolean;
  setOpenCharModal: (b: boolean) => void;
  editCharId: number | null;
  setEditCharId: ((id: number) => void) | null;
  charGroupId: number;
}

const CategoryCharModal: React.FC<IModalProps> = ({
  openCharModal,
  setOpenCharModal,
  editCharId,
  setEditCharId,
  charGroupId,
}) => {
  const dispatch = useDispatch();

  const { currentCategory: category } = useSelector((state: RootState) => state.categories);

  const group = category.characteristicGroup.find((group) => group.id === charGroupId);
  const char = group && editCharId && group.characteristic.find((char) => char.id === editCharId);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value === 'true' ? (formik.values.required = true) : (formik.values.required = false);
  };

  const formik = useFormik({
    initialValues: {
      name: (char && char.name) ?? '',
      description: (char && char.description) ?? '',
      required: (char && char.required) ?? false,
      type: (char && char.type) ?? '',
      defaultVal: char?.defaultValues?.values.join(', ') ?? '',
      defaultValues: null,
      minValue: (char && char.minValue) ?? '',
      maxValue: (char && char.maxValue) ?? '',
    },

    validationSchema,

    onSubmit: (values: ICharValues): void => {
      if (values.defaultVal) {
        const res = values.defaultVal.split(',').map((value) => value.trim().toLowerCase());
        values.defaultValues = { values: [...res] };
      }

      const { name, description, required, type, defaultValues, minValue, maxValue } = values;

      const newChar = {
        id: category.id,
        characteristicGroups: [
          {
            id: charGroupId,
            characteristics: [
              {
                name,
                description,
                required,
                type,
                defaultValues,
                minValue,
                maxValue,
                categoryId: category.id,
              },
            ],
          },
        ],
      };

      const updatedChar = char && {
        id: category.id,
        characteristicGroups: [
          {
            id: charGroupId,
            characteristics: [
              {
                id: char.id,
                name,
                description,
                required,
                type,
                defaultValues,
                minValue,
                maxValue,
                categoryId: category.id,
              },
            ],
          },
        ],
      };

      if (char) {
        // @ts-ignore
        dispatch(updateCategoryRequest(updatedChar));
      } else {
        // @ts-ignore
        dispatch(updateCategoryRequest(newChar));
      }

      editCharId && setEditCharId && setEditCharId(-1);
      setOpenCharModal(false);
    },
  });

  return (
    <Dialog open={openCharModal} onClose={() => setOpenCharModal(false)}>
      <div className={styles['modal-container']}>
        <h5>{editCharId ? 'Редагувати ' : 'Додати '}характеристику</h5>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Field
              fullWidth
              component={TextFieldWrapped}
              label="Назва *"
              name="name"
              makegreen="true"
            />

            <Field
              fullWidth
              component={TextFieldWrapped}
              label="Опис *"
              name="description"
              makegreen="true"
            />

            <Field
              select
              fullWidth
              component={TextFieldWrapped}
              label="Є обов'язковою характеристикою"
              name="requred"
              makegreen="true"
              value={formik.values.required ?? ''}
              onChange={handleOnChange}
            >
              <MenuItem value={'true'}>Так</MenuItem>
              <MenuItem value={'false'}>Ні</MenuItem>
            </Field>

            <Field
              select
              fullWidth
              component={TextFieldWrapped}
              label="Тип *"
              name="type"
              makegreen="true"
              value={formik.values.type ?? ''}
            >
              {Object.entries(charTypes).map((type) => (
                <MenuItem key={type[0]} value={type[0]}>
                  <span className={styles['list-icon']}>{getIcon(type[0])}</span>
                  <span>{type[1]}</span>
                </MenuItem>
              ))}
            </Field>

            {formik.values.type === 'enum' && (
              <Field
                as="textarea"
                fullWidth
                component={TextFieldWrapped}
                label="Значення (через кому) *"
                name="defaultVal"
                makegreen="true"
              />
            )}

            {formik.values.type === 'range' && (
              <>
                <Field
                  component={TextFieldWrapped}
                  type="number"
                  label="Від *"
                  name="minValue"
                  makegreen="true"
                />
                <Field
                  component={TextFieldWrapped}
                  type="number"
                  label="До *"
                  name="maxValue"
                  makegreen="true"
                />
              </>
            )}

            <Button variant="contained" color="primary" type="submit">
              Зберегти
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default CategoryCharModal;
