import React from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Button, Dialog, MenuItem } from '@material-ui/core';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { IChar, ICharToAdd, IGroup } from '../../../interfaces/ICategory';
import { charTypes, charValidationSchema, getIcon } from './categoryCharModalHelpers';
import styles from './CategoryCharModal.module.scss';

interface IModalProps {
  openCharModal: boolean;
  setOpenCharModal: (b: boolean) => void;
  handleAddChar: (c: ICharToAdd, n: string) => void;
  handleEditChar: (c: IChar, group: IGroup) => void;
  charToEdit: IChar | null;
  setCharToEdit: (char: IChar | null) => void;
  group: IGroup;
}

const CategoryCharModal: React.FC<IModalProps> = ({
  openCharModal,
  setOpenCharModal,
  handleAddChar,
  handleEditChar,
  charToEdit: char,
  setCharToEdit,
  group,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value === 'true' ? (formik.values.required = true) : (formik.values.required = false);
  };

  const initialValues: ICharToAdd = {
    name: char && char.name ? char.name : '',
    description: char && char.description ? char.description : '',
    required: char && char.required ? char.required : false,
    type: char && char.type ? char.type : '',
    defaultVal: char && char?.defaultValues ? char?.defaultValues?.values.join(', ') : '',
    defaultValues: { values: [''] },
    minValue: (char && char.minValue) ?? '',
    maxValue: (char && char.maxValue) ?? '',
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

      const nullableValues = Object.entries(charValues).map(([key, value]) => [
        key,
        value || key === 'required' ? value : null,
      ]);

      const finalValues: ICharToAdd = Object.fromEntries(nullableValues);

      const existingName =
        group &&
        group.characteristics &&
        group.characteristics.find(
          (char) => char.name?.toLowerCase() === values.name?.toLowerCase()
        );

      if (group && group.name) {
        if (existingName && !char) {
          formik.setFieldError('name', 'Характеристика з такою назвою вже існує');
          formik.setSubmitting(false);
          return;
        } else {
          handleAddChar(finalValues, group.name);
        }
      }

      if (group && char) {
        char.id
          ? handleEditChar({ id: char.id, ...finalValues }, group)
          : handleEditChar({ tempId: char.tempId, ...finalValues }, group);
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
