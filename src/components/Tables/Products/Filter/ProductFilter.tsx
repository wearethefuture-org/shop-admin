import React, { useEffect, useState } from 'react';
import style from './ProductFilter.module.scss';
import { Button, Dialog, DialogContent, DialogTitle, Slider, Typography } from '@material-ui/core';
import useModal from '../../../../hooks/useModal';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getProductsRequest } from '../../../../store/actions/products.actions';

const validateString = (value: string) => {
  if (value.length < 3) {return 'To short...';}
  if (value.length > 200) {return  'To long...';}
};

const ProductFilter: React.FC = () => {
  const { paginationLimit, sort, sortDirect, filter, findPrice } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 100]);
  const [isPriceChecked, setPriceChecked] = useState(false);
  const {handleClickOpen, isOpened, handleClose} = useModal();

  useEffect(() => {
    setPrice(filter.price)
  }, [filter.price])

  const changeValue = (event, value) => {
    setPrice(value);
  };

  const onSubmit = (values: any) => {
    filter.shop = values.shop
    filter.category = values.category
    filter.price = values.selectPrice ? price : findPrice
    dispatch(getProductsRequest(1, paginationLimit, sort, sortDirect, filter));
    handleClose()
  }

  const marks = [
    {
      value: findPrice[0],
      label: `${findPrice[0]}`,
    },
    {
      value: findPrice[1],
      label: `${findPrice[1]}`,
    },
  ];

  return (
    <>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={handleClickOpen}
        >
          Фільтри
        </Button>

        <Dialog
          open={isOpened}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle id='form-dialog-title'>Оберіть фільтри:</DialogTitle>
          <DialogContent dividers>
            <Formik
              initialValues={{ 
                category: filter.category,
                shop: filter.shop,
                selectCategory: !!filter.category,
                selectShop: !!filter.shop,
                selectPrice: isPriceChecked,
               }}
              onSubmit={ onSubmit }
            >
            {({ values, setFieldValue }) => (
              <Form className={style.mainForm}>
                <div className={style.box} >
                  <Field 
                    className={style.checkbox} 
                    onClick={() => values.selectCategory && setFieldValue('category', '')}
                    type='checkbox' 
                    name='selectCategory' 
                  />
                  <Field 
                    fullWidth
                    validate={values.selectCategory ? validateString : false}
                    component={TextField} 
                    type='text' 
                    label='Категорія' 
                    name='category' 
                    disabled={!values.selectCategory} />
                </div>
                <div className={style.box} >
                  <Field 
                    className={style.checkbox} 
                    onClick={() => values.selectShop && setFieldValue('shop', '')}
                    type='checkbox' 
                    name='selectShop' 
                  />
                  <Field 
                    fullWidth
                    validate={values.selectShop ? validateString : false}
                    component={TextField} 
                    type='text' 
                    label='Магазин' 
                    name='shop' 
                    disabled={!values.selectShop} />
                </div>
                <div className={style.box} >
                  <Field 
                    className={style.checkboxSlider} 
                    type='checkbox' 
                    onClick={() => isPriceChecked ? setPriceChecked(false) : setPriceChecked(true) }
                    name='selectPrice' 
                  />
                  <div className={style.sliderContainer} >
                    <Typography 
                      className={style.inputSlider} 
                      style={values.selectPrice ? {color: 'rgba(0, 0, 0, 0.54)'} : {color: 'rgba(0, 0, 0, 0.38)'}}
                    >Ціна:</Typography>
                    <Slider
                      min={findPrice[0]}
                      max={findPrice[1]}
                      value={values.selectPrice ? price : findPrice}
                      onChange={changeValue}
                      valueLabelDisplay='auto'
                      name='price'
                      marks={marks}
                      classes={{root: style.root, rail: style.rail, track: style.track, thumb: style.thumb, markLabel: style.markLabel}}
                      disabled={!values.selectPrice}
                    />
                  </div>
                </div>
                <Button
                  variant='contained'
                  color='primary' 
                  type='submit'
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
