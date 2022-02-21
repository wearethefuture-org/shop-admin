import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

import { AppDispatch } from '../../../store/store';
import useRoles from '../../../hooks/useRoles';
import { IDraw } from '../../../interfaces/IDraw';
import { addDrawRequest, updateDrawRequest } from '../../../store/actions/draws.actions';
import { failSnackBar } from '../../../store/actions/snackbar.actions';

const useStyles = makeStyles({
  input: {
    width: '270px',
    height: '44px',
    border: '1px solid #e2e6e7',
    boxSizing: 'border-box',
    borderRadius: ' 60px',
    padding: '11px',
    outline: 'none',
    margin: '10px',
  },
  textField: {
    width: '800px',
    // height: '44px',
    border: '1px solid #e2e6e7',
    boxSizing: 'border-box',
    borderRadius: ' 10px',
    padding: '11px',
    outline: 'none',
    margin: '10px',
  },
  row: {
    margin: '10px',
  },
  submit: {
    background: '#424D52',
    borderRadius: ' 60px',
    color: ' #fff',
    border: ' none',
    width: '270px',
    height: '44px',
    margin: '10px',
  },
  formDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputSelect: {
    width: '270px',
    height: '50px',
    border: '1px solid #e2e6e7',
    boxSizing: 'border-box',
    borderRadius: '60px',
    outline: 'none',
    backgroundSize: 'calc(.75em + .375rem) calc(.75em + .375rem)',
    backgroundPosition: '10px 10px',
    backgroundRepeat: 'no-repeat',
    padding: '12px 20px 15px 40px',
  },
});

interface FormDialogProps {
  isNew: boolean;
  draw: IDraw | null;
  closeModal: () => void;
}

const DrawCardForm: React.FC<FormDialogProps> = ({ isNew, draw, closeModal }) => {
  const classes = useStyles();
  const { data: roles } = useRoles();

  const baseScheme = {
    text: Yup.string()
      .max(10000, 'Основний зміст розіграшу не можу бути більше 10,000 символів!')
      .required('Це поле не повинно бути пустим!'),
    conditions: Yup.string()
      .max(10000, 'Умови розіграшу не можу бути більше 10,000 символів!')
      .required('Це поле не повинно бути пустим!'),
    totalAmount: Yup.number().max(999999, 'Максимально можлива сума 999,999,999'),
    numOfWinners: Yup.number().max(999999, 'Максимально можлива кількість призерів 999,999'),
  };

  const validationSchema = isNew ? Yup.object().shape(baseScheme) : Yup.object().shape(baseScheme);

  const [isEdit, setIsEdit] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const initialValues = {
    text: isNew ? '' : draw?.text,
    conditions: isNew ? '' : draw?.conditions,
    totalAmount: isNew ? null : draw?.totalAmount,
    numOfWinners: isNew ? null : draw?.numOfWinners,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (_values, { setSubmitting }) => {
      if (!isEdit) {
        setIsEdit(true);
        return;
      }
      setSubmitting(true);

      if (isNew) {
        dispatch(
          addDrawRequest({
            text: _values.text ? _values.text : '',
            conditions: _values.conditions ? _values.conditions : '',
            totalAmount: _values.totalAmount ? _values.totalAmount : 1,
            numOfWinners: _values.numOfWinners ? _values.numOfWinners : 1,
          })
        );
      } else if (draw) {
        const updatedDraw = {
          text: _values.text ? _values.text : '',
          conditions: _values.conditions ? _values.conditions : '',
          totalAmount: _values.totalAmount ? _values.totalAmount : 1,
          numOfWinners: _values.numOfWinners ? _values.numOfWinners : 1,
        };
        dispatch(updateDrawRequest(draw.id, updatedDraw));
      } else {
        dispatch(failSnackBar('Ви нічого не змінили'));
      }
      closeModal();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classes.formDiv}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={classes.row}>
        <TextField
          id="standard-multiline-static"
          label="Зміст розіграшу"
          multiline
          rows={4}
          variant="standard"
          className={classes.textField}
          value={formik.values.text}
          disabled={!isEdit}
          type="text"
          name="text"
          // placeholder="Зміст розіграшу"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />
      </div>
      <div className={classes.row}>
        <TextField
          id="standard-multiline-static"
          label="Умови розіграшу"
          multiline
          rows={4}
          variant="standard"
          className={classes.textField}
          value={formik.values.conditions}
          disabled={!isEdit}
          type="text"
          name="conditions"
          // placeholder="Умови розіграшу"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.conditions && Boolean(formik.errors.conditions)}
          helperText={formik.touched.conditions && formik.errors.conditions}
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          value={formik.values.totalAmount}
          disabled={!isEdit}
          type="text"
          name="totalAmount"
          id="totalAmount-field"
          placeholder="Сумма"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.totalAmount && Boolean(formik.errors.totalAmount)}
          helperText={formik.touched.totalAmount && formik.errors.totalAmount}
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          value={formik.values.numOfWinners}
          disabled={!isEdit}
          type="text"
          name="numOfWinners"
          id="numOfWinners-field"
          placeholder="Кількість призерів"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.numOfWinners && Boolean(formik.errors.numOfWinners)}
          helperText={formik.touched.numOfWinners && formik.errors.numOfWinners}
        />
      </div>
      <div className={classes.row}>
        <Button className={classes.submit} type="submit" disabled={formik.isSubmitting}>
          {isNew ? 'Створити' : isEdit ? 'Змінити' : 'Редагувати'}
        </Button>
      </div>
    </form>
  );
};

export default DrawCardForm;
