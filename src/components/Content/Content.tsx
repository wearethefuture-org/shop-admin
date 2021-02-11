import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface ContentProps {
  children: React.ReactNode,
}

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    boxSizing: 'border-box',
  },
}));

const Content: React.FC<ContentProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      {children}
    </div>
  );
}

export default Content; 
