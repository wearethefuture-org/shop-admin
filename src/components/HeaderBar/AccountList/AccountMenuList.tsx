import React, { useState } from 'react';
import AccountListMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PieChartIcon from '@material-ui/icons/PieChart';
import { makeStyles } from '@material-ui/core/styles';
import LogoutDialog from '../../Modals/LogoutDialog/LogoutDialog';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserDialog from '../../Modals/UserDialog/UserDialog';
import { getUser } from '../../../services/local-storage-controller';

interface AccountListProps {
  accountAnchorEl: null | Element;
  onAccountListClose: () => void;
}

const useStyles = makeStyles({
  menuItem: {
    fontSize: '15px',
  },
  iconItem: {
    marginRight: '0.5rem',
    minWidth: 'auto',
  },
});

const AccountList: React.FC<AccountListProps> = (props) => {
  const { accountAnchorEl, onAccountListClose } = props;
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [userDialogIsOpen, setUserDialogIsOpen] = useState(false);
  const [user, setUser] = useState();
  const classes = useStyles();
  const userDialogClose = () => {
    setUserDialogIsOpen(false);
  };
  const openDialogUser = () => {
    let tmp = getUser();
    setUser(tmp);
    setUserDialogIsOpen(true);
  };

  const openLogoutDialog = () => {
    setLogoutModalOpen(true);
    onAccountListClose();
  };
  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  return (
    <AccountListMenu
      anchorEl={accountAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!accountAnchorEl}
      onClose={onAccountListClose}
    >
      <MenuItem className={classes.menuItem} onClick={openDialogUser}>
        <ListItemIcon className={classes.iconItem}>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Профіль
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={onAccountListClose}>
        <ListItemIcon className={classes.iconItem}>
          <QuestionAnswerIcon fontSize="small" />
        </ListItemIcon>
        Contacts
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={onAccountListClose}>
        <ListItemIcon className={classes.iconItem}>
          <PieChartIcon fontSize="small" />
        </ListItemIcon>
        Analytics
      </MenuItem>
      <Divider />
      <MenuItem className={classes.menuItem} onClick={openLogoutDialog}>
        <ListItemIcon className={classes.iconItem}>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        Вихід
      </MenuItem>
      {logoutModalOpen && <LogoutDialog closeModal={closeLogoutModal} />}
      {userDialogIsOpen && <UserDialog isNew={false} user={user} closeModal={userDialogClose} />}
    </AccountListMenu>
  );
};

export default AccountList;
