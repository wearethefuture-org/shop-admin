import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StarFilledIcon from '@material-ui/icons/Star';
import StarIcon from '@material-ui/icons/StarBorder';

import { uploadMainImgRequest } from '../../../../store/actions';
import { root } from '../../../../api/config';
import { IProductItem } from '../../../../interfaces/IProducts';
import styles from './ProductImages.module.scss';

const placeholder = `${root}/product/img/empty-preview.png`;

interface IImagesProps {
  product: IProductItem;
}

const ProductImages: React.FC<IImagesProps> = ({ product }) => {
  const dispatch = useDispatch();

  // GALLERY
  const imageUrls = product && product.files && product.files.map((file) => file.name);
  const largeImages = imageUrls?.length && imageUrls.filter((file) => !file.includes('cropped'));
  const croppedImages = imageUrls?.length && imageUrls.filter((file) => file.includes('cropped'));

  const [activeCroppedImg, setActiveCroppedImg] = useState<string | 0 | undefined>('');
  const [imgLarge, setImgLarge] = useState<string | 0 | undefined>('');
  const [mainImg, setMainImg] = useState<string | 0 | undefined>('');

  // SET MAIN IMG
  useEffect(() => {
    if (!largeImages || !croppedImages) return;
    if (!largeImages.length || !croppedImages.length) return;

    if (!product?.mainImg?.name) {
      setImgLarge(largeImages[0]);
      setActiveCroppedImg(
        croppedImages.length && croppedImages.find((img) => img.includes(largeImages[0]))
      );
    } else {
      setMainImg(product?.mainImg?.name);
      largeImages.length &&
        setImgLarge(
          largeImages.find((img) => product?.mainImg?.name && img.includes(product?.mainImg?.name))
        );
      setActiveCroppedImg(
        croppedImages.length &&
          croppedImages.find(
            (img) => product?.mainImg?.name && img.includes(product?.mainImg?.name)
          )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleGallery = (img, idx) => {
    setActiveCroppedImg(img);
    setImgLarge(largeImages && largeImages[idx]);
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
