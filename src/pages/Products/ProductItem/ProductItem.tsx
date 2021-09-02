import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import { Card, Switch } from '@material-ui/core';

import {
  deleteProductRequest,
  disableProductRequest,
  updateAvailabilityProductRequest,
} from '../../../store/actions/products.actions';
import { AppDispatch, RootState } from '../../../store/store';
import ProductImages from './ProductImages/ProductImages';
import ProductDescription from './ProductDescription/ProductDescription';
import DeleteBtn from '../../../components/DeleteBtn/DeleteBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';
import EditBtn from '../../../components/EditBtn/EditBtn';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';
import ProductCharGroups from './ProductCharacteristics/ProductCharGroups';
import { IGetProductById } from '../../../interfaces/IProducts';
import CustomConfirm from '../../../components/CustomConfirm/CustomConfirm';
import styles from './ProductItem.module.scss';

const ProductItem: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const product: IGetProductById = useSelector((state: RootState) => state.products.currentProduct);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const goBack = () => history.push('/products');

  // DELETE PRODUCT
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleDeleteProduct = () => {
    dispatch(deleteProductRequest(product));
    goBack();
  };

  // UPDATE AVAILABILITY PRODUCT
  const [productStatus, setProductStatus] = useState<{ availability: boolean; disabled: boolean }>({
    availability: product.availability,
    disabled: product.disabled,
  });
  const handleUpdateAvailability = (e) => {
    const data = {
      availability: e.target.checked,
      productId: product.id,
      categoryName: product.category.name,
    };
    setProductStatus((prevState) => ({ ...prevState, availability: data.availability }));
    dispatch(updateAvailabilityProductRequest(data));
  };

  const handleDisableProduct: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const data = {
      disabled: e.target.checked,
      productId: product.id,
      categoryName: product.category.name,
    };
    setProductStatus((prevState) => ({ ...prevState, disabled: data.disabled }));
    dispatch(disableProductRequest(data));
  };

  // ADDITIONAL INFO
  const [expandBlock, setExpandBlock] = useState<boolean>(true);

  useEffect(() => {
    if (product.disabled !== productStatus.disabled) {
      setProductStatus((prevState) => ({ ...prevState, disabled: product.disabled }));
    }

    if (product.availability !== productStatus.availability) {
      setProductStatus((prevState) => ({ ...prevState, availability: product.availability }));
    }
  }, [product.availability, product.disabled, productStatus]);

  return (
    <div className={darkMode ? styles['itemCard-dark'] : styles.itemCard}>
      {openDeleteDialog && (
        <CustomConfirm
          openDeleteDialog={openDeleteDialog}
          closeDeleteDialog={() => setOpenDeleteDialog(false)}
          name={product.name}
          warning="Продукт та усі пов`язані з ним дані буде неможливо відновити"
          handleDelete={handleDeleteProduct}
        />
      )}

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
          <DeleteBtn handleDelete={() => setOpenDeleteDialog(true)} />
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
      <div className={styles.availability}>
        <h1>{product.name}</h1>
        <div className={styles.switch}>
          <span>Наявність</span>
          <Switch
            checked={productStatus.availability}
            onChange={handleUpdateAvailability}
            name="isWidgetActiveNewArrivals"
          />
        </div>
        <div>
          <span>Disabled</span>
          <Switch
            checked={productStatus.disabled}
            onChange={handleDisableProduct}
            name="isWidgetActiveNewArrivals"
          />
        </div>
      </div>

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
            <ProductCharGroups categoryName={product.category?.name} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
