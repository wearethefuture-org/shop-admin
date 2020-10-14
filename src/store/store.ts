import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';

import categories from "./reduceres/categories.reducer";
import common from './reduceres/common.reducer';
import { sagaWatcher } from "./sagas/sagas";

const saga = createSagaMiddleware();

const rootReducer = combineReducers({categories, common});

const store = createStore(rootReducer, compose(
   applyMiddleware(saga)
));

saga.run(sagaWatcher);


export type RootState = ReturnType<typeof rootReducer>

export default store;