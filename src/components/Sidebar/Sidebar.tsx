/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles, Theme, ThemeOptions } from '@material-ui/core/styles';
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
import MessageIcon from '@material-ui/icons/Message';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SettingsIcon from '@material-ui/icons/Settings';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import DescriptionIcon from '@material-ui/icons/Description';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import useDidUpdate from '../../hooks/useDidUpdate';
import styles from './Sidebar.module.scss';
import { getProductsRequest } from '../../store/actions/products.actions';
import { IProductsData } from '../../interfaces/IProducts';
import { COLORS } from '../../values/colors';

interface SidebarProps {
  isOpen: boolean;
  onSidebarToggle: () => void;
}

const useStyles = makeStyles(
  (theme): ThemeOptions => ({
    sidebar: {
      position: 'fixed',
      zIndex: 5,
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
      backgroundColor: COLORS.primaryGreen,
      color: COLORS.primaryLight,
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
      'color': COLORS.fontColor,
      'height': '45px',
      '&:hover': {
        backgroundColor: COLORS.primaryOttoman,
      },
    },
    listButtonDark: {
      'color': COLORS.primaryLight,
      'height': '45px',
      '&:hover': {
        backgroundColor: COLORS.darkGray,
      },
    },
    activeButton: {
      borderRadius: '3px',
      color: 'inherit',
      backgroundColor: COLORS.secondaryOttoman,
    },
    activeButtonDark: {
      borderRadius: '3px',
      color: 'inherit',
      backgroundColor: COLORS.darkSecondaryGray,
    },
    itemIcon: {
      minWidth: '0',
      margin: '0 8px 0 0',
    },
    itemText: {
      fontSize: '15px',
    },
  })
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSidebarToggle }) => {
  const screenSize: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  useDidUpdate(() => (screenSize ? onSidebarToggle() : void 0), [screenSize]);
  useDidUpdate(() => (!screenSize ? onSidebarToggle() : void 0), [screenSize]);

  const { pathname: activePath } = useLocation();

  const { isSearch }: Partial<IProductsData> = useSelector((state: RootState) => state.products);
  const classes = useStyles(isOpen);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const dispatch: AppDispatch = useDispatch();
  const sidebarItems = [
    {
      pageURL: '/dashboard',
      title: 'Дошка',
      itemIcon: (
        <HouseIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
    {
      pageURL: '/tree-categories',
      title: 'Категорії',
      itemIcon: (
        <CategoryIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
    {
      pageURL: '/products',
      title: 'Продукти',
      itemIcon: (
        <ShoppingCartIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
    {
      pageURL: '/statistic',
      title: 'Статистика',
      itemIcon: (
        <EqualizerIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
    {
      pageURL: '/users',
      title: 'Користувачі',
      itemIcon: (
        <GroupIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
    {
      pageURL: '/slides',
      title: 'Слайди',
      itemIcon: (
        <AmpStoriesIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
    {
      pageURL: '/comments',
      title: 'Коментарі',
      itemIcon: (
        <MessageIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
    {
      pageURL: '/feedbacks',
      title: 'Відгуки',
      itemIcon: (
        <FeedbackIcon
          fontSize="small"
          className={styles.icon}
          style={darkMode ? { color: COLORS.darkGreen } : {}}
        />
      ),
    },
  ];

  const extraSidebarItems = [
    { pageURL: '/orders', title: 'Замовлення' },
    { pageURL: '/invoices', title: 'Інвойси' },
    { pageURL: '/settings', title: 'Налаштування' },
  ];

  const handleClick = (url: string) => {
    if (url === '/products' && isSearch) {
      dispatch(getProductsRequest(1, 10));
    }
  };

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
        <div
          style={darkMode ? { backgroundColor: COLORS.darkGreen } : {}}
          className={classes.sidebarTitle}
        >
          BuyAll Адмін панель
        </div>
        <Divider />
      </div>
      <div className="sidebar-nav">
        <List component="nav" className={classes.mainNav}>
          {sidebarItems.map(({ pageURL, itemIcon, title }) => (
            <NavLink to={pageURL} key={pageURL}>
              <ListItem
                button
                onClick={() => handleClick(pageURL)}
                className={darkMode ? classes.listButtonDark : classes.listButton}
                classes={{
                  root:
                    pageURL === activePath
                      ? darkMode
                        ? classes.activeButtonDark
                        : classes.activeButton
                      : void 0,
                }}
              >
                <ListItemIcon className={classes.itemIcon}>{itemIcon}</ListItemIcon>
                <ListItemText className={classes.itemText} primary={title} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List className={classes.mainNav}>
          {extraSidebarItems.map((item, index) => (
            <NavLink to={item.pageURL} key={item.pageURL}>
              <ListItem
                button
                key={item.pageURL}
                className={darkMode ? classes.listButtonDark : classes.listButton}
                classes={{
                  root:
                    item.pageURL === activePath
                      ? darkMode
                        ? classes.activeButtonDark
                        : classes.activeButton
                      : void 0,
                }}
              >
                <ListItemIcon className={classes.itemIcon}>
                  {index % 2 === 0 ? (
                    <ReceiptIcon
                      fontSize="small"
                      className={styles.icon}
                      style={darkMode ? { color: COLORS.darkGreen } : {}}
                    />
                  ) : (
                    <SettingsIcon
                      fontSize="small"
                      className={styles.icon}
                      style={darkMode ? { color: COLORS.darkGreen } : {}}
                    />
                  )}
                </ListItemIcon>
                <ListItemText className={classes.itemText} primary={item.title} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
