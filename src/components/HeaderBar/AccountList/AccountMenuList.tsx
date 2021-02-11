import React from 'react';
import AccountListMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PieChartIcon from '@material-ui/icons/PieChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

interface AccountListProps {
  accountAnchorEl: null | Element,
  onAccountListClose: () => void,
}

const useStyles = makeStyles({
  menuItem: {
    fontSize: '15px'
  },
  iconItem: {
    marginRight: '0.5rem',
    minWidth: 'auto'
  },
})

const AccountList: React.FC<AccountListProps> = (props) => {
  const { accountAnchorEl, onAccountListClose } = props
  const classes = useStyles()

  return (
    <AccountListMenu
      anchorEl={accountAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!accountAnchorEl}
      onClose={onAccountListClose}
    >
      <MenuItem className={classes.menuItem} onClick={onAccountListClose}>
        <ListItemIcon className={classes.iconItem}><PersonIcon fontSize="small" /></ListItemIcon>
        View Profile
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={onAccountListClose}>
        <ListItemIcon className={classes.iconItem}><QuestionAnswerIcon fontSize="small" /></ListItemIcon>
        Contacts
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={onAccountListClose}>
        <ListItemIcon className={classes.iconItem}><PieChartIcon fontSize="small" /></ListItemIcon>
        Analytics
      </MenuItem>
      <Divider />
      <MenuItem className={classes.menuItem} onClick={onAccountListClose}>
        <ListItemIcon className={classes.iconItem}><ExitToAppIcon fontSize="small" /></ListItemIcon>
        Sign out
      </MenuItem>
    </AccountListMenu>
  )
}

export default AccountList