import React from 'react';
import { Field, useFormikContext, FormikProps,  } from 'formik';

import { Card, MenuItem } from '@material-ui/core';
import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import { formatKey } from '../../Products/ProductForm/productFormHelpers'; 
import styles from './CategoryEditForm.module.scss';
import { IGetMainCategoriesResponse } from '../../../../interfaces/IMainCategory';
import useMainCategories from '../../../../hooks/useMainCategories';



const CategoryEditForm = ({
  formik,
  
}) => {
  //const formik = useFormikContext();  
  const { data: mainCategoriesList } = useMainCategories();
  return (
    <Card >
      <div className={styles['block-wrapper-main']}>
        <Field
          fullWidth
          component={TextFieldWrapped}
          label="Назва"
          name="name"
          makegreen="true"
          className={styles['edit-field']}
        />
        <Field
          fullWidth
          component={TextFieldWrapped}
          type="text"
          label="URL ключ"
          name="key"
          makegreen="true"
          className={styles['edit-field']}
          InputProps={{
            onChange: (e) => formik.setFieldValue('key', formatKey(e.target.value)),
          }}
        />
        <Field
          fullWidth
          multiline
          rowsMax={6}
          component={TextFieldWrapped}
          type="textarea"
          label="Опис"
          name="description"
          makegreen="true"
          className={styles['edit-field']}
        />
        <Field
          select
          fullWidth
          component={TextFieldWrapped}
          label="Головна категорія *"
          name="mainCategory"
          makegreen="true"
          className={styles['edit-field']}
          value={formik.values.mainCategory ?? ''}
          >
            {mainCategoriesList.length
              ? mainCategoriesList.map(({ id, name }: IGetMainCategoriesResponse) => (
                  <MenuItem value={name} key={id}>
                    {name}
                  </MenuItem>
                ))
              : []}
          </Field>        
      </div>
    </Card>
  );
};

export default CategoryEditForm;
