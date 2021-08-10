import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarFilledIcon from '@material-ui/icons/Star';
import StarIcon from '@material-ui/icons/StarBorder';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { uploadMainImgRequest } from '../../../../store/actions/products.actions';
import { root } from '../../../../api/config';
import { IGetProductById } from '../../../../interfaces/IProducts';
import { failSnackBar } from '../../../../store/actions/snackbar.actions';
import { AppDispatch, RootState } from '../../../../store/store';
import styles from './ProductImages.module.scss';

const placeholder = `${root}/static/uploads/empty-preview.png`;

const ProductImages: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const product: IGetProductById = useSelector((state: RootState) => state.products.currentProduct);

  // GALLERY
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  useEffect(() => {
    if (product.files && product.files.length) {
      setImgUrls(product.files.map((file) => file.name));
    } else {
      return;
    }
  }, [product]);

  const [largeImages, setLargeImages] = useState<string[]>([]);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  useEffect(() => {
    if (!imgUrls?.length) return;
    setLargeImages(imgUrls.filter((file) => !file.includes('cropped')));
    setCroppedImages(imgUrls.filter((file) => file.includes('cropped')));
  }, [imgUrls]);

  const [mainImg, setMainImg] = useState<string | 0 | undefined>('');

  useEffect(() => {
    product?.mainImg?.name && setMainImg(product?.mainImg?.name);
  }, [product]);

  const images = largeImages.map((img, idx) => ({
    original: `${root}/static/uploads/${img}`,
    thumbnail: `${root}/static/uploads/${croppedImages[idx]}`,
    bulletClass: styles.bullet,
  }));

  const galleryRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const getIndex = () => {
    //@ts-ignore
    galleryRef && galleryRef.current && setActiveIdx(galleryRef.current.getCurrentIndex());
  };

  const handleMainImage = () => {
    product?.mainImg?.name && product?.mainImg?.name === largeImages[activeIdx]
      ? dispatch(failSnackBar('Зображення вже призначене головним зображенням'))
      : dispatch(uploadMainImgRequest(product.id, largeImages[activeIdx]));
  };

  return (
    <div className={styles.gallery}>
      {imgUrls.length ? (
        <>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
            ref={galleryRef}
            onSlide={getIndex}
          />
          <div
            className={styles.favIcon}
            title="Зробити головним зображенням"
            onClick={handleMainImage}
          >
            {mainImg && mainImg.includes(largeImages[activeIdx]) ? (
              <StarFilledIcon />
            ) : (
              <StarIcon />
            )}
          </div>
        </>
      ) : (
        <div className={styles.placeholder}>
          <img src={placeholder} alt={product.name} />
        </div>
      )}
    </div>
  );
};

export default ProductImages;
