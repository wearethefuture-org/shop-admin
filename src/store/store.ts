import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';

import categories from "./reduceres/categories.reducer";
import { sagaWatcher } from "./sagas/sagas";

const saga = createSagaMiddleware();

const rootReducer = combineReducers({categories});

const store = createStore(rootReducer, compose(
   applyMiddleware(saga)
));

saga.run(sagaWatcher);


export type RootState = ReturnType<typeof rootReducer>

export default store;