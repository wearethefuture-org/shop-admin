import React, { useState } from 'react';
import style from './ProductFilter.module.scss';
import { Button, Dialog, DialogContent, DialogTitle, Slider, Typography } from '@material-ui/core';
import useModal from '../../../../hooks/useModal';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getProductsRequest } from '../../../../store/actions/products.actions';

const validateNumber = (value: number) => {
  if (typeof value !== 'number') {return 'Enter number';}
  if (value < 1) {return 'Must be greater than 1';}
};

const validateString = (value: string) => {
  if (value.length < 3) {return 'To short...';}
  if (value.length > 200) {return  'To long...';}
};

const ProductFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0,2000]);
  const {handleClickOpen, isOpened, handleClose} = useModal();
  const { paginationLimit, sort, sortDirect, filter } = useSelector(
    (state: RootState) => state.products
  );

  const changeValue = (event, value) => {
    setPrice(value);
  };

  const onSubmit = (values: any) => {
    filter.id = values.id ? values.id : null
    filter.name = values.name
    filter.category = values.category
    filter.price = price
    dispatch(getProductsRequest(1, paginationLimit, sort, sortDirect, filter));
    handleClose()
  }

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Фільтри
        </Button>

        <Dialog
          open={isOpened}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="form-dialog-title">Оберіть фільтри:</DialogTitle>
          <DialogContent dividers>
            <Formik
              initialValues={{ 
                id: filter.id, 
                name: filter.name, 
                category: filter.category,
                selectId: !!filter.id,
                selectName: !!filter.name,
                selectCategory: !!filter.category,
               }}
              onSubmit={ onSubmit }
            >
            {({ values, setFieldValue }) => (
              <Form className={style.mainForm}>
                <div className={style.box} >
                  <Field 
                    className={style.checkbox}
                    onClick={() => values.selectId && setFieldValue('id', '')}
                    type="checkbox" 
                    name="selectId" 
                  />
                  <Field 
                    fullWidth
                    validate={values.selectId ? validateNumber : false}
                    component={TextField} 
                    type="number" 
                    label="ID:" 
                    name="id" 
                    disabled={!values.selectId} 
                  />
                </div>
                <div className={style.box} >
                  <Field 
                    className={style.checkbox}
                    onClick={() => values.selectId && setFieldValue('name', '')}
                    type="checkbox" 
                    name="selectName" 
                  />
                  <Field 
                    fullWidth
                    validate={values.selectName ? validateString : false}
                    component={TextField} 
                    type="text" 
                    label="Назва містить:" 
                    name="name" 
                    disabled={!values.selectName} />
                </div>
                <div className={style.box} >
                  <Field 
                    className={style.checkbox} 
                    onClick={() => values.selectId && setFieldValue('category', '')}
                    type="checkbox" 
                    name="selectCategory" 
                  />
                  <Field 
                    fullWidth
                    validate={values.selectCategory ? validateString : false}
                    component={TextField} 
                    type="text" 
                    label="Категорія" 
                    name="category" 
                    disabled={!values.selectCategory} />
                </div>
                <Typography className={style.inputSlider} gutterBottom>Діапазон цін:</Typography>
                <Slider
                  min={0}
                  max={2000}
                  value={price}
                  onChange={changeValue}
                  valueLabelDisplay="auto"
                  name='price'
                  classes={{root: style.root, rail: style.rail, track: style.track, thumb: style.thumb}}
                />

                <Button
                  variant="contained"
                  color="primary" 
                  type="submit"
                >
                  Примінити
                </Button>
              </Form>
            )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProductFilter;
