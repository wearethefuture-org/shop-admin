import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { switchDarkMode } from '../../../store/actions';
import MobileMenuList from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface HeaderBarProps {
  onMailListOpen: (evt: any) => void,
  onNotificationListOpen: (evt: any) => void,
  onAccountListOpen: (evt: any) => void,
  onMobileMenuOpen: (evt: any) => void,
  mobileMenuAnchorEl: null | Element,
  allDropdownsClose: () => void,
}


const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  nightMode: {
    color: (isDark: boolean) => (isDark ? "rgba(0, 0, 0, 0.54)" : "white")
  }
}))

const AppBarMenu: React.FC<HeaderBarProps> = (props) => {
  const {
    onMailListOpen,
    onNotificationListOpen,
    onAccountListOpen,
    onMobileMenuOpen,
    mobileMenuAnchorEl,
    allDropdownsClose
  } = props

  const isDark = useSelector((state: RootState) => state.theme.darkMode)
  const classes = useStyles(isDark)

  const dispatch = useDispatch()
  const themeToggle = () => dispatch(switchDarkMode())

  const mobileMenuList = [
    {
      ariaName: 'mails',
      nmb: 4,
      icon: <MailIcon />,
      msg: 'Messages',
      onClick: onMailListOpen
    },
    {
      ariaName: 'notifications',
      nmb: 11,
      icon: <NotificationsIcon />,
      msg: 'Notifications',
      onClick: onNotificationListOpen
    }
  ]

  return (
    <>
      <div className={classes.sectionDesktop}>
        <IconButton color="inherit" onClick={themeToggle}>
          <Brightness2Icon className={classes.nightMode} />
        </IconButton>
        <IconButton color="inherit" onClick={onMailListOpen}>
          <Badge color="primary"><MailIcon /></Badge>
        </IconButton>
        <IconButton color="inherit" onClick={onNotificationListOpen}>
          <Badge color="primary"><NotificationsIcon /></Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={onAccountListOpen}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
      </div>

      <div className={classes.sectionMobile}>
        <IconButton color="inherit" onClick={themeToggle}>
          <Brightness2Icon className={classes.nightMode} />
        </IconButton>
        <IconButton
          aria-label="show more"
          aria-haspopup="true"
          onClick={onMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>

      <MobileMenuList
        anchorEl={mobileMenuAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!mobileMenuAnchorEl}
        onClose={allDropdownsClose}
      >
        {mobileMenuList.map(({ ariaName, nmb, icon, msg, onClick }) => (
          <MenuItem key={msg} onClick={onClick}>
            <IconButton aria-label={`show ${nmb} new ${ariaName}`} color="inherit">
              <Badge badgeContent={nmb} color="secondary">
                {icon}
              </Badge>
            </IconButton>
            <p>{msg}</p>
          </MenuItem>
        ))}
        <MenuItem onClick={onAccountListOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <p>Account</p>
        </MenuItem>
      </MobileMenuList>
    </>
  )
}

export default AppBarMenu
