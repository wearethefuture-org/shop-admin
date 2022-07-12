import React from 'react';
import { Button, DialogActions } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import { IAddTreeCategory } from '../../../../interfaces/ITreeCategory';
import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import styled from 'styled-components';
import { COLORS } from '../../../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const useStyles = makeStyles({
  customBtn: {
    marginTop: '15px',
  },
  input: {
    marginBottom: '20px',
  },
  hint: {
    fontSize: '12px',
    marginBottom: '15px',
  },
  closeBtn: {
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    'backgroundColor': COLORS.primaryGray,
    '&:hover': {
      backgroundColor: COLORS.secondaryGray,
    },
  },
  closeBtnDark: {
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    'backgroundColor': COLORS.darkGray,
    '&:hover': {
      backgroundColor: COLORS.secondaryDarkGray,
    },
  },
  submitBtn: {
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    'backgroundColor': COLORS.primaryGreen,
    '&:hover': {
      backgroundColor: COLORS.secondaryGreen,
    },
  },
  submitBtnDark: {
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    'backgroundColor': COLORS.darkGreen,
    '&:hover': {
      backgroundColor: COLORS.secondaryDarkGreen,
    },
  },
});

interface InnerTreeCategoryFormProps {
  closeModal: () => void;
}

const InnerForm: React.FC<InnerTreeCategoryFormProps & FormikProps<IAddTreeCategory>> = (props) => {
  const { submitForm, closeModal, isSubmitting, dirty, isValid } = props;

  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <Form>
      <Field
        fullWidth
        component={TextFieldWrapped}
        className={classes.input}
        label="Назва *"
        name="name"
        makegreen="true"
      />
      <Field
        fullWidth
        component={TextFieldWrapped}
        className={classes.input}
        label="URL ключ *"
        name="key"
        placeholder="url-example"
        makegreen="true"
      />

      <Field
        fullWidth
        multiline
        rowsMax={6}
        component={TextFieldWrapped}
        className={classes.input}
        label="Опис *"
        name="description"
        makegreen="true"
      />

      <DialogActions>
        <Button
          onClick={closeModal}
          variant="contained"
          className={darkMode ? classes.closeBtnDark : classes.closeBtn}
        >
          Закрити
        </Button>
        <Button
          className={darkMode ? classes.submitBtnDark : classes.submitBtn}
          variant="contained"
          disabled={isSubmitting || !(dirty && isValid)}
          onClick={submitForm}
        >
          Створити
        </Button>
      </DialogActions>
    </Form>
  );
};

export default InnerForm;
