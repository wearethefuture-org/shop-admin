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
});

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(saga)
    : composeWithDevTools(applyMiddleware(saga))
);

saga.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
