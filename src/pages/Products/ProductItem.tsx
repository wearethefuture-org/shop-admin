import React, { useEffect, useState } from 'react';
import { Button, createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import StarFilledIcon from '@material-ui/icons/Star';
import StarIcon from '@material-ui/icons/StarBorder';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { root } from '../../api/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductRequest,
  getProductByIdRequest,
  uploadMainImgRequest,
} from '../../store/actions';
import { RootState } from '../../store/store';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    itemCard: {
      padding: '2rem',
    },
    itemMain: {
      display: 'flex',
      marginTop: '20px',
    },
    description: {
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#fff',
    },
    field: {
      'display': 'flex',
      'alignItems': 'baseline',
      'borderBottom': '1px solid #ddd',
      'padding': '1rem',

      '& p': {
        marginBottom: 0,
      },
    },
    edit: {
      color: '#ddd',
      marginLeft: '16px',
      transform: 'translateY(-5px)',
    },
    fieldTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginRight: '10px',
      color: '#555',
    },
    fieldValue: {
      fontSize: '1.3rem',
      fontStyle: 'italic',
    },
    gallery: {
      width: '600px',
      minHeight: '100vh',
      flexShrink: 0,
      marginRight: '20px',
    },
    largeImg: {
      padding: '10px',
      position: 'relative',
    },
    croppedImg: {
      display: 'inline-flex',
      objectFit: 'contain',
      maxWidth: '100px',
      height: 'auto',
      margin: '10px',
    },
    favIcon: {
      cursor: 'pointer',
      position: 'absolute',
      right: 20,
      top: 20,
      borderRadius: '50%',
      border: '1px solid #eee',
      backgroundColor: '#fff',
      color: 'orange',
      padding: '2px',
    },
  })
);

const ProductItem: React.FC = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProductByIdRequest(props.id));
  }, [dispatch, props.id]);

  const product = useSelector((state: RootState) => state.products.currentProduct);

  // GALLERY
  const imageUrls = product && product.files.map((file) => file.name);
  const largeImages = imageUrls?.length && imageUrls.filter((file) => !file.includes('cropped'));
  const croppedImages = imageUrls?.length && imageUrls.filter((file) => file.includes('cropped'));

  const [imgLarge, setImgLarge] = useState('');
  const [mainImg, setMainImg] = useState('');

  // SET MAIN IMG
  useEffect(() => {
    product?.mainImg?.name && setMainImg(product?.mainImg?.name);
    product?.mainImg?.name && setImgLarge(product?.mainImg?.name);
  }, [product]);

  const handleMainImage = () => {
    if (!imgLarge) return;

    dispatch(uploadMainImgRequest(props.id, imgLarge));
  };

  // DELETE PRODUCT
  const handleDeleteProduct = () => {
    dispatch(deleteProductRequest(product.id));
    history.push('/products');
  };

  return (
    <>
      {!product ? (
        <LinearProgress />
      ) : (
        <div className={classes.itemCard}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              history.push('/products');
            }}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleDeleteProduct}
          >
            Видалити
          </Button>
          <div className={classes.itemMain}>
            <div className={classes.gallery}>
              {imageUrls.length ? (
                <>
                  {imgLarge ? (
                    <div className={classes.largeImg}>
                      <img src={`${root}/product/img/${imgLarge}`} alt="" width={580} />
                      <div
                        className={classes.favIcon}
                        title="Зробити головним зображенням"
                        onClick={handleMainImage}
                      >
                        {mainImg.includes(imgLarge) ? <StarFilledIcon /> : <StarIcon />}
                      </div>
                    </div>
                  ) : null}

                  {croppedImages.map((img, idx) => (
                    <img
                      key={idx}
                      className={classes.croppedImg}
                      src={`${root}/product/img/${img}`}
                      alt=""
                      onClick={() => setImgLarge(largeImages[idx])}
                    />
                  ))}
                </>
              ) : null}
            </div>
            <div className={classes.description}>
              <div className={classes.field}>
                <p className={classes.fieldTitle}>ID:</p>
                <p className={classes.fieldValue}>{product.id}</p>
              </div>
              <div className={classes.field}>
                <p className={classes.fieldTitle}>Назва:</p>
                <p className={classes.fieldValue}>{product.name}</p>
                <span className={classes.edit}>
                  <EditIcon />
                </span>
              </div>
              <div className={classes.field}>
                <p className={classes.fieldTitle}>Ключ:</p>
                <p className={classes.fieldValue}>{product.key}</p>
              </div>
              <div className={classes.field}>
                <p className={classes.fieldTitle}>Ціна:</p>
                <p className={classes.fieldValue}>{product.price}</p>
              </div>
              <div className={classes.field}>
                <p className={classes.fieldTitle}>Опис:</p>
                <p className={classes.fieldValue}>{product.description}</p>
              </div>
              <div className={classes.field}>
                <p className={classes.fieldTitle}>Створено:</p>
                <p className={classes.fieldValue}>{product.createdAt}</p>
              </div>
              <div className={classes.field}>
                <p className={classes.fieldTitle}>Оновлено:</p>
                <p className={classes.fieldValue}>{product.updatedAt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
