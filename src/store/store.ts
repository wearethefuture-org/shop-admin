import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import categories from "./reduceres/categories.reducer";
import products from "./reduceres/products.reducer";
import createSagaMiddleware from 'redux-saga';
import { sagaCategoriesWatcher, sagaProductsWatcher } from "./sagas/sagas";

const saga = createSagaMiddleware();

const rootReducer = combineReducers({ categories, products });

const store = createStore(rootReducer, compose(
   applyMiddleware(saga)
));

saga.run(sagaCategoriesWatcher);
saga.run(sagaProductsWatcher);


export type RootState = ReturnType<typeof rootReducer>

export default store;