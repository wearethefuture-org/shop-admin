import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Button, Dialog, MenuItem } from '@material-ui/core';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { ICategoryResponse, ICharToAdd } from '../../../interfaces/ICategory';
import { charTypes, charValidationSchema, getIcon } from './categoryCharModalHelpers';
import {
  CategoryAction,
  CategoryActionTypes,
  Char,
} from '../../../pages/Categories/CategoryInfo/categoryReducer';
import {
  CategoryToDispalayAction,
  CategoryToDisplayActionTypes,
  GroupToDisplay,
} from '../../../pages/Categories/CategoryInfo/categoryToDisplayReducer';
import { RootState } from '../../../store/store';
import styles from './CategoryCharModal.module.scss';

interface IModalProps {
  openCharModal: boolean;
  setOpenCharModal: Dispatch<SetStateAction<boolean>>;
  charToEdit: Char | null;
  setCharToEdit: Dispatch<SetStateAction<Char | null>>;
  group: GroupToDisplay;
  categoryDispatch: Dispatch<CategoryAction>;
  categoryDisplayDispatch: Dispatch<CategoryToDispalayAction>;
}

const CategoryCharModal: React.FC<IModalProps> = ({
  openCharModal,
  setOpenCharModal,
  charToEdit: char,
  setCharToEdit,
  group,
  categoryDispatch,
  categoryDisplayDispatch,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value === 'true' ? (formik.values.required = true) : (formik.values.required = false);
  };

  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );

  const characteristics = category.characteristicGroup.map((group) => group.characteristic).flat(1);

  const initialValues: ICharToAdd = {
    name: char && char.name ? char.name : '',
    description: char && char.description ? char.description : '',
    required: char && char.required ? char.required : false,
    type: char && char.type ? char.type : '',
    defaultVal: char && char?.defaultValues ? char?.defaultValues?.values.join(', ') : '',
    defaultValues: { values: [''] },
    minValue: char && char.minValue ? char.minValue : '',
    maxValue: char && char.maxValue ? char.maxValue : '',
  };

  const formik = useFormik({
    initialValues,

    validationSchema: charValidationSchema,

    onSubmit: (values) => {
      if (values.defaultVal) {
        const res = values.defaultVal.split(',').map((value) => value.trim());
        values.defaultValues = { values: [...res] };
      } else {
        values.defaultValues = null;
      }

      const { defaultVal, ...charValues } = values;

      const filteredKeys = Object.keys(charValues).filter(
        (key) => key === 'required' || key === 'defaultValues' || charValues[key]
      );

      const finalValues: Char = filteredKeys.reduce((acc, key) => {
        acc[key] = charValues[key];
        return acc;
      }, {});

      if (group.name) {
        if (char && char.name) {
          const existingChar = characteristics
            .filter((c) => c.name?.toLowerCase().trim() !== char.name?.toLowerCase().trim())
            .find((c) => c.name?.toLowerCase().trim() === values.name?.toLowerCase().trim());

          if (existingChar) {
            formik.setFieldError('name', 'Характеристика з такою назвою вже існує');
            formik.setSubmitting(false);
            return;
          }

          categoryDispatch({
            type: CategoryActionTypes.editChar,
            group: group,
            prevChar: char,
            editedChar: { ...finalValues, id: char.id && char.id },
          });
          categoryDisplayDispatch({
            type: CategoryToDisplayActionTypes.editChar,
            groupName: group.name,
            prevCharName: char.name,
            editedChar: finalValues,
          });
        } else {
          if (
            characteristics.find(
              (char) => char.name?.toLowerCase() === charValues.name?.toLowerCase()
            )
          ) {
            formik.setFieldError('name', 'Характеристика з такою назвою вже існує');
            formik.setSubmitting(false);
            return;
          }

          categoryDispatch({
            type: CategoryActionTypes.addChar,
            group: group,
            newChar: finalValues,
          });
          categoryDisplayDispatch({
            type: CategoryToDisplayActionTypes.addChar,
            groupName: group.name,
            newChar: finalValues,
          });
        }
      }

      char && setCharToEdit(null);
      setOpenCharModal(false);
    },
  });

  return (
    <Dialog open={openCharModal} onClose={() => setOpenCharModal(false)}>
      <div className={styles['modal-container']}>
        <h5>{char ? 'Редагувати ' : 'Додати '}характеристику</h5>
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

            {formik.values.type !== 'json' ? (
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
            ) : null}

            {(formik.values.type === 'enum' ||
              formik.values.type === 'string' ||
              formik.values.type === 'number') && (
              <Field
                as="textarea"
                fullWidth
                component={TextFieldWrapped}
                label={
                  formik.values.type === 'enum'
                    ? 'Значення (через кому) *'
                    : 'Значення за замовченням'
                }
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
