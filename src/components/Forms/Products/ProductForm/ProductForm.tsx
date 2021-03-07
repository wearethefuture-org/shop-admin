import React, { useState } from 'react';
import { Field, Form, FormikProps, FormikProvider } from 'formik';
import { Button, Card, DialogActions, MenuItem } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';

import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import ExpandBtn from '../../../ExpandBtn/ExpandBtn';
import GoBackBtn from '../../../GoBackBtn/GoBackBtn';
import FormProductCharacteristics from './FormProductCharacteristics/FormProductCharacteristics';
import { formatKey } from './productFormHelpers';
import { IGetCategoriesResponse } from '../../../../interfaces/ICategory';
import styles from './ProductForm.module.scss';
import { ErrorFocus, ErrorSubFormFocus } from '../../../ErrorFocus';

export interface IProductFormProps {
  editMode: boolean;
  formik: FormikProps<any>;
  handleGoBack: () => void;
  categories: IGetCategoriesResponse[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagesPreview: string[];
  handleDeleteImg: (img: string, idx: number) => void;
  setValidation: (v: any) => void;
}

const ProductForm: React.FC<IProductFormProps> = ({
  editMode = false,
  formik,
  handleGoBack,
  categories,
  handleImageChange,
  imagesPreview,
  handleDeleteImg,
  setValidation,
}) => {
  // EXPAND BLOCKS
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>(['main']);

  const handleExpand = (field: string) =>
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
              disabled={false}
            />
            <h4>Основна інформація</h4>
          </div>
          <div className={expandedBlocks.includes('main') ? 'expanded' : 'shrinked'}>
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
                  type="number"
                  label="Ціна"
                  name="price"
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
                  label="Назва категорії"
                  name="categoryName"
                  makegreen="true"
                  className={styles['edit-field']}
                  value={formik.values.categoryName ?? ''}
                >
                  {categories.length
                    ? categories.map(({ id, name }: IGetCategoriesResponse) => (
                        <MenuItem value={name} key={id}>
                          {name}
                        </MenuItem>
                      ))
                    : []}
                </Field>
              </div>
            </Card>
          </div>
          <div
            className={
              expandedBlocks.includes('images')
                ? styles['expandable-field']
                : styles['expandable-field-shrinked']
            }
          >
            <ExpandBtn
              expandBlock={expandedBlocks.includes('images')}
              handleExpand={() => handleExpand('images')}
              disabled={false}
            />
            <h4>Зображення</h4>
          </div>
          <div className={expandedBlocks.includes('images') ? 'expanded' : 'shrinked'}>
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
                    {imagesPreview.length ? (
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
                    ) : null}
                    <label htmlFor="file" className={styles.label}>
                      <AddAPhotoIcon />
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className={styles['expandable-field']}>
            <ExpandBtn
              expandBlock={expandedBlocks.includes('additional')}
              handleExpand={() => handleExpand('additional')}
              disabled={!formik.values.categoryName}
            />
            <h4>Додаткова інформація</h4>
          </div>
          <div className={expandedBlocks.includes('additional') ? 'expanded' : 'shrinked'}>
            <FormProductCharacteristics
              formik={formik}
              categoryName={formik.values.categoryName}
              setValidation={setValidation}
            />
          </div>
          <DialogActions>
            <Button
              className={styles.customBtn}
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
              type="submit"
              onClick={() => setExpandedBlocks(['main', 'additional'])}
            >
              {editMode ? 'Зберегти' : 'Додати'}
            </Button>
            <Button
              onClick={handleGoBack}
              color="secondary"
              variant="contained"
              type="button"
              className={styles.customBtn}
            >
              Закрити
            </Button>
          </DialogActions>

          {<ErrorFocus /> || <ErrorSubFormFocus />}
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ProductForm;
