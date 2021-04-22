import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import styles from './OrdersTable.module.scss';

const OrdersItemTableHeader = ({ order }) => {
  return (
    <div className={styles.orderHeader}>
      <div className={styles.headerTitle}>Замовлення № {order.id}</div>
      <div className={styles.headerUserData}>
        <PersonPinIcon color="primary" />
        {order.user.firstName} {order.user.lastName}
      </div>
      <div className={styles.headerUserData}>
        <a href={`mailto:${order.user.email}`}>
          <EmailIcon color="primary" /> {order.user.email}
        </a>
      </div>
      <div className={styles.headerUserData}>
        <a href={`tel:${order.user.phoneNumber.replace(/ /g, '')}`}>
          <PhoneInTalkIcon color="primary" /> {order.user.phoneNumber}
        </a>
      </div>
      <div className={styles.amount}>
        Загальна сума {order.productToOrder.map((item) => item.amount).reduce((a, b) => a + b, 0)}{' '}
        грн.
      </div>
    </div>
  );
};

export default OrdersItemTableHeader;
