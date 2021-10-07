import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import * as Yup from 'yup';

import {
  getProductsRequest,
  getProductsByQueryRequest,
} from '../../../store/actions/products.actions';

import { Button, IconButton, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

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
];

const Search: React.FC<SearchProps> = (props) => {
  const classes = useStyles(props);
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    searchValue: Yup.string().required('Це поле не повинно бути пустим!'),
    searchOption: Yup.string().required('Це поле не повинно бути пустим!'),
  });

  const initialValues = {
    searchValue: '',
    searchOption: searchOptions ? searchOptions[0].key : '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      setIsSearch(true);
      if (values.searchOption === 'products') {
        dispatch(getProductsByQueryRequest(values.searchValue, 1, 10));
        history.push({
          pathname: '/products',
          state: {
            searchValue: values.searchValue,
          },
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
      setSubmitting(false);
    },
  });

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleChange = (field?: string) => {
    if (!field?.trim().length && isSearch) {
      dispatch(getProductsRequest(1, 10));
      setIsSearch(false);
    }
  };

  const endAdornment = () => {
    return (
      <IconButton
        className={classes.crossIcon}
        disabled={formik.isSubmitting || !formik.values.searchValue.trim().length}
        style={!formik.values.searchValue.trim().length ? { opacity: '0' } : { opacity: '1' }}
        onClick={() => {
          formik.setFieldValue('searchValue', '');
          handleChange();
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
          onChange={formik.handleChange}
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
          onChange={(e) => {
            formik.handleChange(e);
            handleChange(e.target.value);
          }}
          onBlur={formik.handleBlur}
          placeholder="Пошук…"
          value={formik.values.searchValue}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          endAdornment={endAdornment()}
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
