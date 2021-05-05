import React from 'react';
import { Field, useFormikContext } from 'formik';
import { Card, MenuItem } from '@material-ui/core';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { formatKey } from '../Products/ProductForm/productFormHelpers';
import styles from './CategoryEditForm.module.scss';
import useMainCategories from "../../../hooks/useMainCategories";
import { IGetMainCategoriesResponse } from "../../../interfaces/IMainCategory";
import { IAddCategory } from "../../../interfaces/ICategory";


const CategoryEditForm = () => {
  const formik = useFormikContext<IAddCategory>();

  const { data: mainCategoriesList } = useMainCategories();

  return (
    <Card>
      <div className={ styles['block-wrapper-main'] }>
        <Field
          fullWidth
          component={ TextFieldWrapped }
          label="Назва"
          name="name"
          makegreen="true"
          className={ styles['edit-field'] }
        />

        <Field
          fullWidth
          component={ TextFieldWrapped }
          type="text"
          label="URL ключ"
          name="key"
          makegreen="true"
          className={ styles['edit-field'] }
          InputProps={ {
            onChange: (e) => formik.setFieldValue('key', formatKey(e.target.value)),
          } }
        />

        <Field
          fullWidth
          multiline
          rowsMax={ 6 }
          component={ TextFieldWrapped }
          type="textarea"
          label="Опис"
          name="description"
          makegreen="true"
          className={ styles['edit-field'] }
        />
        <Field
          select
          fullWidth
          component={ TextFieldWrapped }
          label="Головна категорія *"
          name="mainCategory"
          makegreen="true"
          className={ styles['edit-field'] }
          value={ formik.values.mainCategory ?? '' }
        >
          { mainCategoriesList.length
            ? mainCategoriesList.map(({ id, name }: IGetMainCategoriesResponse) => (
              <MenuItem value={ name } key={ id }>
                { name }
              </MenuItem>
            ))
            : [] }
        </Field>
      </div>
    </Card>
  );
};

export default CategoryEditForm;
