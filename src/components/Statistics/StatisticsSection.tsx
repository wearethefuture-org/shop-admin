import React from 'react';
import { makeStyles } from '@material-ui/core';
import StatisticsButtons from './StatisticsButton';
import StatisticsBlock from './StatisticsBlock';

const useStyles = makeStyles({
  statisticsSection: {
    display: 'block',
    width: '100%',
    marginTop: '50px',
  },
});

const StatisticsSection: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.statisticsSection}>
      <StatisticsButtons />
      <StatisticsBlock />
    </div>
  );
};

export default StatisticsSection;
