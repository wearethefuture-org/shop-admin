import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, Typography } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

interface NotificationListProps {
  noticeAnchorEl: null | Element;
  onNoticeListClose: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  dropdown: {
    width: '20rem',
    fontSize: '15px',
    padding: '0',
  },
  header: {
    display: 'flex',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
  },
  messageItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    paddingLeft: '0.5rem',
  },
  name: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
  },
  text: {
    margin: '4px 0 0',
    fontSize: '12px',
    color: theme.palette.text.secondary,
    whiteSpace: 'pre-wrap',
  },
  footer: {
    textAlign: 'center',
    padding: '8px',
    fontSize: '12px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
  },
  orange: {
    backgroundColor: 'orange',
  },
}));

const NotificationList: React.FC<NotificationListProps> = ({
  noticeAnchorEl,
  onNoticeListClose,
}) => {
  const classes = useStyles();

  const messageList = [
    {
      icon: <NotificationsIcon fontSize="small" style={{ color: '#ff4081' }} />,
      name: 'Update completed',
      message: 'Restart server 12 to complete the update',
      timeLeft: '2h',
    },
    {
      icon: <DraftsIcon fontSize="small" style={{ color: '#ff9800' }} />,
      name: 'Lorem ipsum',
      message: 'Aliquam ex eros, imperdiet vulputate hendrerit et.',
      timeLeft: '6h',
    },
    {
      icon: <DeviceUnknownIcon fontSize="small" style={{ color: '#3f51b5' }} />,
      name: 'Login from 192.186.1.1',
      message: '',
      timeLeft: '8h',
    },
    {
      icon: <NotificationsOffIcon fontSize="small" style={{ color: '#4caf50' }} />,
      name: 'New connection',
      message: 'Anna accepted your request.',
      timeLeft: '12h',
    },
  ];

  return (
    <Menu
      classes={{ list: classes.dropdown }}
      anchorEl={noticeAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!noticeAnchorEl}
      onClose={onNoticeListClose}
    >
      <Typography
        className={classes.header}
      >{`${messageList.length} нових повідомлень`}</Typography>

      {messageList.map(({ icon, name, message, timeLeft }) => (
        <MenuItem className={classes.messageItem} onClick={onNoticeListClose} key={name}>
          <Grid container>
            <Grid item xs={2} className={classes.iconContainer}>
              {icon}
            </Grid>
            <Grid item xs={10} className={classes.content}>
              <Typography className={classes.name}>{name}</Typography>
              <Typography className={classes.text}>{message}</Typography>
              <Typography className={classes.text}>{`${timeLeft} тому`}</Typography>
            </Grid>
          </Grid>
        </MenuItem>
      ))}

      <Typography className={classes.footer}>{`Показати всі повідомлення`}</Typography>
    </Menu>
  );
};

export default NotificationList;
