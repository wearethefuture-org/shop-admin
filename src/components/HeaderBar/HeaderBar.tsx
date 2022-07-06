import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Search from './Search/Search';
import AppBarMenu from './Menu/Menu';
import AccountList from './AccountList/AccountMenuList';
import MailList from './MailList/MailList';
import NotificationList from './NotificationList/NotificationList';
import { COLORS } from '../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface HeaderBarProps {
  onSidebarToggle: () => void;
  isShrink: boolean;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  width: {
    width: '100%',
  },
  appBar: {
    backgroundColor: COLORS.primaryGreen,
    paddingLeft: 0,
    zIndex: 3,
    transition: `all 0.3s ease-in-out`,
  },
  appBarShrinked: {
    backgroundColor: COLORS.primaryGreen,
    paddingLeft: '240px',
    zIndex: 3,
    transition: `all 0.3s ease-in-out`,
  },
  appBarShift: {
    flexShrink: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const { onSidebarToggle, isShrink } = props;
  const classes = useStyles(props);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const [mailAnchorEl, setMailAnchorEl] = React.useState(null);
  const [noticeAnchorEl, setNoticeAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleMailListOpen = (evt: any) => {
    setMailAnchorEl(evt.currentTarget);
  };

  const handleNoticeListOpen = (evt: any) => {
    setNoticeAnchorEl(evt.currentTarget);
  };

  const handleAccountListOpen = (evt: any) => {
    setAccountAnchorEl(evt.currentTarget);
  };

  const handleMobileMenuOpen = (evt: any) => {
    setMobileMoreAnchorEl(evt.currentTarget);
  };

  const allDropdownsClose = () => {
    setAccountAnchorEl(null);
    setNoticeAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setMailAnchorEl(null);
  };

  return (
    <div
      className={clsx(classes.grow, classes.width, {
        [classes.appBarShift]: !isShrink,
      })}
    >
      <AppBar
        style={darkMode ? { backgroundColor: COLORS.darkGreen } : {}}
        position="fixed"
        className={isShrink ? classes.appBarShrinked : classes.appBar}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={onSidebarToggle}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Search />
          <div className={classes.grow} />
          <AppBarMenu
            onMailListOpen={handleMailListOpen}
            onAccountListOpen={handleAccountListOpen}
            onNotificationListOpen={handleNoticeListOpen}
            onMobileMenuOpen={handleMobileMenuOpen}
            mobileMenuAnchorEl={mobileMoreAnchorEl}
            allDropdownsClose={allDropdownsClose}
          />
        </Toolbar>
      </AppBar>

      <MailList mailAnchorEl={mailAnchorEl} onMailListClose={allDropdownsClose} />

      <NotificationList noticeAnchorEl={noticeAnchorEl} onNoticeListClose={allDropdownsClose} />

      <AccountList accountAnchorEl={accountAnchorEl} onAccountListClose={allDropdownsClose} />
    </div>
  );
};

export default HeaderBar;
