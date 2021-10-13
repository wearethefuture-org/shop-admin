import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { App } from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import WithAxios from './api/withAxios';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <WithAxios>
        <App />
      </WithAxios>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
