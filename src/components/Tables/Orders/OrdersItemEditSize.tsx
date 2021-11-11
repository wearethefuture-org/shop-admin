import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import { AppDispatch, RootState } from '../../../store/store';
import { updateOrderStatusRequest } from '../../../store/actions/orders.actions';

enum mockSize {
  s = 'S',
  m = 'M',
  l = 'L',
  xl = 'XL',
}

const OrdersItemEditSize = ({ row, orderId }) => {
  const dispatch: AppDispatch = useDispatch();
  // const loading = useSelector((state: RootState) => state.orders.loading);

  // const onChangeStatus = (e, id) => {
  //   e.stopPropagation();
  //   dispatch(updateOrderStatusRequest(id, { status: ${e.target.value} }));
  // };

  return (
    <div>
      <FormControl disabled={false}>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={row.size}
          onChange={() => false}
        >
          {Object.keys(mockSize).map((item) => {
            return (
              <MenuItem key={item} value={mockSize[item]}>
                {mockSize[item]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default OrdersItemEditSize;
