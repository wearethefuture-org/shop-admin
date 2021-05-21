import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import { AppDispatch, RootState } from '../../../store/store';
import { updateOrderStatusRequest } from '../../../store/actions/orders.actions';


const OrdersEditStatus = ({ row }) => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.orders.loading);

  enum Status {
    PENDING = 'pending',
    PAID = 'paid',
    DELIVERING = 'delivering',
    CONFIRMED = 'confirmed',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    REOPENED = 'reopened',
  }

  const onChangeStatus = (e, id) => {
    e.stopPropagation();
    dispatch(updateOrderStatusRequest(id, { status: `${e.target.value}` }));
  };

  return (
    <div>
      <FormControl disabled={loading}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={row.status}
          onChange={(e) => onChangeStatus(e, row.id)}
        >
          {Object.keys(Status).map((item) => {
            return (
              <MenuItem key={item} value={Status[item]}>
                {Status[item]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default OrdersEditStatus;
