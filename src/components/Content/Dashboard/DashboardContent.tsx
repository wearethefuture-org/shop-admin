import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Avatar } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Pie, Line } from 'react-chartjs-2';
import { COLORS } from '../../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface DashboardProps {
  data?: Array<any>;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    height: '100%',
  },
  cardFlex: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingLeft: '25px',
  },
  dashboard: {
    border: 'none',
  },
  header: {
    minHeight: '200px',
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  headerLight: {
    backgroundColor: COLORS.secondaryOttoman,
    color: COLORS.fontColor,
  },
  headerDark: {
    backgroundColor: COLORS.darkGray,
    color: COLORS.primaryLight,
  },
  content: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  gridWraper: {
    position: 'relative',
  },
  row: {
    border: 'none',
  },
  col: {
    height: '345px',
  },
  row1card: {
    height: '170px',
  },
  row2card: {
    height: '345px',
  },
  row3card: {
    height: '430px',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: COLORS.primaryBlue,
  },
  cardValue: {
    fontSize: '29px',
    color: COLORS.darkGreen,
  },
  cardComment: {
    fontSize: '13px',
    color: COLORS.darkBlue,
  },
  cardIcon: {
    backgroundColor: COLORS.darkBlue,
    position: 'absolute',
    top: '10px',
    right: '20px',
  },
  cardIconLight: {
    color: COLORS.primaryLight,
  },
  cardIconDark: {
    color: COLORS.darkGray,
  },
  movement: {
    display: 'flex',
    height: '45px',
    alignItems: 'center',
    color: COLORS.primaryBlue,
    paddingLeft: '20px',
    marginBottom: '10px',
  },
}));

const DashboardContent: React.FC<DashboardProps> = () => {
  const classes = useStyles();
  const [chartPie, setChartPie] = React.useState({});
  const [chartMovement, setChartMovement] = React.useState({});

  const { darkMode } = useSelector((state: RootState) => state.theme);

  const movementData = () =>
    setChartMovement({
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [
        {
          label: '',
          data: ['3', '2', '3', '5', '6', '5', '4', '6', '9', '10', '8', '9'],
          backgroundColor: [COLORS.darkBlue],
          borderWidth: 4,
        },
      ],
    });

  const pieData = () =>
    setChartPie({
      labels: ['Chrome', 'Yandex', 'Firefox'],
      datasets: [
        {
          label: 'Points',
          backgroundColor: [COLORS.darkYellow, COLORS.darkRed, COLORS.darkBlue],
          data: ['4401', '4003', '1589'],
        },
      ],
      options: {
        cutoutPercentage: 50,
        rotation: Math.PI * -0.5,
        animation: {
          animateScale: true,
        },
      },
    });

  useEffect(() => {
    pieData();
    movementData();
  }, []);

  const firstRow = [
    {
      title: 'Продаж сегодня',
      value: '2.562',
      persent: <span style={{ color: 'red' }}>-2.65%</span>,
      comment: 'Продаж больше чем обычно',
      icon: <LocalShippingIcon fontSize="small" />,
    },
    {
      title: 'Всего заработано',
      value: '$24.300',
      persent: <span style={{ color: 'green' }}>8.35%</span>,
      comment: 'Заработно больше чем обычно',
      icon: <AttachMoneyIcon fontSize="small" />,
    },
    {
      title: 'Посетителей сегодня',
      value: '17.212',
      persent: <span style={{ color: 'green' }}>5.50%</span>,
      comment: 'Больше посетителей чем обычно',
      icon: <PeopleIcon fontSize="small" />,
    },
    {
      title: 'Заказы в ожидании',
      value: '43',
      persent: <span style={{ color: 'red' }}>-4.25%</span>,
      comment: 'Меньше заказов чем обычно',
      icon: <ShoppingCartIcon fontSize="small" />,
    },
  ];

  return (
    <div className={classes.dashboard}>
      <div className={clsx(classes.header, darkMode ? classes.headerDark : classes.headerLight)}>
        <h3>Welcome back, Satoshi Nakamoto!</h3>
        <p>У вас 24 новых сообщения и 5 уведомлений.</p>
      </div>
      <div className={classes.content}>
        <Grid container className={classes.gridWraper} spacing={3}>
          <Grid item container className={classes.row} spacing={3}>
            <Grid item container xs={12} sm={12} md={6} className={classes.col}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className={classes.movement}>
                    <p style={{ flexGrow: 1, margin: 0, fontWeight: 'bold' }}>
                      Недавние покупки боярышника
                    </p>
                    <CachedIcon />
                    <MoreVertIcon />
                  </div>
                  <Line data={chartMovement} />
                </Paper>
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={12} md={6} spacing={3} className={classes.col}>
              {firstRow.map(({ title, value, persent, comment, icon }) => (
                <Grid item xs={12} sm={6} className={classes.row1card} key={title}>
                  <Paper className={clsx(classes.paper, classes.cardFlex)}>
                    <Typography className={classes.cardTitle}>{title}</Typography>
                    <Typography className={classes.cardValue}>{value}</Typography>
                    <Typography className={classes.cardComment}>
                      {persent} {comment}
                    </Typography>
                    <Avatar
                      className={clsx(
                        classes.cardIcon,
                        darkMode ? classes.cardIconDark : classes.cardIconLight
                      )}
                    >
                      {icon}
                    </Avatar>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item container className={classes.row} spacing={3}>
            <Grid item sm={12} md={6} className={classes.row2card}>
              <Paper className={classes.paper}>КАЛЕНДАРЬ</Paper>
            </Grid>
            <Grid item sm={12} md={6} className={classes.row2card}>
              <Paper className={classes.paper}>
                <div className={classes.movement}>
                  <p style={{ flexGrow: 1, margin: 0, fontWeight: 'bold' }}>Статистика браузеров</p>
                  <CachedIcon />
                  <MoreVertIcon />
                </div>
                <Pie data={chartPie} />
              </Paper>
            </Grid>
            <Grid item sm={12} md={12} className={classes.row2card} style={{ height: '452px' }}>
              <Paper className={classes.paper}>ПОСЕТИТЕЛИ ПО СТРАНАМ / ОБЛАСТЯМ</Paper>
            </Grid>
          </Grid>

          <Grid item container className={classes.row} spacing={3}>
            <Grid item sm={12} md={8} className={classes.row3card}>
              <Paper className={classes.paper}>ТОП ПРОДАВАЕМЫХ ПРОДУКТОВ</Paper>
            </Grid>
            <Grid item sm={12} md={4} className={classes.row3card}>
              <Paper className={classes.paper}>РЕЙТИНГ ПРОДАЖ ПО МЕСЯЦАМ</Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardContent;
