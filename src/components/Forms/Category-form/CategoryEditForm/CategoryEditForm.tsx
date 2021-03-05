import React from 'react';
import { Field } from 'formik';

import { Card } from '@material-ui/core';
import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import { formatKey } from '../../Products/ProductForm/productFormHelpers';
import { ErrorFocus } from '../../../ErrorFocus';
import styles from './CategoryEditForm.module.scss';

interface IFormProps {
  setFieldValue: (k: string, f: string) => void;
}

const CategoryEditForm: React.FC<IFormProps> = ({ setFieldValue }) => {
  return (
    <Card>
      <div className={styles['category-form']}>
        <Field fullWidth component={TextFieldWrapped} label="Назва" name="name" makegreen="true" />
        <Field
          fullWidth
          component={TextFieldWrapped}
          type="text"
          label="URL ключ"
          name="key"
          makegreen="true"
          InputProps={{
            onChange: (e) => setFieldValue('key', formatKey(e.target.value)),
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
        />
      </div>
      <ErrorFocus />
    </Card>
  );
};

export default CategoryEditForm;
