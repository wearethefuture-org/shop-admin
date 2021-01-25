import React from 'react';
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { IFormValues, InnerCategoryFormProps } from '../../../interfaces/category-form';
import TextFieldWrapped from '../../../hocs/TextFieldHOC';

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

const InnerForm: React.FC<InnerCategoryFormProps & FormikProps<IFormValues>> = (props) => {
  const { submitForm, handleClose, isSubmitting, dirty, isValid, touched, errors, status } = props;

  const classes = useStyles();

  return (
    <Form>
      <Field
        fullWidth
        component={TextFieldWrapped}
        className={classes.input}
        type="text"
        label="URL key *"
        name="key"
        placeholder="url-example"
        makegreen="true"
      />
      {status && status.key && !(touched.key && errors.key) && (
        <div className={classes.hint}>
          Hint: This is a variant name for the URL. You can use Latin letters in the lower case and
          hyphen
        </div>
      )}
      <Field
        fullWidth
        component={TextFieldWrapped}
        className={classes.input}
        type="name"
        label="Name *"
        name="name"
        makegreen="true"
      />
      <Field
        fullWidth
        multiline
        rowsMax={6}
        component={TextFieldWrapped}
        className={classes.input}
        type="description"
        label="Description *"
        name="description"
        makegreen="true"
      />
      {isSubmitting && <LinearProgress />}
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          className={classes.customBtn}
        >
          Cancel
        </Button>
        <Button
          className={classes.customBtn}
          variant="contained"
          color="primary"
          disabled={isSubmitting || !(dirty && isValid)}
          onClick={submitForm}
        >
          Create
        </Button>
      </DialogActions>
    </Form>
  );
};

export default InnerForm;
