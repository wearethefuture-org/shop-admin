import React from 'react';
import { Button, DialogActions } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import { IAddTreeCategory } from '../../../../interfaces/ITreeCategory';
import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import styled from 'styled-components';
import { COLORS } from '../../../../values/colors';

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
});

interface InnerTreeCategoryFormProps {
  closeModal: () => void;
}

const CloseButton = styled(Button)`
  background-color: ${COLORS.primaryGray};
  border-radius: 30px;
  color: ${COLORS.primaryLight};
  &:hover {
    background-color: ${COLORS.secondaryGray};
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${COLORS.primaryGreen};
  border-radius: 30px;
  color: ${COLORS.primaryLight};
  &:hover {
    background-color: ${COLORS.secondaryGreen};
  }
`;

const InnerForm: React.FC<InnerTreeCategoryFormProps & FormikProps<IAddTreeCategory>> = (props) => {
  const { submitForm, closeModal, isSubmitting, dirty, isValid } = props;

  const classes = useStyles();

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
        <CloseButton onClick={closeModal} variant="contained" className={classes.customBtn}>
          Закрити
        </CloseButton>
        <SubmitButton
          className={classes.customBtn}
          variant="contained"
          disabled={isSubmitting || !(dirty && isValid)}
          onClick={submitForm}
        >
          Створити
        </SubmitButton>
      </DialogActions>
    </Form>
  );
};

export default InnerForm;
