import React, { FC } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import SmsIcon from '@material-ui/icons/Sms';
import styles from './OrdersTable.module.scss';
import { useHistory } from 'react-router';
import GoBackBtn from '../../GoBackBtn/GoBackBtn';
import { ICurrentOrder } from '../../../interfaces/IOrders';
import { COLORS } from '../../../values/colors';

interface OrdersItemTableHeaderProps {
  order: ICurrentOrder;
  darkMode: boolean;
}

const OrdersItemTableHeader: FC<OrdersItemTableHeaderProps> = ({ order, darkMode }) => {
  const history = useHistory();
  return (
    <div className={styles.orderHeader}>
      <GoBackBtn handleGoBack={() => history.push('/orders')} />
      <div className={styles.headerTitle}>Замовлення № {order.id}</div>
      <div className={styles.headerUserData}>
        <PersonPinIcon
          style={darkMode ? { color: COLORS.darkBlue } : { color: COLORS.primaryBlue }}
        />
        {order.additionalFirstName ? order.additionalFirstName : order.user.firstName}{' '}
        {order.additionalLastName ? order.additionalLastName : order.user.lastName}
      </div>
      <div className={styles.headerUserData}>
        <a href={`mailto:${order.additionalEmail ? order.additionalEmail : order.user.email}`}>
          <EmailIcon
            style={darkMode ? { color: COLORS.darkBlue } : { color: COLORS.primaryBlue }}
          />{' '}
          {order.additionalEmail ? order.additionalEmail : order.user.email}
        </a>
      </div>
      <div className={styles.headerUserData}>
        <a
          href={`tel:${
            order.additionalNumber
              ? order.additionalNumber.replace(/ /g, '')
              : order.user.phoneNumber.replace(/ /g, '')
          }`}
        >
          <PhoneInTalkIcon
            style={darkMode ? { color: COLORS.darkBlue } : { color: COLORS.primaryBlue }}
          />{' '}
          {order.additionalNumber ? order.additionalNumber : order.user.phoneNumber}
        </a>
      </div>
      {order.notcall ? <div className={styles.notcall}> Не Передзвонювати</div> : null}
      {order.comment && (
        <div className={styles.commentBlock}>
          <SmsIcon style={darkMode ? { color: COLORS.darkBlue } : { color: COLORS.primaryBlue }} />{' '}
          <b>Коментар до замовлення: </b>
          <span>{order.comment}</span>
        </div>
      )}
      <div className={styles.amount}>
        Загальна сума {order.productToOrder.map((item) => item.amount).reduce((a, b) => a + b, 0)}{' '}
        грн.
      </div>
    </div>
  );
};

export default OrdersItemTableHeader;
