import React, { useState } from 'react';
import { LinearProgress } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { deleteProductRequest } from '../../../store/actions';
import { RootState } from '../../../store/store';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ProductImages from './ProductImages/ProductImages';
import ProductDescription from './ProductDescription/ProductDescription';
import styles from './ProductItem.module.scss';
import DeleteBtn from '../../../components/DeleteBtn/DeleteBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';
import EditBtn from '../../../components/EditBtn/EditBtn';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';

const ProductItem: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const product = useSelector((state: RootState) => state.products.currentProduct);

  const goBack = () => history.push('/products');

  // DELETE PRODUCT
  const handleDeleteProduct = () => {
    dispatch(deleteProductRequest(product.id));
    goBack();
  };

  // ADDITIONAL INFO
  const [expandBlock, setExpandBlock] = useState(false);

  return (
    <>
      {!product ? (
        <LinearProgress />
      ) : (
        <div className={styles.itemCard}>
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

          <h1>{product.name}</h1>

          <div className={styles['item-main-info']}>
            <ProductImages product={product} />
            <ProductDescription product={product} />
          </div>

          <div className={styles['item-additional-info']}>
            <div className={styles['expand-field']}>
              <ExpandBtn
                expandBlock={expandBlock}
                handleExpand={() => setExpandBlock(!expandBlock)}
              />
              <span>Характеристики</span>
            </div>
            {expandBlock ? (
              <div className={styles['additional-info-block']}>
                <ul>
                  <li>Some info</li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
