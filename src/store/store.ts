import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import categories from './reduceres/categories.reducer';
import products from './reduceres/products.reducer';
import settings from './reduceres/settings.reducer';
import snackBar from './reduceres/snackbar.reducer';
import theme from './reduceres/themeMode.reducer';
import rootSaga from './sagas/sagas';


const saga = createSagaMiddleware();

const rootReducer = combineReducers({ categories, products, settings, snackBar, theme });

const store = createStore(rootReducer, compose(
   applyMiddleware(saga),
   //composeWithDevTools()
));

saga.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>

export default store;