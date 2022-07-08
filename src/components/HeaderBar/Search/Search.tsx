import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';

import {
  getProductsRequest,
  getProductsByQueryRequest,
} from '../../../store/actions/products.actions';
import { getOrdersByParamsRequest, getOrdersRequest } from './../../../store/actions/orders.actions';

import { Button, IconButton, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { getUsersByQueryRequest, getUsersRequest } from '../../../store/actions/users.actions';

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
  const classes = useStyles(props);
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [searchOption, setSearchOption] = useState<string>('');

  const initialValues = {
    searchValue: '',
    searchOption: searchOptions[0].key,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      if (values.searchOption === 'products') {
        dispatch(getProductsByQueryRequest(values.searchValue, 1, 10));
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
        dispatch(getOrdersByParamsRequest(1, 10, values.searchValue));
        history.push({
          pathname: '/orders',
        });
      }
      setSubmitting(false);
    },
  });

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleChange = (field?: string) => {
    if (!field?.trim().length && isSearch) {
      dispatch(getProductsRequest(1, 10));
      dispatch(getUsersRequest(1, 10));
      setIsSearch(false);
    }
  };

  const finishSearch = () => {
    if (searchOption === 'products') {
      dispatch(getProductsRequest(1, 10));
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
            setSearchOption(e.target.value as string)
            formik.handleChange(e)
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
