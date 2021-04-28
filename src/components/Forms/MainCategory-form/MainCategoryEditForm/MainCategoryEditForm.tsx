import React from 'react';
import { Field, useFormikContext } from 'formik';

import { Card } from '@material-ui/core';
import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import { formatKey } from '../../Products/ProductForm/productFormHelpers';
import styles from './MainCategoryEditForm.module.scss';

const MainCategoryEditForm = () => {
  const formik = useFormikContext();

  return (
    <Card>
      <div className={styles['category-form']}>
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
      </div>
    </Card>
  );
};

export default MainCategoryEditForm;
