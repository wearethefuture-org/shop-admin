import 'date-fns';
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Dispatch } from 'redux';
import { IGenerateInvoiceModal } from '../../../interfaces/modals';
import {
  alpha,
  Box,
  Button,
  createStyles,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  ThemeOptions,
} from '@material-ui/core';
import 'moment/locale/uk';
import { uk } from 'date-fns/locale';
import { COLORS } from '../../../values/colors';
import { InvoiceDateRange } from '../../../enums/invoiceDateRange';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classnames from 'classnames';
import { generateInvoiceRequest } from '../../../store/actions/invoice.actions';
import { getInvoiceDateRange } from '../../../utils/getInvoiceDateRange';
import { failSnackBar } from '../../../store/actions/snackbar.actions';

interface GenerateInvoiceProps {
  dispatch: Dispatch;
  modalData: IGenerateInvoiceModal;
}

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      radio: {
        '&$checked': {
          color: COLORS.primaryGreen,
        },
        '&:hover': {
          backgroundColor: COLORS.secondaryOttoman,
        },
      },
      radioDark: {
        '&$checked': {
          color: COLORS.darkGreen,
        },
        '&:hover': {
          backgroundColor: alpha(COLORS.darkGreen, theme.palette.action.hoverOpacity),
        },
      },
      checked: {},
      btnWrapper: {
        margin: '10px',
      },
      btn: {
        marginLeft: '15px',
        borderRadius: '30px',
        width: '120px',
        padding: '6px 15px 6px 15px',
        color: COLORS.primaryLight,
      },
      btnConfirmLight: {
        'backgroundColor': COLORS.primaryGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryGreen,
        },
      },
      btnConfirmDark: {
        'backgroundColor': COLORS.secondaryDarkGreen,
        '&:hover': {
          backgroundColor: COLORS.darkGreen,
        },
      },
      btnResetLight: {
        'backgroundColor': COLORS.primaryBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
      btnResetDark: {
        'backgroundColor': COLORS.secondaryDarkBlue,
        '&:hover': {
          backgroundColor: COLORS.darkBlue,
        },
      },
      btnCancelLight: {
        'backgroundColor': COLORS.primaryGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryGray,
        },
      },
      btnCancelDark: {
        'backgroundColor': COLORS.darkGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkGray,
        },
      },
    })
);

const FormDialog: React.FC<GenerateInvoiceProps> = ({ dispatch, modalData }) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

  const { handleClose, isOpened } = modalData;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<InvoiceDateRange | null>(null);
  const [isDisabledDatePicker, setDisabledDatePicker] = useState<boolean>(false);
  const [isDisabledRadio, setDisabledRadio] = useState<boolean>(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!isDisabledRadio) {
      setDisabledRadio(true);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (!isDisabledRadio) {
      setDisabledRadio(true);
    }
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
    setDisabledDatePicker(true);
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRange(null);
    setDisabledDatePicker(false);
    setDisabledRadio(false);
  };

  const submit = async () => {
    if (startDate === null && endDate === null && dateRange !== null) {
      await dispatch(generateInvoiceRequest(getInvoiceDateRange(dateRange)));
    }
    if (startDate !== null && endDate !== null && dateRange === null) {
      if (startDate.getTime() > endDate.getTime()) {
        await dispatch(failSnackBar('Початкова дата має бути давнішою ніж кінцева!'));
        return;
      }
      await dispatch(generateInvoiceRequest({ startDate, endDate }));
    }
    if (startDate === null && endDate === null && dateRange === null) {
      await dispatch(failSnackBar('Виберіть діапазон між датами!'));
      return;
    }
    if (startDate === null && endDate !== null) {
      await dispatch(failSnackBar('Виберіть діапазон між датами!'));
      return;
    }
    if (startDate !== null && endDate === null) {
      await dispatch(generateInvoiceRequest({ startDate, endDate: startDate }));
    }
    handleClose();
    reset();
    window.location.reload();
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Вибрати період формування інвойсу</DialogTitle>
        <DialogContent dividers>
          <Grid container justifyContent="center">
            <Grid item xs={7} alignItems="center" justifyContent="center">
              <MuiPickersUtilsProvider locale={uk} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  disableFuture
                  disabled={isDisabledDatePicker}
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Виберіть початкову дату"
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  invalidDateMessage="Неправильний формат дати!"
                />
                <KeyboardDatePicker
                  disableToolbar
                  disableFuture
                  disabled={isDisabledDatePicker}
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Виберіть кінцеву дату"
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  invalidDateMessage="Неправильний формат дати!"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item alignItems="center" justifyContent="center">
              <FormControl>
                <RadioGroup name="invoice-date-range" value={dateRange} onChange={handleDateRangeChange}>
                  <FormControlLabel
                    disabled={isDisabledRadio}
                    value={InvoiceDateRange.ONE_DAY_AGO}
                    control={
                      <Radio
                        classes={{
                          root: darkMode ? classes.radioDark : classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="День"
                  />
                  <FormControlLabel
                    disabled={isDisabledRadio}
                    value={InvoiceDateRange.ONE_WEEK_AGO}
                    control={
                      <Radio
                        classes={{
                          root: darkMode ? classes.radioDark : classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="Тиждень"
                  />
                  <FormControlLabel
                    disabled={isDisabledRadio}
                    value={InvoiceDateRange.ONE_MONTH_AGO}
                    control={
                      <Radio
                        classes={{
                          root: darkMode ? classes.radioDark : classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="Місяць"
                  />
                  <FormControlLabel
                    disabled={isDisabledRadio}
                    value={InvoiceDateRange.ONE_YEAR_AGO}
                    control={
                      <Radio
                        classes={{
                          root: darkMode ? classes.radioDark : classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="Рік"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Box className={classes.btnWrapper}>
              <Button
                className={classnames(
                  classes.btn,
                  darkMode ? classes.btnConfirmDark : classes.btnConfirmLight
                )}
                variant="contained"
                onClick={submit}
              >
                Підтвердити
              </Button>
              <Button
                className={classnames(classes.btn, darkMode ? classes.btnResetDark : classes.btnResetLight)}
                variant="contained"
                onClick={reset}
              >
                Скинути
              </Button>
              <Button
                className={classnames(classes.btn, darkMode ? classes.btnCancelDark : classes.btnCancelLight)}
                variant="contained"
                onClick={handleClose}
              >
                Скасувати
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
