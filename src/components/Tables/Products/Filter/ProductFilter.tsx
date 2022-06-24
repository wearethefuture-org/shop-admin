import React, { useState } from 'react';
import style from './ProductFilter.module.scss';
import { Button, Dialog, DialogContent, DialogTitle, Slider, Typography } from '@material-ui/core';
import useModal from '../../../../hooks/useModal';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { IProductsFilter } from '../../../../interfaces/IProducts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getProductsRequest } from '../../../../store/actions/products.actions';

const ProductFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([200,1500]);
  const {handleClickOpen, isOpened, handleClose} = useModal();
  const { paginationPage, paginationLimit, sort, sortDirect, filter } = useSelector(
    (state: RootState) => state.products
  );

  const changeValue = (event, value) => {
    setPrice(value);
  };

  const onSubmit = (values: IProductsFilter) => {
    filter.id = values.id
    filter.name = values.name
    filter.category = values.category
    filter.price = price
    dispatch(getProductsRequest(paginationPage, paginationLimit, sort, sortDirect, filter));
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
              initialValues={{ id: filter.id, name: filter.name, category: filter.category }}
              onSubmit={ onSubmit }
            >
              <Form className={style.mainForm}>
                <Field fullWidth multiline component={TextField} type="text" label="ID:" name="id" />
                <Field fullWidth multiline component={TextField} type="text" label="Назва містить:" name="name" />
                <Field fullWidth multiline component={TextField} type="text" label="Категорія" name="category" />
                <Typography id="input-slider" gutterBottom>Діапазон цін:</Typography>
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
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProductFilter;
