import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ProductsTable from '../../components/Tables/Products/Products-table';
import useProducts from '../../hooks/useProducts';
import useModal from '../../hooks/useModal';
import ProductModal from '../../components/Modals/Product-modal';
import { addProductRequest } from '../../store/actions';
import useCategories from '../../hooks/useCategories';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 10,
    },
    tableContainer: {
      margin: 20,
    },
  })
);

const Products: React.FC = () => {
  const classes = useStyles();

  const { data: productsData, dispatch } = useProducts();
  const { data: categoriesData } = useCategories();
  const { isOpened, toggleModal } = useModal();

  const modalData = {
    dispatch,
    fetchFun: addProductRequest,
    isOpened,
    toggleModal,
    categories: categoriesData,
  };

  return (
    <>
      <div className={`${classes.buttonContainer}`}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={`${classes.margin}`}
          startIcon={<AddIcon />}
          onClick={toggleModal}
        >
          Додати продукт
        </Button>

        {isOpened && <ProductModal {...modalData} />}
      </div>
      <div className={`${classes.tableContainer}`}>
        <ProductsTable {...productsData} />
      </div>
    </>
  );
};

export default Products;
