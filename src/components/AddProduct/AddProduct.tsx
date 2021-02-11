import React from 'react';
import { fetchAddProduct } from '../../store/actions'

import ProductModal from '../Modals/Product-modal';

const AddProduct: React.FC = () => {

  const buttonName = 'Add Product';
  const modalTitle = 'Create Product';
  const fetchFun = fetchAddProduct;
  const modalData = {
    buttonName,
    modalTitle,
    fetchFun
  };
  return (
    <ProductModal {...modalData} />
  )
}

export default AddProduct;