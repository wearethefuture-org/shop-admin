import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StarFilledIcon from '@material-ui/icons/Star';
import StarIcon from '@material-ui/icons/StarBorder';

import { uploadMainImgRequest } from '../../../../store/actions';
import { root } from '../../../../api/config';
import styles from './ProductImages.module.scss';

const placeholder = `${root}/product/img/empty-preview.png`;

const ProductImages = ({ product }) => {
  const dispatch = useDispatch();

  // GALLERY
  const imageUrls = product && product.files.map((file) => file.name);
  const largeImages = imageUrls?.length && imageUrls.filter((file) => !file.includes('cropped'));
  const croppedImages = imageUrls?.length && imageUrls.filter((file) => file.includes('cropped'));

  const [activeCroppedImg, setActiveCroppedImg] = useState('');
  const [imgLarge, setImgLarge] = useState('');
  const [mainImg, setMainImg] = useState('');

  // SET MAIN IMG
  useEffect(() => {
    if (!largeImages.length || !croppedImages.length) return;
    if (!product?.mainImg?.name) {
      setImgLarge(largeImages[0]);
      setActiveCroppedImg(
        croppedImages.length && croppedImages.find((img) => img.includes(largeImages[0]))
      );
    } else {
      setMainImg(product?.mainImg?.name);
      setImgLarge(product?.mainImg?.name);
      setActiveCroppedImg(
        croppedImages.length && croppedImages.find((img) => img.includes(product?.mainImg?.name))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleGallery = (img, idx) => {
    setActiveCroppedImg(img);
    setImgLarge(largeImages[idx]);
  };

  const handleMainImage = () => {
    if (!imgLarge) return;

    dispatch(uploadMainImgRequest(product.id, imgLarge));
  };

  return (
    <div className={styles.gallery}>
      <>
        {imgLarge ? (
          <div className={styles['img-large-wrapper']}>
            <img src={`${root}/product/img/${imgLarge}`} alt="" className={styles['img-large']} />
            <div
              className={styles.favIcon}
              title="Зробити головним зображенням"
              onClick={handleMainImage}
            >
              {mainImg.includes(imgLarge) ? <StarFilledIcon /> : <StarIcon />}
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <img src={placeholder} alt="" className={styles['img-large']} />
          </div>
        )}

        {croppedImages.length
          ? croppedImages.map((img, idx) => (
              <img
                key={idx}
                className={
                  img === activeCroppedImg ? styles['cropped-img-active'] : styles['cropped-img']
                }
                src={`${root}/product/img/${img}`}
                alt=""
                onClick={() => handleGallery(img, idx)}
              />
            ))
          : null}
      </>
    </div>
  );
};

export default ProductImages;
