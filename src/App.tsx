/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ThemeProvider, createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Router from './components/Router/Router';
import { Paper } from '@material-ui/core';
import { RootState } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { switchDarkMode } from './store/actions';

export function App() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const bool: string = localStorage.getItem('darkMode')!;
    JSON.parse(bool) ? dispatch(switchDarkMode()) : void 0;
  }, []);

  const darkTheme: ThemeOptions = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      background: {
        paper: darkMode ? '#212121' : '#fff',
        default: darkMode ? '#424242' : '#f4f7fc',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper className="wraper" style={{ borderRadius: 'unset' }}>
        <Router />
      </Paper>
    </ThemeProvider>
  );
}
