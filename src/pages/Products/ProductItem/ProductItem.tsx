import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { deleteProductRequest } from '../../../store/actions';
import { RootState } from '../../../store/store';
import ProductImages from './ProductImages/ProductImages';
import ProductDescription from './ProductDescription/ProductDescription';
import DeleteBtn from '../../../components/DeleteBtn/DeleteBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';
import EditBtn from '../../../components/EditBtn/EditBtn';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';
import styles from './ProductItem.module.scss';

const ProductItem: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const { currentProduct: product } = useSelector((state: RootState) => state.products);

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

        <p className={styles.breadcrumbs}>
          <span>
            <Link to={'/products'}>Продукти</Link>
          </span>
          <span>
            <ArrowRightIcon />
          </span>
          <span>
            <Link to={'/categories'}>{product.category?.name}</Link>
          </span>
          <span>
            <ArrowRightIcon />
          </span>
          <span>{product.name}</span>
        </p>
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
    </>
  );
};

export default ProductItem;
