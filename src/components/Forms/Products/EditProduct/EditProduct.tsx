import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import ProductForm from '../ProductForm/ProductForm';
import useCategories from '../../../../hooks/useCategories';
import { IGetProductById, IUpdateProduct } from '../../../../interfaces/IProducts';
import { AppDispatch, RootState } from '../../../../store/store';
import { root } from '../../../../api/config';
import {
  deleteImageRequest,
  updateProductRequest,
} from '../../../../store/actions/products.actions';
import { productValidationShema } from '../ProductForm/productFormHelpers';
import { ICategoryResponse, ICharResponse } from '../../../../interfaces/ICategory';
import { getEditCharValuesObject } from './getEditCharValuesObject';

interface ILocation {
  from: { pathname: string };
}

const EditProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<ILocation>();

  const { data: categories } = useCategories();

  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );
  const product: IGetProductById = useSelector((state: RootState) => state.products.currentProduct);

  const handleGoBack = () => {
    history.push(location?.state?.from || '/products');
  };

  const [validation, setValidation] = useState(productValidationShema);

  // FORMIK
  const initialValues = {
    name: product ? product.name : '',
    price: product.price ? product.price : '',
    description: product ? product.description : '',
    categoryName: product ? product.category?.name : '',
    files: product ? product.files : {},
    key: product ? product.key : '',
    subForm: {},
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validation,
    onSubmit: (values: IUpdateProduct): void => {
      const { subForm, ...productValues } = values;

      const chars: ICharResponse[] =
        category && category.characteristicGroup.map((group) => group.characteristic).flat(1);

      dispatch(
        updateProductRequest(
          product.id,
          productValues,
          getEditCharValuesObject(chars, product, formik)
        )
      );

      handleGoBack();
    },
  });

  // HANDLE IMAGES
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const imagesFD = new FormData();
  if (images.length) {
    for (let image of images) {
      imagesFD.append('images', image);
    }
    formik.values.files = imagesFD;
  } else {
    formik.values.files = product.files;
  }

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
      setValidation={setValidation}
    />
  );
};

export default EditProduct;
