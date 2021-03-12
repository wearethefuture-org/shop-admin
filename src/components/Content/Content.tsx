import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styles from './Content.module.scss';

interface ContentProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Content: React.FC<ContentProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={`${classes.main} ${styles.main}`}>{children}</div>;
};

export default Content;
