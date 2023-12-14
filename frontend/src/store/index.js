import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";

import counter from "./reducers/counter";

const allReducers = combineReducers({
  counter,
  // add more if needed
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers, composeEnhancers(applyMiddleware()));

export default store;
