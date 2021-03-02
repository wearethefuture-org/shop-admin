import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Button, Dialog, MenuItem } from '@material-ui/core';
import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { updateCategoryRequest } from '../../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import { ICategoryResponse } from '../../../interfaces/ICategory';
import { charTypes, charValidationSchema, getIcon } from './categoryCharModalHelpers';
import styles from './CategoryCharModal.module.scss';

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
  const dispatch: AppDispatch = useDispatch();

  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );

  const group = category.characteristicGroup.find((group) => group.id === charGroupId);
  const char = group && editCharId && group.characteristic.find((char) => char.id === editCharId);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value === 'true' ? (formik.values.required = true) : (formik.values.required = false);
  };

  const formik = useFormik({
    initialValues: {
      name: char && char.name ? char.name : '',
      description: char && char.description ? char.description : '',
      required: char && char.required ? char.required : false,
      type: char && char.type ? char.type : '',
      defaultVal: char && char?.defaultValues ? char?.defaultValues?.values.join(', ') : '',
      defaultValues: { values: [''] },
      minValue: char && char.minValue ? char.minValue : 0,
      maxValue: char && char.maxValue ? char.maxValue : 0,
    },

    validationSchema: charValidationSchema,

    onSubmit: (values) => {
      if (values.defaultVal) {
        const res = values.defaultVal.split(',').map((value) => value.trim());
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
        updatedChar && dispatch(updateCategoryRequest(updatedChar));
      } else {
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
