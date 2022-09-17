import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

import CustomTooltip from './ToolTipBlock';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IUserDateRange } from '../../interfaces/IUsers';
import { COLORS } from '../../values/colors';

interface IDataChart {
  date: string;
  value: string;
  valueSecond?: string;
}

const useStyles = makeStyles({
  onlineUsers: {
    width: '100%',
  },
  onlineUsersText: {
    display: 'block',
    width: 'fit-content',
    margin: '30px auto 0 auto',
    textAlign: 'center',
  },
  usersCounter: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    lineHeight: '1.75',
    letterSpacing: '0.02857em',
    fontSize: '0.875rem',
  },
});

const StatisticsBlock: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.rangeUsers);
  const comments = useSelector((state: RootState) => state.comments.rangeComments);
  const orders = useSelector((state: RootState) => state.orders.rangeOrders);
  const styles = useStyles();

  const [chartData, setChartData] = useState<IDataChart[] | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<null | string>(null);

  const dataToChart = (reqData: any) => {
    if (reqData.onlineUsers && reqData.registredUsers.length) {
      setOnlineUsers(reqData.onlineUsers);
      const dataArr = reqData.registredUsers.map((user: IUserDateRange) => {
        return { date: user.date, value: user.creatad };
      });
      if (dataArr.length === 1) {
        const mockData = dataArr[0];
        dataArr.unshift(mockData);
        dataArr.push(mockData);
      }
      return setChartData(dataArr);
    }
    if (reqData[0] && reqData[0].paid) {
      const dataArr = reqData.map(
        (user: { date: string; paid: string; notpaid: string; paidSum: string; notPaidSum: string }) => {
          return {
            date: user.date,
            value: user.paid,
            valueSecond: user.notpaid,
            sumValue: user.paidSum,
            sumValueSecond: user.notPaidSum,
          };
        }
      );
      if (dataArr.length === 1) {
        const mockData = dataArr[0];
        dataArr.unshift(mockData);
        dataArr.push(mockData);
      }
      return setChartData(dataArr);
    }
    if (reqData.length) {
      const dataArr = reqData.map((user: { date: string; creatad: string }) => {
        return { date: user.date, value: user.creatad };
      });
      if (dataArr.length === 1) {
        const mockData = dataArr[0];
        dataArr.unshift(mockData);
        dataArr.push(mockData);
      }
      return setChartData(dataArr);
    }
  };

  useEffect(() => {
    if (users) {
      dataToChart(users);
      setOnlineUsers(users.onlineUsers);
    }
  }, [users]);
  useEffect(() => {
    if (comments) {
      setOnlineUsers(null);
      dataToChart(comments);
    }
  }, [comments]);
  useEffect(() => {
    if (orders) {
      setOnlineUsers(null);
      dataToChart(orders);
    }
  }, [orders]);

  return (
    <>
      {chartData && (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.primaryGreen} stopOpacity={0.4} />
                <stop offset="75%" stopColor={COLORS.primaryGreen} stopOpacity={0.05} />
              </linearGradient>
              {chartData[0].valueSecond && (
                <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.primaryBlue} stopOpacity={0.4} />
                  <stop offset="75%" stopColor={COLORS.primaryBlue} stopOpacity={0.05} />
                </linearGradient>
              )}
            </defs>

            <Area dataKey="value" stroke={COLORS.primaryGreen} fill="url(#color1)" />
            {chartData[0].valueSecond && (
              <Area dataKey="valueSecond" stroke={COLORS.primaryBlue} fill="url(#color2)" />
            )}

            <XAxis
              dataKey={(data) => {
                if (data.date)
                  return `${data.date.split('-')[2]}.${data.date.split('-')[1]}.${data.date.split('-')[0]}`;
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              dataKey={(data) => {
                if (data.valueSecond && parseInt(data.valueSecond) > parseInt(data.value))
                  return parseInt(data.valueSecond) + parseInt(data.valueSecond);
                return parseInt(data.value) + parseInt(data.value);
              }}
              axisLine={true}
              tickLine={true}
              tickCount={1}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {onlineUsers && (
        <div className={styles.onlineUsers}>
          <p className={styles.onlineUsersText}>
            зараз користувачів на сайті:
            <br />
            <span className={styles.usersCounter}>{onlineUsers}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default StatisticsBlock;
