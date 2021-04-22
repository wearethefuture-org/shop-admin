import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import { AppDispatch, RootState } from '../../../store/store';
import { updateOrderQuantityRequest } from '../../../store/actions/orders.actions';
import styles from './OrdersTable.module.scss';

const OrdersEditQuantity = ({ row, orderId }) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(row.quantity);
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.orders.loading);

  const handleChange = (e) => {
    e.stopPropagation();
    setValue(e.target.value);
  };

  const onQuantityChanged = (e, orderId, productId) => {
    e.stopPropagation();
    dispatch(updateOrderQuantityRequest(orderId, productId, { quantity: value }));
    setEditable(false);
  };

  const onQuantityChangedCancel = () => {
    setEditable(false);
    setValue(row.quantity);
  };

  let cell = (
    <div className={styles.quantity}>
      {row.quantity}
      <EditIcon
        onClick={() => {
          if (loading) {
            return;
          }
          setEditable(true);
        }}
        color={loading ? 'disabled' : 'primary'}
        fontSize="small"
      />
    </div>
  );

  if (editable) {
    cell = (
      <div className={styles.edit_quantity}>
        <input type="number" value={value} onChange={handleChange} />
        <DoneIcon color="primary" onClick={(e) => onQuantityChanged(e, orderId, row.product.id)} />
        <CancelIcon color="secondary" onClick={onQuantityChangedCancel} />
      </div>
    );
  }

  return cell;
};

export default OrdersEditQuantity;
