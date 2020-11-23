import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AppBarMenu from './Menu/Menu';
import AccountList from './AccountList/AccountMenuList';
import MailList from './MailList/MailList';
import NotificationList from './NotificationList/NotificationList';


interface HeaderBarProps {
  onSidebarToggle: () => void,
  isShrink: boolean,
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  width: {
    width: '100%'
  },
  appBar: {
    backgroundColor: 'darkgreen',
  },
  appBarShift: {
    flexShrink: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
}));


const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const { onSidebarToggle, isShrink } = props
  const classes = useStyles(props);

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
    setMailAnchorEl(null)
  };


  return (
    <div className={clsx(classes.grow, classes.width, {
      [classes.appBarShift]: !isShrink,
    })}>
      <AppBar
        position="static"
        className={classes.appBar}
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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

      <MailList
        mailAnchorEl={mailAnchorEl}
        onMailListClose={allDropdownsClose}
      />

      <NotificationList
        noticeAnchorEl={noticeAnchorEl}
        onNoticeListClose={allDropdownsClose}
      />

      <AccountList
        accountAnchorEl={accountAnchorEl}
        onAccountListClose={allDropdownsClose}
      />
    </div>
  );
}

export default HeaderBar