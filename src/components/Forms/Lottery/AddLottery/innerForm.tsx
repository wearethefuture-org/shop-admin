import React from 'react';
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldWrapped from '../../../../hocs/TextFieldHOC';
import { IAddLotteryItem, IInnerLotteryFormProps } from '../../../../interfaces/ILottery';

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

const InnerForm: React.FC<IInnerLotteryFormProps & FormikProps<IAddLotteryItem>> = (props) => {
  const { submitForm, handleClose, isSubmitting, dirty, isValid } = props;

  const classes = useStyles();

  return (
    <Form>
      <Field
        fullWidth
        component={TextFieldWrapped}
        className={classes.input}
        label="Назва *"
        name="title"
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
      <Field
        fullWidth
        multiline
        rowsMax={6}
        component={TextFieldWrapped}
        className={classes.input}
        label="Дата початку*"
        name="start"
        makegreen="true"
      />
      <Field
        fullWidth
        multiline
        rowsMax={6}
        component={TextFieldWrapped}
        className={classes.input}
        label="Дата завершення*"
        name="finish"
        makegreen="true"
      />
      <Field
        fullWidth
        multiline
        rowsMax={6}
        component={TextFieldWrapped}
        className={classes.input}
        label="Статус*"
        name="status"
        makegreen="true"
      />
      {isSubmitting && <LinearProgress />}
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="contained"
          className={classes.customBtn}
        >
          Закрити
        </Button>
        <Button
          className={classes.customBtn}
          variant="contained"
          color="primary"
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
