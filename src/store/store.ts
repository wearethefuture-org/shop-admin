import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';

import categories from './reduceres/categories.reducer';
import products from './reduceres/products.reducer';
import sliders from "./reduceres/sliders.reduser";
import getProductById from './reduceres/getProductById.reducer';
import settings from './reduceres/settings.reducer';
import snackBar from './reduceres/snackbar.reducer';
import theme from './reduceres/themeMode.reducer';
import users from './reduceres/users.reducer';
import rootSaga from './sagas/sagas';


const saga = createSagaMiddleware();

const rootReducer = combineReducers({ categories, products, getProductById, settings, snackBar, theme, users, sliders });

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga)
    //  composeWithDevTools({ trace: true, traceLimit: 25 })
  )
);

saga.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
