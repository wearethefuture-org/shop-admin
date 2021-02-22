import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import ProductForm, { productValidationShema } from '../ProductForm/ProductForm';
import useCategories from '../../../hooks/useCategories';
import { IProductFormData } from '../../../interfaces/IProducts';
import { RootState } from '../../../store/store';
import { root } from '../../../api/config';
import { deleteImageRequest, updateProductRequest } from '../../../store/actions';

interface stateType {
  from: { pathname: string };
}

const EditProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<stateType>();
  const { data: categories } = useCategories();

  const product = useSelector((state: RootState) => state.products.currentProduct);

  const handleGoBack = () => {
    history.push(location?.state?.from || '/products');
  };

  // FORMIK
  const initialValues: IProductFormData = {
    name: product.name ?? '',
    price: product.price ?? '',
    description: product.description ?? '',
    categoryName: product.category?.name ?? '',
    files: product.files ?? [],
    key: product.key ?? '',
  };

  const formik = useFormik({
    initialValues,

    validationSchema: productValidationShema,
    onSubmit: (values: IProductFormData): void => {
      const imagesFD = new FormData();
      if (images.length) {
        for (let image of images) {
          imagesFD.append('images', image);
        }
        formik.values.files = imagesFD;
      } else {
        formik.values.files = product.files;
      }

      dispatch(updateProductRequest({ id: product.id, product: values }));
      handleGoBack();
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  useEffect(() => {
    if (product.files?.length) {
      setImagesPreview(
        product.files
          .filter((file) => !file.name.includes('cropped'))
          .map((file) => `${root}/product/img/${file.name}`)
      );
    }
  }, [product.files]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList: File[] = Array.from(e.target.files);
      setImages((prev) => prev.concat(fileList));

      const mappedFiles = fileList.map((file) => URL.createObjectURL(file));
      setImagesPreview((prev) => prev.concat(mappedFiles));
    }
  };

  const handleDeleteImg = (img, idx) => {
    const imgName = !img.includes('blob') && img.split('img/')[1];
    const existingImg = imgName && product.files.filter((file) => file.name.includes(imgName));

    if (existingImg.length) {
      existingImg.forEach((img) => dispatch(deleteImageRequest(img.name, product.id)));
    } else {
      setImages(images.filter((_, imgIdx) => imgIdx !== idx));
    }

    setImagesPreview(imagesPreview.filter((image) => image !== img));
  };

  return (
    <ProductForm
      editMode={true}
      formik={formik}
      handleGoBack={handleGoBack}
      categories={categories}
      handleImageChange={handleImageChange}
      imagesPreview={imagesPreview}
      handleDeleteImg={handleDeleteImg}
    />
  );
};

export default EditProduct;
