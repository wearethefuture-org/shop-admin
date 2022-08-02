import { FormControl, Select, MenuItem } from '@material-ui/core';
import React, { FC, ChangeEvent } from 'react';

interface OrdersSelectorProps {
  disabled: boolean;
  value: string;
  handleChange: (event: ChangeEvent<{ value: unknown }>) => void;
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
