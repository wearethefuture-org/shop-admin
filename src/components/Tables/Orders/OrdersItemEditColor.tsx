import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import { AppDispatch, RootState } from '../../../store/store';
import { updateOrderStatusRequest } from '../../../store/actions/orders.actions';
import { Status } from '../../../enums/orderStatus';

enum mockColor {
  blue = 'Синій',
  red = 'Червоний',
  green = 'Зелений',
  white = 'Білий',
  black = 'Чорний',
}

const OrdersItemEditColor = ({ row, orderId }) => {
  console.log(row.size);
  const dispatch: AppDispatch = useDispatch();
  // const loading = useSelector((state: RootState) => state.orders.loading);

  const onChangeColor = (e, id) => {
    e.stopPropagation();
    // dispatch(updateOrderStatusRequest(id, { status: ${e.target.value} }));
  };

  return (
    <div>
      <FormControl disabled={false}>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select1"
          value={row.color}
          onChange={(e) => onChangeColor(e, row.id)}
        >
          {Object.keys(mockColor).map((item) => {
            return (
              <MenuItem key={item} value={mockColor[item]}>
                {mockColor[item]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default OrdersItemEditColor;
