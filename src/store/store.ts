import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import mainCategories from './reducers/mainCategory.reducer';
import categories from './reducers/categories.reducer';
import products from './reducers/products.reducer';
import settings from './reducers/settings.reducer';
import snackBar from './reducers/snackbar.reducer';
import theme from './reducers/themeMode.reducer';
import users from './reducers/users.reducer';
import rootSaga from './rootSaga';
import slides from './reducers/slides.reduser';
import orders from './reducers/orders.reducer';
import user from './reducers/user.reducer';
import comments from './reducers/comments.reducer';
import roles from './reducers/roles.reducer';

const saga = createSagaMiddleware();

const rootReducer = combineReducers({
  mainCategories,
  categories,
  products,
  settings,
  snackBar,
  theme,
  users,
  slides,
  orders,
  comments,
  user,
  roles,
});

const store = createStore(
  rootReducer,
  p§.REACT_APP_ENVIRONMENT === 'production'
    ? applyMiddleware(saga)
    : composeWithDevTools(applyMiddleware(saga))
);

saga.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
