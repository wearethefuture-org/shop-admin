import React, { useState } from 'react';
import AccountListMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PieChartIcon from '@material-ui/icons/PieChart';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import LogoutDialog from '../../Modals/LogoutDialog/LogoutDialog';
import UserDialog from '../../Modals/UserDialog/UserDialog';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IUserItem } from '../../../interfaces/IUsers';

interface AccountListProps {
  accountAnchorEl: null | Element,
  onAccountListClose: () => void,
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

const AccountList: React.FC<AccountListProps> = ({ accountAnchorEl, onAccountListClose }) => {
  const [ logoutModalOpen, setLogoutModalOpen ] = useState(false);
  const [ userDialogIsOpen, setUserDialogIsOpen ] = useState(false);

  const user = useSelector<RootState, IUserItem | null>((state) => state.user.user);

  const classes = useStyles();
  const userDialogClose = () => {
    setUserDialogIsOpen(false);
  };
  const openDialogUser = () => {
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
      anchorEl={ accountAnchorEl }
      anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
      keepMounted
      transformOrigin={ { vertical: 'top', horizontal: 'right' } }
      open={ !!accountAnchorEl }
      onClose={ onAccountListClose }
    >
      <MenuItem className={ classes.menuItem } onClick={ openDialogUser }>
        <ListItemIcon className={ classes.iconItem }>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Профіль
      </MenuItem>
      <MenuItem className={ classes.menuItem } onClick={ onAccountListClose }>
        <ListItemIcon className={ classes.iconItem }>
          <QuestionAnswerIcon fontSize="small" />
        </ListItemIcon>
        Контакти
      </MenuItem>
      <MenuItem className={ classes.menuItem } onClick={ onAccountListClose }>
        <ListItemIcon className={ classes.iconItem }>
          <PieChartIcon fontSize="small" />
        </ListItemIcon>
        Аналітика
      </MenuItem>
      <Divider />
      <MenuItem className={ classes.menuItem } onClick={ openLogoutDialog }>
        <ListItemIcon className={ classes.iconItem }>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        Вийти
      </MenuItem>
      { logoutModalOpen && <LogoutDialog closeModal={ closeLogoutModal } /> }
      { userDialogIsOpen && <UserDialog isNew={ false } user={ user } closeModal={ userDialogClose } /> }
    </AccountListMenu>
  );
};

export default AccountList;