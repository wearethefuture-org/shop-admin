import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';

import { deleteProductRequest } from '../../../store/actions/products.actions';
import { AppDispatch, RootState } from '../../../store/store';
import ProductImages from './ProductImages/ProductImages';
import ProductDescription from './ProductDescription/ProductDescription';
import DeleteBtn from '../../../components/DeleteBtn/DeleteBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';
import EditBtn from '../../../components/EditBtn/EditBtn';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';
import { confirmDelete } from '../../../components/confirmAlert/confirmAlert';
import ProductCharacteristics from './ProductCharacteristics/ProductCharacteristics';
import { IGetProductById } from '../../../interfaces/IProducts';
import styles from './ProductItem.module.scss';
import { Card } from '@material-ui/core';

const ProductItem: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const product: IGetProductById = useSelector((state: RootState) => state.products.currentProduct);

  const { darkMode } = useSelector((state: RootState) => state.theme);

  const goBack = () => history.push('/products');

  // DELETE PRODUCT
  const handleDeleteProduct = () => {
    const handleConfirm = () => {
      dispatch(deleteProductRequest(product));
      goBack();
    };

    confirmDelete(
      product.name,
      handleConfirm,
      'Продукт та усі пов`язані з ним дані буде неможливо відновити'
    );
  };

  // ADDITIONAL INFO
  const [expandBlock, setExpandBlock] = useState<boolean>(true);

  return (
    <div className={darkMode ? styles['itemCard-dark'] : styles.itemCard}>
      <div className={styles['btn-container']}>
        <GoBackBtn handleGoBack={() => goBack()} />

        <div className={styles['right-btn-wrapper']}>
          <Link
            to={{
              pathname: `${match.path}/edit`,
              state: { from: `${location.pathname}` },
            }}
          >
            <EditBtn handleClick={() => {}} />
          </Link>
          <DeleteBtn handleDelete={handleDeleteProduct} />
        </div>
      </div>

      <p className={styles.breadcrumbs}>
        <span>
          <Link to={'/products'}>Продукти</Link>
        </span>
        <span>
          <ArrowIcon />
        </span>
        <span>
          <Link to={'/categories'}>{product.category?.name}</Link>
        </span>
        <span>
          <ArrowIcon />
        </span>
        <span>{product.name}</span>
      </p>
      <h1>{product.name}</h1>

      <Card>
        <div className={styles['item-main-info']}>
          <ProductImages />
          <ProductDescription />
        </div>

        <div className={styles['item-additional-info']}>
          <ExpandBtn
            expandBlock={expandBlock}
            handleExpand={() => setExpandBlock(!expandBlock)}
            disabled={false}
          >
            <h4>Характеристики</h4>
          </ExpandBtn>

          <div className={expandBlock ? 'expanded' : 'shrinked'}>
            <ProductCharacteristics categoryName={product.category?.name} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
