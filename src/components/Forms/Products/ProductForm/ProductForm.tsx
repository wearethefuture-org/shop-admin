import React, { useCallback, useState } from 'react';
import { Field, Form, FormikProps, FormikProvider } from 'formik';
import { useDropzone } from 'react-dropzone';
import { Button, Card, DialogActions, MenuItem, Select } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';

import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import ExpandBtn from '../../../ExpandBtn/ExpandBtn';
import GoBackBtn from '../../../GoBackBtn/GoBackBtn';
import FormProductCharacteristics from './FormProductCharacteristics/FormProductCharacteristics';
import { formatKey } from './productFormHelpers';
import { ITreeCategory } from '../../../../interfaces/ITreeCategory';
import { ErrorsAlert } from '../../../ErrorsAlert';
import styles from './ProductForm.module.scss';

export interface IProductFormProps {
  editMode: boolean;
  formik: FormikProps<any>;
  handleGoBack: () => void;
  categories: ITreeCategory[];
  handleImageChange: (fileList: File[]) => void;
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

  // DROPZONE
  const onDrop = useCallback(
    (acceptedFiles) => {
      handleImageChange(acceptedFiles);
    },
    [handleImageChange]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/png, image/jpeg, image/jpg, image/gif',
  });

  return (
    <div className={styles['product-form-container']}>
      <div className={styles['go-back-btn']}>
        <GoBackBtn handleGoBack={handleGoBack} />
      </div>
      <h2>{editMode ? 'Редагування продукту' : 'Новий продукт'}</h2>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <ExpandBtn
            expandBlock={expandedBlocks.includes('main')}
            handleExpand={() => handleExpand('main')}
            disabled={false}
          >
            <h4>Основна інформація</h4>
          </ExpandBtn>
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
                <Select
                  type="select"
                  fullWidth
                  label="Назва категорії"
                  name="categoryID"
                  id={'category_id-field'}
                  className={styles['edit-field']}
                  value={formik.values.categoryID}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {categories.length
                    ? categories.map((category) => {
                        return (
                          <MenuItem key={'option' + category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        );
                      })
                    : []}
                </Select>
              </div>
            </Card>
          </div>
          <ExpandBtn
            expandBlock={expandedBlocks.includes('images')}
            handleExpand={() => handleExpand('images')}
            disabled={false}
          >
            <h4>Зображення</h4>
          </ExpandBtn>
          <div className={expandedBlocks.includes('images') ? 'expanded' : 'shrinked'}>
            <Card>
              <div className={styles['block-wrapper']}>
                <div>
                  <input className={styles['file-input']} onChange={onDrop} {...getInputProps()} />

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
                    <div
                      className={isDragActive ? styles['dropzone-active'] : styles.dropzone}
                      {...getRootProps()}
                    >
                      <div
                        className={
                          isDragReject
                            ? styles['dropzone-border-reject']
                            : styles['dropzone-border']
                        }
                      ></div>
                      <AddAPhotoIcon />
                      <p>Виберіть файли або перетягніть їх сюди</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <ExpandBtn
            expandBlock={expandedBlocks.includes('additional')}
            handleExpand={() => handleExpand('additional')}
            disabled={!formik.values.categoryID}
          >
            <h4>Характеристики</h4>
          </ExpandBtn>
          <div className={expandedBlocks.includes('additional') ? 'expanded' : 'shrinked'}>
            <FormProductCharacteristics
              formik={formik}
              categoryId={formik.values.categoryID}
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
          <ErrorsAlert />
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ProductForm;
