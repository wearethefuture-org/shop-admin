import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';

import ProductForm from '../Forms/Product-form/Product-form';
import { IActions } from '../../interfaces/actions';
import { ICategoryItem } from '../../interfaces/category-Item';
import { useDispatch } from 'react-redux';

interface IModalData {
  fetchFun: (...props: any) => IActions;
  isOpened: boolean;
  toggleModal: () => void;
  categories: ICategoryItem[];
  props?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const ProductModal: React.FC<IModalData> = ({
  fetchFun,
  isOpened,
  toggleModal,
  categories,
  props,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Modal
      className={classes.modal}
      open={isOpened}
      onClose={toggleModal}
      aria-labelledby="simple-modal-title"
    >
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Додати новий продукт</h2>
        <ProductForm
          toggleModal={toggleModal}
          dispatch={dispatch}
          fetchFun={fetchFun}
          categories={categories}
          {...props}
        />
      </div>
    </Modal>
  );
};

export default ProductModal;
