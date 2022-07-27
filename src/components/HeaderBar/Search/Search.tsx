import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store/store';
import { Button, IconButton, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { getProductsRequest } from '../../../store/actions/products.actions';
import {
  getOrdersByParamsRequest,
  getOrdersRequest,
} from './../../../store/actions/orders.actions';
import { getUsersByQueryRequest } from '../../../store/actions/users.actions';
import { failSnackBar } from './../../../store/actions/snackbar.actions';

interface SearchProps {}

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchSelect: {
    color: 'white',
    width: '140px',
  },
  inputRoot: {
    '& :-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0px 1000px darkgreen inset',
      '-webkit-text-fill-color': 'white',
    },
    'color': 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  searchBtn: {
    transition: '0.5s ease',
    backgroundColor: 'rgb(188, 188, 188, 0.5)',
    alignSelf: 'center',
    marginLeft: '40px',
  },
  crossIcon: {
    color: 'white',
    transition: '0.5s ease',
  },
}));

const searchOptions = [
  { name: 'продукти', key: 'products' },
  { name: 'категорії', key: 'categories' },
  { name: 'користувачі', key: 'users' },
  { name: 'замовлення', key: 'orders' },
];

const Search: React.FC<SearchProps> = (props) => {
  const { paginationLimit, sort, sortDirect, filter, findPrice } = useSelector(
    (state: RootState) => state.products
  );
  const classes = useStyles(props);
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [searchOption, setSearchOption] = useState<string>('products');

  const initialValues = {
    searchValue: '',
    searchOption: searchOptions[0].key,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      if (values.searchOption === 'products') {
        if (!isNaN(Number(values.searchValue))) {
          filter.id = Number(values.searchValue)
        } else {
          filter.name = values.searchValue
        }
        dispatch(getProductsRequest(1, paginationLimit, sort, sortDirect, filter));
        history.push({
          pathname: '/products',
        });
      }
      if (values.searchOption === 'categories') {
        history.push({
          pathname: '/search',
          state: {
            searchValue: values.searchValue,
            searchOption: values.searchOption,
          },
        });
      }
      if (values.searchOption === 'users') {
        dispatch(getUsersByQueryRequest(values.searchValue, 1, 10));
        history.push({
          pathname: '/users',
          state: {
            searchValue: values.searchValue,
          },
        });
      }
      if (values.searchOption === 'orders') {
        if (values.searchValue.replace(/\d/g, '')) {
          dispatch(failSnackBar('При пошуку замовлення можна використовувати тільки цифри.'));
          setSubmitting(false);
          return;
        }

        dispatch(getOrdersByParamsRequest(1, 10, values.searchValue));
        history.push({
          pathname: '/orders',
        });
      }
      setSubmitting(false);
    },
  });

  if (searchOption === 'products' && !!filter.id) {
    formik.values.searchValue = String(filter.id);
  }

  if (searchOption === 'products' && !!filter.name) {
    formik.values.searchValue = filter.name
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const finishSearch = () => {
    if (searchOption === 'products') {
      filter.id = ''
      filter.name = ''
      filter.price = findPrice
      dispatch(getProductsRequest(1, paginationLimit, sort, sortDirect, filter));
    }
    if (searchOption === 'orders') {
      dispatch(getOrdersRequest(1, 10));
    }
  };

  const clearIcon = () => {
    return (
      <IconButton
        className={classes.crossIcon}
        disabled={formik.isSubmitting || !formik.values.searchValue.trim().length}
        style={!formik.values.searchValue.trim().length ? { opacity: '0' } : { opacity: '1' }}
        onClick={() => {
          formik.setFieldValue('searchValue', '');
          finishSearch();
        }}
        onMouseDown={handleMouseDown}
      >
        <ClearIcon />
      </IconButton>
    );
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Select
          type="select"
          name="searchOption"
          id={'option-field'}
          value={formik.values.searchOption}
          className={classes.searchSelect}
          onChange={(e) => {
            setSearchOption(e.target.value as string);
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
        >
          {searchOptions.map((option) => {
            return (
              <MenuItem key={'option' + option.key} value={option.key}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
        <InputBase
          name="searchValue"
          id="searchValue-field"
          onChange={(e) => formik.handleChange(e)}
          onBlur={formik.handleBlur}
          placeholder="Пошук…"
          value={formik.values.searchValue}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          endAdornment={clearIcon()}
        />
        <Button
          style={!formik.values.searchValue.trim().length ? { opacity: '0' } : { opacity: '1' }}
          type="submit"
          className={classes.searchBtn}
          disabled={formik.isSubmitting || !formik.values.searchValue.trim().length}
          variant="contained"
          size="medium"
          color="primary"
        >
          Знайти
        </Button>
      </div>
    </form>
  );
};

export default Search;
