import React from 'react';
import { fetchAddProduct } from '../../store/actions'

import ProductModal from '../Modals/Product-modal';

const AddProduct: React.FC = () => {

  const buttonName = 'Зберегти зміни';
  const modalTitle = 'Додати Товар';
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