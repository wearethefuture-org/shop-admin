import React from 'react';
import { Field, useFormikContext } from 'formik';
import { Card, MenuItem } from '@material-ui/core';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { formatKey } from '../Products/ProductForm/productFormHelpers';
import styles from './TreeCategoryEditForm.module.scss';
import { IGetMainCategoriesResponse } from '../../../interfaces/IMainCategory';
import { IAddTreeCategory } from '../../../interfaces/ITreeCategory';

const TreeCategoryEditForm = () => {
  const formik = useFormikContext<IAddTreeCategory>();

  return (
    <Card>
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
      </div>
    </Card>
  );
};

export default TreeCategoryEditForm;
