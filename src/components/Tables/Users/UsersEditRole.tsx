import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import { AppDispatch, RootState } from '../../../store/store';
import { updateOrderStatusRequest } from '../../../store/actions/orders.actions';


const UsersRoleEdit = ({ row }) => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.orders.loading);

  enum Role {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user',
  }

  const onChangeRole= (e, id) => {
    e.stopPropagation();
    dispatch(updateOrderStatusRequest(id, { status: `${e.target.value}` }));
  };

  return (
    <div>
      <FormControl disabled={loading}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{minWidth: "100px"}}
          value={row?.role?.name ? row.role.name : ''}
          onChange={(e) => onChangeRole(e, row.id)}
        >
          {Object.keys(Role).map((item) => {
            return (
              <MenuItem key={item} value={Role[item]} >
                {Role[item]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default UsersRoleEdit;