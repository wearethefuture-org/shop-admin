/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  ThemeOptions,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Router from './components/Router/Router';
import { AppDispatch, RootState } from './store/store';
import { switchDarkMode } from './store/actions/theme.actions';
import './App.scss';
import { fetchUserRequest } from './store/actions/user.action';

declare module '@material-ui/core/styles/createTheme' {
  interface ThemeOptions {
    [key: string]: any;
  }
}

export function App() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch: AppDispatch = useDispatch();

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

  useEffect(() => {
    window.location.pathname !== '/home' && dispatch(fetchUserRequest());
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper className="wraper" style={{ borderRadius: 'unset' }}>
        <Router />
      </Paper>
    </ThemeProvider>
  );
}
