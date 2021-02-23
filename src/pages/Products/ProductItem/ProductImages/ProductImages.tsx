import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StarFilledIcon from '@material-ui/icons/Star';
import StarIcon from '@material-ui/icons/StarBorder';

import { uploadMainImgRequest } from '../../../../store/actions/products.actions';
import { root } from '../../../../api/config';
import { IProductItem } from '../../../../interfaces/IProducts';
import { failSnackBar } from '../../../../store/actions/snackbar.actions';
import styles from './ProductImages.module.scss';

const placeholder = `${root}/product/img/empty-preview.png`;

interface IImagesProps {
  product: IProductItem;
}

const ProductImages: React.FC<IImagesProps> = ({ product }) => {
  const dispatch = useDispatch();

  // GALLERY
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  useEffect(() => {
    product.files && setImgUrls(product.files.map((file) => file.name));
  }, [product]);

  const [largeImages, setLargeImages] = useState<string[]>([]);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);

  useEffect(() => {
    if (!imgUrls?.length) return;
    setLargeImages(imgUrls.filter((file) => !file.includes('cropped')));
    setCroppedImages(imgUrls.filter((file) => file.includes('cropped')));
  }, [imgUrls]);

  const [mainImg, setMainImg] = useState<string | 0 | undefined>('');
  const [imgLarge, setImgLarge] = useState<string | 0 | undefined>('');
  const [activeCroppedImg, setActiveCroppedImg] = useState<string | 0 | undefined>('');

  useEffect(() => {
    product?.mainImg?.name && setMainImg(product?.mainImg?.name);
  }, [product]);

  useEffect(() => {
    mainImg && largeImages.length
      ? setImgLarge(largeImages.find((img) => img.includes(mainImg)))
      : setImgLarge(largeImages[0]);
  }, [mainImg, largeImages]);

  useEffect(() => {
    mainImg && croppedImages.length
      ? setActiveCroppedImg(croppedImages.find((img) => img.includes(mainImg)))
      : setActiveCroppedImg(
          croppedImages.length && croppedImages.find((img) => img.includes(largeImages[0]))
        );
  }, [mainImg, croppedImages, largeImages]);

  const handleGallery = (img, idx) => {
    setActiveCroppedImg(img);
    setImgLarge(largeImages && largeImages[idx]);
  };

  const handleMainImage = () => {
    if (!imgLarge) return;

    if (product?.mainImg?.name && product?.mainImg?.name === imgLarge) {
      dispatch(failSnackBar('Зображення вже призначене головним зображенням'));
      return;
    }

    dispatch(uploadMainImgRequest(product.id, imgLarge));
  };

  console.log('mainImg :>> ', mainImg);
  console.log('largeImages :>> ', largeImages);
  console.log('imgLarge :>> ', imgLarge);

  return (
    <div className={styles.gallery}>
      <>
        {imgLarge ? (
          <div className={styles['img-large-wrapper']}>
            <img
              src={`${root}/product/img/${imgLarge}`}
              alt={product.name}
              className={styles['img-large']}
            />
            <div
              className={styles.favIcon}
              title="Зробити головним зображенням"
              onClick={handleMainImage}
            >
              {mainImg && mainImg.includes(imgLarge) ? <StarFilledIcon /> : <StarIcon />}
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <img src={placeholder} alt={product.name} className={styles['img-large']} />
          </div>
        )}

        {croppedImages && croppedImages.length
          ? croppedImages.map((img, idx) => (
              <img
                key={idx}
                className={
                  img === activeCroppedImg ? styles['cropped-img-active'] : styles['cropped-img']
                }
                src={`${root}/product/img/${img}`}
                alt={product.name}
                onClick={() => handleGallery(img, idx)}
              />
            ))
          : null}
      </>
    </div>
  );
};

export default ProductImages;
