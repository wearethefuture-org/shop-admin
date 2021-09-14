import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import ProductForm from '../ProductForm/ProductForm';
import useTreeCategories from '../../../../hooks/useTreeCategories';
import { addProductRequest } from '../../../../store/actions/products.actions';
import { AppDispatch, RootState } from '../../../../store/store';
import { productValidationShema } from '../ProductForm/productFormHelpers';
import { getAddCharValuesObject } from './getAddCharValuesObject';
import { IGetTreeCategoriesResponse, ICharResponse } from '../../../../interfaces/ITreeCategory';
import { IAddProduct } from '../../../../interfaces/IProducts';

const initialValues: IAddProduct = {
  name: '',
  price: '',
  description: '',
  categoryName: '',
  files: [] || FormData,
  key: '',
  subForm: {},
};

interface stateType {
  from: { pathname: string };
}

const AddProductForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<stateType>();
  const { data: categories } = useTreeCategories();
  const category: IGetTreeCategoriesResponse = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );

  const handleGoBack = () => {
    history.push(location?.state?.from || '/products');
  };

  // FORMIK
  const [validation, setValidation] = useState(productValidationShema);

  const formik = useFormik({
    initialValues,

    validationSchema: validation,
    onSubmit: (values: IAddProduct): void => {
      const { subForm, ...productValues } = values;

      const chars: ICharResponse[] =
        category && category.characteristicGroup.map((group) => group.characteristic).flat(1);

      dispatch(addProductRequest(productValues, getAddCharValuesObject(subForm, chars)));
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
    formik.values.files = [];
  }

  const handleImageChange = (fileList: File[]) => {
    setImages((prev) => prev.concat(fileList));

    const mappedFiles = fileList.map((file) => URL.createObjectURL(file));
    setImagesPreview((prev) => prev.concat(mappedFiles));
  };

  const handleDeleteImg = (img: string, idx: number) => {
    setImages(images.filter((_, imgIdx: number) => imgIdx !== idx));

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
      setValidation={setValidation}
    />
  );
};

export default AddProductForm;
