import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, Grid, Typography } from '@material-ui/core';

interface MailListProps {
  mailAnchorEl: null | Element,
  onMailListClose: () => void
}

const useStyles = makeStyles(theme => ({
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
  avatar: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    paddingLeft: '0.5rem'
  },
  name: {
    color: theme.palette.text.primary,
  },
  text: {
    margin: '4px 0 0',
    fontSize: '12px',
    color: theme.palette.text.secondary,
    whiteSpace: 'pre-wrap'
  },
  footer: {
    textAlign: 'center',
    padding: '8px',
    fontSize: '12px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)'
  },
  orange: {
    backgroundColor: 'orange'
  }
}))

const MailList: React.FC<MailListProps> = ({ mailAnchorEl, onMailListClose }) => {
  const classes = useStyles()

  const messageList = [
    {
      name: 'Norman Bilodeau',
      message: 'Lorem ipsum dolor sit, amet',
      timeLeft: '5m'
    },
    {
      name: 'Rechard Gear',
      message: 'consectetur adipisicing elit. Eos, minus.',
      timeLeft: '30m'
    },
    {
      name: 'Daisy Sager',
      message: 'Nobis vero quae laboriosam voluptatum dicta a quas ab!',
      timeLeft: '2h'
    },
    {
      name: 'Karie Burton',
      message: 'Modi provident ipsam eveniet. Quo autem, reprehenderit provident ipsam eveniet. Quo ',
      timeLeft: '5h'
    },
  ]

  return (
    <Menu
      classes={{ list: classes.dropdown }}
      anchorEl={mailAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!mailAnchorEl}
      onClose={onMailListClose}
    >
      <Typography className={classes.header}>{`${messageList.length} New Messages`}</Typography>

      {messageList.map(({ name, message, timeLeft }) => (
        <MenuItem className={classes.messageItem} onClick={onMailListClose} key={name}>
          <Grid container>
            <Grid item xs={2} className={classes.avatar}>
              <Avatar className={classes.orange}>{name.charAt(0)}</Avatar>
            </Grid>
            <Grid item xs={10} className={classes.content}>
              <Typography className={classes.name}>{name}</Typography>
              <Typography className={classes.text}>{message}</Typography>
              <Typography className={classes.text}>{`${timeLeft} ago`}</Typography>
            </Grid>
          </Grid>
        </MenuItem>
      ))}

      <Typography className={classes.footer}>{`Show all messages`}</Typography>
    </Menu>
  )
}

export default MailList