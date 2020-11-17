import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import categories from "./reduceres/categories.reducer";
import products from "./reduceres/products.reducer";
import theme from './reduceres/themeMode.reducer';
import createSagaMiddleware from 'redux-saga';
import { sagaCategoriesWatcher, sagaProductsWatcher } from "./sagas/sagas";

const saga = createSagaMiddleware();

const rootReducer = combineReducers({ categories, products, theme });

const store = createStore(rootReducer, compose(
   applyMiddleware(saga),
   composeWithDevTools()
));

saga.run(sagaCategoriesWatcher);
saga.run(sagaProductsWatcher);


export type RootState = ReturnType<typeof rootReducer>

export default store;