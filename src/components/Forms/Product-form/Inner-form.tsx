import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  Grid,
  // LinearProgress,
  MenuItem,
} from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';
import { ICategoryItem } from '../../../interfaces/category-Item';

const useStyles = makeStyles({
  customBtn: {
    marginTop: '15px',
  },
  formControl: {
    marginBottom: '20px',
  },
  addImgTitle: {
    marginTop: '20px',
    marginBottom: 0,
    fontSize: '1rem',
    color: '#858585',
  },
  input: {
    display: 'none',
  },
  labelHolder: {
    maxWidth: '760px',
    minHeight: '100px',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  label: {
    height: '100px',
    width: '100px',
    margin: '10px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  imageWrapper: {
    'position': 'relative',
    'padding': '10px',

    '& .deleteButton': {
      'position': 'absolute',
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
      'width': '18px',
      'height': '18px',
      'top': '4px',
      'right': '4px',
      'color': 'red',
      'backgroundColor': 'white',
      'borderRadius': '50%',
      'zIndex': 10,
      'border': 'none',
      'outline': 'none',
      'visibility': 'hidden',

      '& svg': {
        width: '14px',
        height: '14px',
      },
    },
    '&:hover .deleteButton': {
      visibility: 'visible',
    },
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  },
});

const formatKey = (string) =>
  string
    .toLowerCase()
    .split(/\W/ || ' ')
    .join('-');

const InnerForm: React.FC<ProductFormProps & FormikProps<IProductFormData>> = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  dirty,
  isValid,
  // currencies,
  files,
  mainImg,
  ...otherProps
}) => {
  const { editMode, categories, toggleModal } = otherProps;

  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const imagesFD = new FormData();
  if (images.length) {
    for (let image of images) {
      imagesFD.append('images', image);
    }
    values.files = imagesFD;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList: File[] = Array.from(e.target.files);
      setImages((prev) => prev.concat(fileList));

      const mappedFiles = fileList.map((file) => URL.createObjectURL(file));
      setImagesPreview((prev) => prev.concat(mappedFiles));
    }
  };

  const handleDeleteImg = (img) => setImagesPreview(imagesPreview.filter((image) => image !== img));

  const renderPhotos = (imagesPreview) => (
    <>
      {imagesPreview.map((img) => (
        <div className={classes.imageWrapper} key={img}>
          <button className="deleteButton" type="button">
            <DeleteIcon onClick={() => handleDeleteImg(img)} />
          </button>
          <img key={img} src={img} alt="" className={classes.image} />
        </div>
      ))}
    </>
  );

  const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
      <Form onSubmit={handleSubmit}>
        <Field
          fullWidth
          component={TextFieldWrapped}
          type="text"
          label="Назва"
          name="name"
          makegreen="true"
          onChange={handleChange}
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
          value={formatKey(values.key)}
        />
        <Field
          fullWidth
          multiline
          rowsMax={6}
          component={TextField}
          type="textarea"
          label="Опис"
          name="description"
        />
        <Field
          select
          fullWidth
          component={TextFieldWrapped}
          type="select"
          label="Назва категорії"
          name="categoryName"
          makegreen="true"
        >
          {categories.length
            ? categories.map(({ id, name }: ICategoryItem) => (
                <MenuItem value={name} key={id}>
                  {name}
                </MenuItem>
              ))
            : []}
        </Field>

        <p className={classes.addImgTitle}>Додати зображення</p>

        <div>
          <input
            type="file"
            id="file"
            multiple
            className={classes.input}
            onChange={handleImageChange}
          />
          <div className={classes.labelHolder}>
            {imagesPreview.length ? renderPhotos(imagesPreview) : null}
            <label htmlFor="file" className={classes.label}>
              <AddAPhotoIcon />
            </label>
          </div>
        </div>

        <DialogActions>
          <Button
            className={classes.customBtn}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            {editMode ? 'Зберегти' : 'Додати'}
          </Button>
          <Button
            onClick={toggleModal}
            color="primary"
            variant="contained"
            className={classes.customBtn}
          >
            Закрити
          </Button>
        </DialogActions>
      </Form>
    </Grid>
  );
};

export default InnerForm;
