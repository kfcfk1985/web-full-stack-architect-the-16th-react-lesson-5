// !thunk的使用方式
// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { userReducer } from "./userReducer";

// const store = createStore(
//   combineReducers({ user: userReducer }),
//   applyMiddleware(thunk)
// );
// export default store;

// !saga的使用方式
import { createStore, combineReducers, applyMiddleware } from "redux";

import { userReducer } from "./userReducer";
import createSagaMiddleware from "redux-saga";
import loginSaga from "../action/loginSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ user: userReducer }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(loginSaga);

export default store;
