import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import ProductForm, { productValidationShema } from '../ProductForm/ProductForm';
import useCategories from '../../../../hooks/useCategories';
import { IProductFormData } from '../../../../interfaces/IProducts';
import { addProductRequest } from '../../../../store/actions';

const initialValues: IProductFormData = {
  name: '',
  price: '',
  description: '',
  categoryName: '',
  files: [],
  key: '',
};

interface stateType {
  from: { pathname: string };
}

const AddProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<stateType>();
  const { data: categories } = useCategories();

  const handleGoBack = () => {
    history.push(location?.state?.from || '/products');
  };

  // FORMIK
  const formik = useFormik({
    initialValues,

    validationSchema: productValidationShema,
    onSubmit: (values: IProductFormData): void => {
      dispatch(addProductRequest(values));
      handleGoBack();
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const imagesFD = new FormData();
  if (images.length) {
    for (let image of images) {
      imagesFD.append('images', image);
    }
    formik.values.files = imagesFD;
  } else {
    formik.values.files = [];
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList: File[] = Array.from(e.target.files);
      setImages((prev) => prev.concat(fileList));

      const mappedFiles = fileList.map((file) => URL.createObjectURL(file));
      setImagesPreview((prev) => prev.concat(mappedFiles));
    }
  };

  const handleDeleteImg = (img, idx) => {
    setImages(images.filter((_, imgIdx) => imgIdx !== idx));

    setImagesPreview(imagesPreview.filter((image) => image !== img));
  };

  return (
    <ProductForm
      editMode={false}
      formik={formik}
      handleGoBack={handleGoBack}
      categories={categories}
      handleImageChange={handleImageChange}
      imagesPreview={imagesPreview}
      handleDeleteImg={handleDeleteImg}
    />
  );
};

export default AddProductForm;
