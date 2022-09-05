import React, { forwardRef, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import './costomPickerStyle.scss';

import { AppDispatch } from '../../store/store';

import { getOrderByRangeRequest } from '../../store/actions/orders.actions';
import { getCommentsByRangeRequest } from '../../store/actions/comments.actions';
import { getUsersDateRangeRequest } from '../../store/actions/users.actions';
import { COLORS } from '../../values/colors';

import uk from 'date-fns/locale/uk';
registerLocale('uk', uk);

enum datePosition {
  start = 'start',
  stop = 'stop',
}

enum btnTarget {
  order = 'order',
  users = 'users',
  comments = 'comments',
}

const useStyles = makeStyles({
  dateSections: {
    display: 'block',
    width: '100%',
    marginBottom: '50px',
  },
  datePickers: {
    display: 'flex',
    width: 'fit-content',
    margin: '30px auto 0 auto',
  },
  dateSection: {
    marginRight: '15px',
  },
  buttonsSection: {
    width: '100%',
  },
  buttonsList: {
    listStyle: 'none',
    display: 'flex',
    width: 'fit-content',
    margin: '30px auto 0 auto',
    padding: '0',
  },
  buttonItem: {
    marginRight: '15px',
  },
  button: {
    'backgroundColor': COLORS.primaryBlue,
    'borderRadius': '30px',
    '&:hover': {
      backgroundColor: COLORS.secondaryBlue,
    },
  },
  selectSection: {
    'outline': `1px solid ${COLORS.primaryBlue}`,
    'backgroundColor': COLORS.primaryBlue,
    'border': 'none',
    'borderRadius': '30px',
    'fontSize': '0.875rem',
    'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
    'fontWeight': 500,
    'lineHeight': '1.75',
    'letterSpacing': '0.02857em',
    'padding': '6px 16px',
    'color': COLORS.primaryLight,
    'boxShadow':
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    '&:hover': {
      backgroundColor: COLORS.secondaryBlue,
    },
  },
});

const StatisticsButtons: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const dispatch: AppDispatch = useDispatch();

  const styles = useStyles();

  const onDateChangeHandler = (date: any, position: string) => {
    position === datePosition.start ? setStartDate(date) : setEndDate(date);
  };

  const onClickHandle = (target: string) => {
    let afterEndDate = new Date(endDate);
    afterEndDate.setDate(afterEndDate.getDate() + 1);

    const formatedStartDate = startDate!.toISOString().split('T')[0];
    const formatedEndDate = afterEndDate!.toISOString().split('T')[0];

    switch (target) {
      case btnTarget.order:
        return dispatch(getOrderByRangeRequest([formatedStartDate, formatedEndDate]));
      case btnTarget.users:
        return dispatch(getUsersDateRangeRequest([formatedStartDate, formatedEndDate]));
      case btnTarget.comments:
        return dispatch(getCommentsByRangeRequest([formatedStartDate, formatedEndDate]));
    }
  };

  const ExampleCustomInput = forwardRef<HTMLButtonElement, { value: any; onClick: any }>(
    ({ value, onClick }, ref) => (
      <button className={styles.selectSection} onClick={onClick} ref={ref}>
        {value}
      </button>
    )
  );

  return (
    <div className={styles.dateSections}>
      <div className={styles.datePickers}>
        <DatePicker
          locale="uk"
          selected={startDate}
          onChange={(date) => onDateChangeHandler(date, datePosition.start)}
          customInput={<ExampleCustomInput value={undefined} onClick={undefined} />}
          dateFormat="dd.MM.yyyy"
          maxDate={new Date() || endDate}
        />
        <DatePicker
          locale="uk"
          selected={endDate}
          onChange={(date) => onDateChangeHandler(date, datePosition.stop)}
          customInput={<ExampleCustomInput value={undefined} onClick={undefined} />}
          dateFormat="dd.MM.yyyy"
          minDate={startDate}
          maxDate={new Date()}
        />
      </div>
      <div className={styles.buttonsSection}>
        <ul className={styles.buttonsList}>
          <li className={styles.buttonItem}>
            <Button
              className={styles.button}
              id="order"
              variant="contained"
              color="primary"
              type="button"
              onClick={() => onClickHandle(btnTarget.order)}
            >
              замовлення
            </Button>
          </li>
          <li className={styles.buttonItem}>
            <Button
              className={styles.button}
              id="users"
              variant="contained"
              color="primary"
              type="button"
              onClick={() => onClickHandle(btnTarget.users)}
            >
              користувачі
            </Button>
          </li>
          <li>
            <Button
              className={styles.button}
              id="comments"
              variant="contained"
              color="primary"
              type="button"
              onClick={() => onClickHandle(btnTarget.comments)}
            >
              коментарі
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StatisticsButtons;
