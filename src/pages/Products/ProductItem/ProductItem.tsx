import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import {
  alpha,
  Card,
  createStyles,
  makeStyles,
  Switch,
  Theme,
  ThemeOptions,
} from '@material-ui/core';

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
import { COLORS } from '../../../values/colors';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      switch: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.primaryGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.primaryGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.primaryGreen,
        },
        'margin': 'left',
      },
      switchDark: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.darkGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.darkGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.darkGreen,
        },
        'margin': 'left',
      },
    })
);

const ProductItem: React.FC = () => {
  const classes = useStyles();
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
  const [productStatus, setProductStatus] = useState<{
    availability: boolean;
    disabled: boolean;
  }>({
    availability: product.availability,
    disabled: product.disabled,
  });
  const handleUpdateAvailability = (e) => {
    const data = {
      availability: e.target.checked,
      productId: product.id,
      categoryID: product.category.id,
    };
    setProductStatus((prevState) => ({
      ...prevState,
      availability: data.availability,
    }));
    dispatch(updateAvailabilityProductRequest(data));
  };

  const handleDisableProduct: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const data = {
      disabled: e.target.checked,
      productId: product.id,
      categoryID: product.category.id,
    };

    setProductStatus((prevState) => ({
      ...prevState,
      disabled: data.disabled,
    }));
    dispatch(disableProductRequest(data));
  };

  // ADDITIONAL INFO
  const [expandBlock, setExpandBlock] = useState<boolean>(true);

  useEffect(() => {
    if (product.disabled !== productStatus.disabled) {
      setProductStatus((prevState) => ({
        ...prevState,
        disabled: product.disabled,
      }));
    }

    if (product.availability !== productStatus.availability) {
      setProductStatus((prevState) => ({
        ...prevState,
        availability: product.availability,
      }));
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
          <span className={styles['switch-info']}>Наявність</span>
          <Switch
            className={darkMode ? classes.switchDark : classes.switch}
            checked={productStatus.availability}
            onChange={handleUpdateAvailability}
            name="isWidgetActiveNewArrivals"
          />
        </div>
        <div>
          <span className={styles['switch-info']}>Disabled</span>
          <Switch
            className={classes.switch}
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
            <ProductCharGroups categoryId={product.category?.id} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
