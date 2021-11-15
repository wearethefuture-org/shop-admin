import { FormControl, Select, MenuItem } from '@material-ui/core';
import React, { FC } from 'react';

interface OrdersSelectorProps {
  disabled: boolean;
  value: string;
  handleChange: (e: any) => void;
  menuItems: Array<string>;
}

const OrdersSelector: FC<OrdersSelectorProps> = ({ value, disabled, handleChange, menuItems }) => {
  return (
    <div>
      <FormControl disabled={disabled}>
        <Select value={value} onChange={handleChange}>
          {menuItems.map((item, i) => {
            return (
              <MenuItem key={i + `${item}`} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default OrdersSelector;
