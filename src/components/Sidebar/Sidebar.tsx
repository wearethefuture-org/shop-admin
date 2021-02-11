/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HouseIcon from '@material-ui/icons/House';
import CategoryIcon from '@material-ui/icons/Category';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import GroupIcon from '@material-ui/icons/Group';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsIcon from '@material-ui/icons/Settings';
import { firstCharToUpperCase as charToUp } from '../../utils/firstCharToUpperCase';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useDidUpdate from '../../hooks/useDidUpdate';

interface SidebarProps {
  isOpen: boolean;
  onSidebarToggle: () => void;
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: '100%',
    width: '240px',
    marginLeft: (isOpen: boolean) => (isOpen ? '0' : '-240px'),
    transition: `margin-left 0.3s ease-in-out`,
  },
  sidebarPaper: {
    flexGrow: 1,
    position: 'relative',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    border: 'none',
  },
  sidebarTitle: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    backgroundColor: 'darkgreen',
    color: '#fff',
    padding: theme.spacing(0, 1),
    paddingLeft: '20px',
    fontSize: '18px',
    fontStyle: 'bold',
    ...theme.mixins.toolbar,
  },
  mainNav: {
    padding: '4px 10px',
  },
  listButton: {
    color: theme.palette.grey[700],
    height: '45px',
  },
  activeButton: {
    borderRadius: '3px',
    color: 'inherit',
    backgroundColor: theme.palette.action.selected,
  },
  itemIcon: {
    minWidth: '0',
    margin: '0 8px 0 0',
  },
  itemText: {
    fontSize: '15px',
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSidebarToggle }) => {
  const screenSize: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  useDidUpdate(() => (screenSize ? onSidebarToggle() : void 0), [screenSize]);
  useDidUpdate(() => (!screenSize ? onSidebarToggle() : void 0), [screenSize]);

  const { pathname: activePath } = useLocation();

  const classes = useStyles(isOpen);
  const sidebarItems = [
    {
      pageURL: '/dashboard',
      itemIcon: <HouseIcon fontSize="small" className={styles.icon} />,
    },
    {
      pageURL: '/categories',
      itemIcon: <CategoryIcon fontSize="small" className={styles.icon} />,
    },
    {
      pageURL: '/products',
      itemIcon: <ShoppingCartIcon fontSize="small" className={styles.icon} />,
    },
    {
      pageURL: '/statistic',
      itemIcon: <EqualizerIcon fontSize="small" className={styles.icon} />,
    },
    {
      pageURL: '/users',
      itemIcon: <GroupIcon fontSize="small" className={styles.icon} />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={isOpen}
      className={classes.sidebar}
      classes={{
        paper: classes.sidebarPaper,
      }}
    >
      <div className="sidebar-header">
        <div className={classes.sidebarTitle}>Shop Admin Panel</div>
        <Divider />
      </div>
      <div className="sidebar-nav">
        <List component="nav" className={classes.mainNav}>
          {sidebarItems.map(({ pageURL, itemIcon }) => (
            <NavLink to={pageURL} key={charToUp(pageURL)}>
              <ListItem
                button
                className={classes.listButton}
                classes={{
                  root: pageURL === activePath ? classes.activeButton : void 0,
                }}
              >
                <ListItemIcon className={classes.itemIcon}>{itemIcon}</ListItemIcon>
                <ListItemText className={classes.itemText} primary={charToUp(pageURL)} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List className={classes.mainNav}>
          {['Invoice', 'Settings'].map((text, index) => (
            <ListItem
              button
              key={text}
              className={classes.listButton}
              classes={{
                root: text === activePath ? classes.activeButton : void 0,
              }}
            >
              <ListItemIcon className={classes.itemIcon}>
                {index % 2 === 0 ? (
                  <ReceiptIcon fontSize="small" className={styles.icon} />
                ) : (
                  <SettingsIcon fontSize="small" className={styles.icon} />
                )}
              </ListItemIcon>
              <ListItemText className={classes.itemText} primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
