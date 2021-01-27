import React from 'react';
import {fetchUpdateProduct} from '../../store/actions';
import ProductModal from '../Modals/Product-modal';
interface IEditData {
    className: string;
    props?: any
}
const EditProduct: React.FC<IEditData> = ({ className, props }) => {

    const buttonName = 'Edit Product';
    const modalTitle = 'Edit Product';
    const action = 'edit';
    const fetchFun = fetchUpdateProduct;

    const modalData = {
        buttonName,
        modalTitle,
        action,
        classEdit: className,
        props,
        fetchFun
    };
    return (
        <ProductModal {...modalData} />
    )
}

export default EditProduct