import React, { useState } from 'react';
import { Field, Form, FormikProps, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Button, Card, DialogActions, MenuItem } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';

import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import ExpandBtn from '../../../ExpandBtn/ExpandBtn';
import { ICategory, IProductFormData } from '../../../../interfaces/IProducts';
import GoBackBtn from '../../../GoBackBtn/GoBackBtn';
import styles from './ProductForm.module.scss';

export const productValidationShema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(50, 'Максимальна довжина 50 символів')
    .required('Обов`язкове поле'),
  price: Yup.number().positive('Число повинно бути більше нуля').required('Обов`язкове поле'),
  description: Yup.string()
    .min(10, 'Мінімальна довжина 10 символів')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),
  categoryName: Yup.string().required('Обов`язкове поле'),
  key: Yup.string()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(30, 'Максимальна довжина 30 символів')
    .matches(
      /(^[a-z0-9-]+$)/,
      'Може містити латинські літери в нижньому регістрі (a-z), цифри (0-9), знак тире (-)'
    )
    .required('Обов`язкове поле'),
});

const formatKey = (string) =>
  string
    .toLowerCase()
    .split(/\W/ || ' ')
    .join('-');

const renderPhotos = (imagesPreview, handleDeleteImg) => (
  <>
    {imagesPreview.map((img, idx) => (
      <div className={styles['img-wrapper']} key={img}>
        <button className={styles['delete-img']} type="button">
          <DeleteIcon onClick={() => handleDeleteImg(img, idx)} />
        </button>
        <img key={img} src={img} alt="" className={styles.image} />
      </div>
    ))}
  </>
);

interface IProductFormProps {
  editMode: boolean;
  formik: FormikProps<IProductFormData>;
  handleGoBack: () => void;
  categories: ICategory[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagesPreview: string[];
  handleDeleteImg: (img: string, idx: number) => void;
}

const ProductForm: React.FC<IProductFormProps> = ({
  editMode = false,
  formik,
  handleGoBack,
  categories,
  handleImageChange,
  imagesPreview,
  handleDeleteImg,
}) => {
  // EXPAND BLOCKS
  const [expandedBlocks, setExpandedBlocks] = useState(['main']);

  const handleExpand = (field) =>
    expandedBlocks.includes(field)
      ? setExpandedBlocks(expandedBlocks.filter((block) => block !== field))
      : setExpandedBlocks([...expandedBlocks, field]);

  return (
    <div className={styles['product-form-container']}>
      <div className={styles['go-back-btn']}>
        <GoBackBtn handleGoBack={handleGoBack} />
      </div>
      <h2>{editMode ? 'Редагування продукту' : 'Новий продукт'}</h2>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className={styles['expandable-field']}>
            <ExpandBtn
              expandBlock={expandedBlocks.includes('main')}
              handleExpand={() => handleExpand('main')}
            />
            <h4>Основна інформація</h4>
          </div>
          {expandedBlocks.includes('main') ? (
            <Card>
              <div className={styles['block-wrapper-main']}>
                <Field
                  fullWidth
                  component={TextFieldWrapped}
                  label="Назва"
                  name="name"
                  makegreen="true"
                />
                <Field
                  fullWidth
                  component={TextFieldWrapped}
                  type="number"
                  label="Ціна"
                  name="price"
                  makegreen="true"
                />
                <Field
                  fullWidth
                  component={TextFieldWrapped}
                  type="text"
                  label="URL ключ"
                  name="key"
                  makegreen="true"
                  value={formatKey(formik.values.key)}
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
                <Field
                  select
                  fullWidth
                  component={TextFieldWrapped}
                  label="Назва категорії"
                  name="categoryName"
                  makegreen="true"
                  value={formik.values.categoryName ?? ''}
                >
                  {categories.length
                    ? categories.map(({ id, name }: ICategory) => (
                        <MenuItem value={name} key={id}>
                          {name}
                        </MenuItem>
                      ))
                    : []}
                </Field>
              </div>
            </Card>
          ) : null}

          <div className={styles['expandable-field']}>
            <ExpandBtn
              expandBlock={expandedBlocks.includes('images')}
              handleExpand={() => handleExpand('images')}
            />
            <h4>Зображення</h4>
          </div>
          {expandedBlocks.includes('images') ? (
            <Card>
              <div className={styles['block-wrapper']}>
                <div>
                  <input
                    type="file"
                    id="file"
                    multiple
                    className={styles['file-input']}
                    onChange={handleImageChange}
                  />
                  <div className={styles.labelHolder}>
                    {imagesPreview.length ? renderPhotos(imagesPreview, handleDeleteImg) : null}
                    <label htmlFor="file" className={styles.label}>
                      <AddAPhotoIcon />
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}

          <div className={styles['expandable-field']}>
            <ExpandBtn
              expandBlock={expandedBlocks.includes('additional')}
              handleExpand={() => handleExpand('additional')}
            />
            <h4>Додаткова інформація</h4>
          </div>
          {expandedBlocks.includes('additional') ? (
            <Card>
              <div className={styles['block-wrapper']}>
                <p>Lorem Ipsum</p>
              </div>
            </Card>
          ) : null}
          <DialogActions>
            <Button
              className={styles.customBtn}
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
              type="submit"
            >
              {editMode ? 'Зберегти' : 'Додати'}
            </Button>
            <Button
              onClick={handleGoBack}
              color="secondary"
              variant="contained"
              className={styles.customBtn}
            >
              Закрити
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ProductForm;
